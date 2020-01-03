import { connect } from 'react-redux';
import config from '../../config';

/**
 * Only show description if it's not defined in config as type
 * @type {boolean}
 */
const showDescription = !config.accordionItems.some(property => property.type === 'description');

/**
 * Maps state to component props.
 *
 * @returns {{show: boolean, descriptionHtml: *}}
 */
const mapStateToProps = () => ({
  show: showDescription,
});

export default connect(mapStateToProps);
