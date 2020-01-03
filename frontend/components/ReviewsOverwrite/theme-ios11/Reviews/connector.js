import { connect } from 'react-redux';
import { getProductRating } from '@shopgate/pwa-common-commerce/product/selectors/product';
import { getProductReviewsExcerpt } from '@shopgate/pwa-common-commerce/reviews/selectors';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @param {Object} ownProps The props passed by the parent component
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, ownProps) => ({
  reviews: getProductReviewsExcerpt(state, {
    productId: ownProps.productId,
  }),
  rating: getProductRating(state, {
    productId: ownProps.productId,
  }),
});

export default connect(mapStateToProps);
