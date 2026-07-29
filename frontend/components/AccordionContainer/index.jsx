import React, {
  useCallback, useMemo, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import appConfig, { themeName } from '@shopgate/pwa-common/helpers/config';
import { withCurrentProduct } from '@shopgate/engage/core';
import { THEME_IOS11 } from '../../constants';
import getConfig from '../../helpers/getConfig';
import ExpandAndCollapse from '../ExpandAndCollapse';
import Description from '../DescriptionOverwrite/Description';
import Properties from '../PropertiesOverwrite';
import ReviewsAndroid from '../ReviewsOverwrite/theme-gmd/Reviews/index';
import ReviewsIos from '../ReviewsOverwrite/theme-ios11/Reviews/index';
import AccordionSection from './AccordionSection';
import HTMLContent from '../HTMLContent';
import StaticContent from '../StaticContent';
import connect from './connector';
import styles from './style';

const { allowMultipleOpen, productVariablesFromParent } = getConfig();

const PRODUCT_VARIABLE_PATTERN = /{\s*(productName|productId|productNumber)\s*}/;

/**
 * Gets the product number from available product fields.
 * @param {Object|null} product Product data.
 * @returns {*}
 */
const getProductNumber = product => (
  product && product.identifiers ? product.identifiers.sku : undefined
);

/**
 * Reads a value from the primary product and falls back to the secondary one when it's not set.
 * An empty string is a valid value and doesn't trigger the fallback.
 * @param {Object|null} primary Preferred product data.
 * @param {Object|null} fallback Fallback product data.
 * @param {Function} accessor Reads the value from a product.
 * @returns {*}
 */
const resolveVariable = (primary, fallback, accessor) => {
  const value = accessor(primary);

  if (value !== null && typeof value !== 'undefined') {
    return value;
  }

  return accessor(fallback);
};

/**
 * Creates the variable map for configured HTML blocks.
 *
 * By default the values of the selected variant are used, falling back to the base product per
 * field - variant data arrives asynchronously and single fields like the SKU might not be
 * maintained on the variant. With productVariablesFromParent only base product values are used.
 * @param {Object|null} product The currently selected product (variant when one is selected).
 * @param {Object|null} baseProduct The base product.
 * @returns {Object}
 */
const getProductVariables = (product, baseProduct) => {
  const primary = productVariablesFromParent ? baseProduct : product;
  const fallback = productVariablesFromParent ? null : baseProduct;

  return {
    productName: resolveVariable(
      primary,
      fallback,
      productData => (productData ? productData.name : undefined)
    ),
    productId: resolveVariable(
      primary,
      fallback,
      productData => (productData ? productData.id : undefined)
    ),
    productNumber: resolveVariable(primary, fallback, getProductNumber),
  };
};

/**
 * Checks whether enough product data is available to resolve product variables.
 * @param {Object|null} product The currently selected product (variant when one is selected).
 * @param {Object|null} baseProduct The base product.
 * @returns {boolean}
 */
const hasProductVariableSource = (product, baseProduct) => (
  productVariablesFromParent ? !!baseProduct : !!(product || baseProduct)
);

/**
 * The Accordion component
 * @param {Object} props The component props
 * @returns {JSX}
 */
const Accordion = ({
  configProperties,
  description,
  product,
  baseProduct,
  productProperties,
  filteredProductProperties,
  rating,
  reviews,
}) => {
  const [activeSections, setActiveSections] = useState(null);

  // Stable identity, otherwise StaticContent re-emits its update event on every render.
  const productVariables = useMemo(
    () => getProductVariables(product, baseProduct),
    [product, baseProduct]
  );

  useEffect(() => {
    const sections = configProperties.reduce((acc, { isActive, headline, name }) => ({
      ...acc,
      [headline || name]: isActive || false,
    }), {});

    if (!Object.keys(sections).length) {
      return;
    }

    setActiveSections((prevActiveSections) => {
      if (prevActiveSections === null) {
        // Active sections where not set before -> update with sections
        return sections;
      }

      if (Object.keys(prevActiveSections).length === Object.keys(sections).length) {
        // No new sections came in with the last configProperties update -> no activeSections update
        return prevActiveSections;
      }

      // Number of sections changed with the last config update -> regenerate activeSections
      return Object.keys(sections).reduce((acc, currentKey) => {
        if (prevActiveSections.hasOwnProperty(currentKey)) {
          // Current key was already present within the old activeSections -> use old value
          acc[currentKey] = activeSections[currentKey];
        } else {
          // Current key is new -> add new value
          acc[currentKey] = sections[currentKey];
        }

        return acc;
      }, {});
    });
  }, [activeSections, configProperties]);

  const getSectionContent = useCallback((
    configProperty
  ) => {
    switch (configProperty.type) {
      case 'description': {
        return description
          ? (<Description html={description} />)
          : null;
      }
      case 'reviews': {
        const Reviews = themeName.includes(THEME_IOS11) ? ReviewsIos : ReviewsAndroid;

        return (appConfig.hasReviews && (reviews.length || appConfig.showWriteReview))
          ? <Reviews rating={rating} reviews={reviews} />
          : null;
      }
      case 'static': {
        if (!configProperty.info || configProperty.info.trim() === '') {
          return null;
        }

        const hasProductVariables = PRODUCT_VARIABLE_PATTERN.test(configProperty.info);

        if (hasProductVariables && !hasProductVariableSource(product, baseProduct)) {
          return null;
        }

        return (
          <StaticContent
            name={configProperty.name}
            info={configProperty.info}
            productVariables={productVariables}
          />
        );
      }
      case 'properties': {
        return filteredProductProperties.length
          ? <Properties isAccordion />
          : null;
      }
      default: {
        const productProp = productProperties
          .find(productProperty => productProperty.label === configProperty.name);
        return productProp
          ?
            <HTMLContent contentId={`property-${configProperty.name}`}>
              {productProp.value}
            </HTMLContent>
          : null;
      }
    }
  }, [
    baseProduct,
    description,
    filteredProductProperties.length,
    product,
    productProperties,
    productVariables,
    rating,
    reviews,
  ]);

  const handleClick = useCallback((label) => {
    const isActive = !!activeSections[label];
    const update = {};

    Object.entries(activeSections).forEach(([key, value]) => {
      const isSection = key === label;

      if (allowMultipleOpen) {
        update[key] = isSection ? !isActive : value;
      } else {
        update[key] = isSection ? !isActive : false;
      }
    });

    setActiveSections(update);
  }, [activeSections]);

  if (!activeSections) {
    return null;
  }

  return (
    <div className={`pdp-accordion__container ${styles.container}`}>
      { configProperties.map((configProperty, index) => {
        const { name, headline, preview } = configProperty;
        const label = headline || name;
        const isRating = configProperty.type === 'reviews';
        const sectionContent = getSectionContent(configProperty);
        // configProperties might have updated, but activeSections haven't yet
        if (!sectionContent || typeof activeSections[label] === 'undefined') {
          return null;
        }

        return (
          <AccordionSection
            key={name}
            isOpen={activeSections[label]}
            label={label}
            isRating={isRating}
            rating={rating}
            isLast={index === configProperties.length - 1}
            onClick={handleClick}
          >
            { preview && !isRating ? (
              <ExpandAndCollapse>
                { sectionContent }
              </ExpandAndCollapse>
            ) : (
              sectionContent
            )}
          </AccordionSection>
        );
      })}
    </div>
  );
};

Accordion.propTypes = {
  baseProduct: PropTypes.shape(),
  configProperties: PropTypes.arrayOf(PropTypes.shape()),
  description: PropTypes.string,
  filteredProductProperties: PropTypes.arrayOf(PropTypes.shape()),
  product: PropTypes.shape(),
  productProperties: PropTypes.arrayOf(PropTypes.shape()),
  rating: PropTypes.shape(),
  reviews: PropTypes.arrayOf(PropTypes.shape()),
};

Accordion.defaultProps = {
  baseProduct: null,
  configProperties: [],
  description: '',
  product: null,
  productProperties: [],
  filteredProductProperties: [],
  rating: null,
  reviews: [],
};

export default withCurrentProduct(connect(Accordion));
