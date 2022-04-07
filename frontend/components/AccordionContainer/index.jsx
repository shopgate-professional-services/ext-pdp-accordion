import React, {
  useCallback, useState, useEffect, Fragment,
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
import connect from './connector';
import styles from './style';

const { allowMultipleOpen } = getConfig();

/**
 * The Accordion component
 * @param {Object} props The component props
 * @returns {JSX}
 */
const Accordion = ({
  configProperties,
  description,
  productProperties,
  filteredProductProperties,
  rating,
  reviews,
}) => {
  const [activeSections, setActiveSections] = useState(null);
  useEffect(() => {
    if (activeSections !== null) {
      return;
    }

    const sections = configProperties.reduce((acc, { isActive, headline, name }) => ({
      ...acc,
      [headline || name]: isActive || false,
    }), {});

    if (!Object.keys(sections).length) {
      return;
    }

    // Initialize the section state with the configuration settings
    setActiveSections(sections);
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
        return configProperty.info
          ?
            <HTMLContent>
              {configProperty.info}
            </HTMLContent>
          : null;
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
            <HTMLContent>
              {productProp.value}
            </HTMLContent>
          : null;
      }
    }
  }, [description, filteredProductProperties.length, productProperties, rating, reviews]);

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
              <Fragment>
                { sectionContent }
              </Fragment>
            )}
          </AccordionSection>
        );
      })}
    </div>
  );
};

Accordion.propTypes = {
  configProperties: PropTypes.arrayOf(PropTypes.shape()),
  description: PropTypes.string,
  filteredProductProperties: PropTypes.arrayOf(PropTypes.shape()),
  productProperties: PropTypes.arrayOf(PropTypes.shape()),
  rating: PropTypes.shape(),
  reviews: PropTypes.arrayOf(PropTypes.shape()),
};

Accordion.defaultProps = {
  configProperties: [],
  description: '',
  productProperties: [],
  filteredProductProperties: [],
  rating: null,
  reviews: [],
};

export default withCurrentProduct(connect(Accordion));
