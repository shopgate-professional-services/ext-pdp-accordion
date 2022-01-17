import { connect } from 'react-redux';
import { getProductProperties } from '@shopgate/pwa-common-commerce/product/selectors/product';
import config from '../../config';

/**
 * Maps state to component props.
 *
 * @param {Object} state The application state
 * @param {Object} ownProps The props passed by the parent component
 * @returns {{properties: Array<Object>}}
 */
const mapStateToProps = (state, ownProps) => {
  const productProperties = getProductProperties(state, {
    productId: ownProps.productId,
  }) || [];

  return {
    properties: productProperties
      .filter(productProperty => !config.accordionItems
        .some(property => property.name === productProperty.label))
      .map(productProperty => ({
        label: String(productProperty.label),
        value: String(productProperty.value),
      })),
  };
};

export default connect(mapStateToProps);
