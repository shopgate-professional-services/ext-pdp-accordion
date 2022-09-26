import { connect } from 'react-redux';
import { getFilteredProductProperties } from '../../selectors';

/**
 * Maps state to component props.
 *
 * @param {Object} state The application state
 * @param {Object} ownProps The props passed by the parent component
 * @returns {{properties: Array<Object>}}
 */
const mapStateToProps = (state, ownProps) => ({
  properties: getFilteredProductProperties(state, ownProps),
});

export default connect(mapStateToProps);
