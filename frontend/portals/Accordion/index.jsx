import { withCurrentProduct } from '@shopgate/engage/core';
import appConfig, { themeName } from '@shopgate/pwa-common/helpers/config';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from './connector';
import AccordionContainer from '../../components/AccordionContainer';
import ExpandAndCollapse from '../../components/ExpandAndCollapse';
import Description from '../../components/DescriptionOverwrite/Description';
import Properties from '../../components/PropertiesOverwrite';
import ReviewsAndroid from '../../components/ReviewsOverwrite/theme-gmd/Reviews/index';
import ReviewsIos from '../../components/ReviewsOverwrite/theme-ios11/Reviews/index';
import { THEME_IOS11 } from '../../constants';
import getConfig from '../../helpers/getConfig';
import HTMLContent from '../../components/HTMLContent';
import { container } from './styles';

const { allowMultipleOpen } = getConfig();

/**
 * Accordion component
 */
export class Accordion extends Component {
  static propTypes = {
    configProperties: PropTypes.instanceOf(Object),
    description: PropTypes.string,
    filteredProductProperties: PropTypes.arrayOf(PropTypes.shape()),
    productProperties: PropTypes.instanceOf(Object),
    rating: PropTypes.instanceOf(Object),
    reviews: PropTypes.arrayOf(PropTypes.array),
  };

  static defaultProps = {
    configProperties: {},
    description: '',
    productProperties: {},
    filteredProductProperties: [],
    rating: {},
    reviews: [],
  }

  /**
   *@param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    this.getItemDataFn = this.getItemData.bind(this);
    this.components = {
      Description,
      Reviews: themeName.includes(THEME_IOS11) ? ReviewsIos : ReviewsAndroid,
      Properties,
    };
  }

  /**
   * Returns the correct item data depending on the config property type
   *
   * @param {Object} configProperty config properties
   * @param {string} description description
   * @param {Object} rating rating
   * @param {Object} reviews reviews
   * @param {Object} productProperties product properties
   * @returns {*}
   */
  getItemData(configProperty, description, rating, reviews, productProperties) {
    switch (configProperty.type) {
      case 'description': {
        return this.components.Description && description
          ? <Description html={description} />
          : null;
      }
      case 'reviews': {
        const { Reviews } = this.components;

        return Reviews && (reviews.length || appConfig.showWriteReview)
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
        return this.props.filteredProductProperties.length
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
  }

  /**
   * Renders the components
   * @returns {JSX}
   */
  render() {
    const {
      configProperties,
      description,
      productProperties,
      rating,
      reviews,
    } = this.props;

    return (
      <div className={`pdp-accordion ${container}`}>
        <AccordionContainer allowMultipleOpen={allowMultipleOpen}>
          {configProperties.map((configProperty) => {
            const itemData =
              this.getItemDataFn(configProperty, description, rating, reviews, productProperties);
            const { name, headline, preview } = configProperty;
            const isOpen = configProperty.isActive;
            const isRating = configProperty.type === 'reviews';

            return (
              <div
                label={headline || name}
                key={name}
                isOpen={isOpen}
                isRating={isRating}
                rating={rating}
              >
                {isRating ?
                  itemData
                  :
                  <div>
                    {preview ?
                      <ExpandAndCollapse>
                        {itemData}
                      </ExpandAndCollapse>
                      :
                      itemData
                    }
                  </div>
                }
              </div>
            );
          })}
        </AccordionContainer>
      </div>
    );
  }
}

export default withCurrentProduct(connect(Accordion));
