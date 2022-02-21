import { connect } from 'react-redux';
import { getProductReviews } from '@shopgate/pwa-common-commerce/reviews/selectors';
import { getProductDescription, getProductProperties, getProductRating } from '@shopgate/pwa-common-commerce/product/selectors/product';
import { getFilteredProductProperties } from '../../selectors';
import config from '../../config';

/**
 * Filters the accordion items if they are not in the current product
 * Sorts them according to the sortOrder property
 *
 * @param {Object} accordionItems the unfiltered items
 * @param {Object} state The application state
 * @param {Object} ownProps props passed by the parent component
 * @returns {*}
 */
export const prepareProperties = (accordionItems, state, ownProps) => {
  const productProperties = getProductProperties(state, {
    productId: ownProps.productId,
  }) || [];

  return accordionItems
    .filter(property => (['reviews', 'description', 'static', 'properties'].indexOf(property.type) > -1) ||
        (property.type === 'property' &&
          productProperties.some(productProperty => productProperty.label === property.name)))
    .sort((firstProperty, secondProperty) => firstProperty.sortOrder - secondProperty.sortOrder);
};

/**
 * Maps state to component props
 *
 * @param {Object} state The application state
 * @param {Object} ownProps The props passed by the parent component
 * @returns {{
  *  config: Object,
  *  configProperties: Array,
  *  description: string,
  *  productProperties: Array,
  *  rating: Object,
  *  reviews: Array,
  * }}
  */
const mapStateToProps = (state, ownProps) => ({
  configProperties: prepareProperties(config.accordionItems, state, ownProps),
  description: getProductDescription(state, { productId: ownProps.productId }) || '',
  productProperties: getProductProperties(state, { productId: ownProps.productId }) || [],
  filteredProductProperties: getFilteredProductProperties(
    state,
    { productId: ownProps.productId }
  ) || [],
  rating: getProductRating(state, { productId: ownProps.productId }) || {},
  reviews: getProductReviews(state, { productId: ownProps.productId }) || [],
});

export default connect(mapStateToProps);
