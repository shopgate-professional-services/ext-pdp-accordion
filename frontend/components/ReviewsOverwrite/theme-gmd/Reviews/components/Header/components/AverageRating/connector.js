import { connect } from 'react-redux';
import { getCurrentBaseProductId } from '@shopgate/pwa-common-commerce/product/selectors/product';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @param {Object} ownProps The props passed by the parent component
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, ownProps) => ({
  productId: getCurrentBaseProductId(state, {
    productId: ownProps.productId,
  }),
});

export default connect(mapStateToProps);
