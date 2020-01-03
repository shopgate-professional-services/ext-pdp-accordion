import { connect } from 'react-redux';
import { getProductRating } from '@shopgate/pwa-common-commerce/product/selectors/product';
import { getProductReviews } from '@shopgate/pwa-common-commerce/reviews/selectors/index';
import config from '../../config';

/**
 * Maps state to component props.
 *
 * @param {Object} state The application state
 * @param {Object} ownProps The props passed by the parent component
 * @returns {{show: boolean, rating: Object, reviews: Object}}
 */
const mapStateToProps = (state, ownProps) => ({
  show: !config.accordionItems.some(property => property.type === 'reviews'),
  rating: getProductRating(state, {
    productId: ownProps.productId,
  }),
  reviews: getProductReviews(state, {
    productId: ownProps.productId,
  }),
});

export default connect(mapStateToProps);
