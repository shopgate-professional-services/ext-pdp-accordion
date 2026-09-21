import PropTypes from 'prop-types';
import config from '../../config.json';

/**
 * The DescriptionOverwrite component.
 *
 * @param {Object} props The component props.
 * @returns {JSX|null}
 */
const DescriptionOverwrite = ({ children }) => {
  const show = !config.accordionItems.some(property => property.type === 'description');

  if (!show) {
    return null;
  }
  return children;
};

DescriptionOverwrite.propTypes = {
  children: PropTypes.node,
};

DescriptionOverwrite.defaultProps = {
  children: null,
};

export default DescriptionOverwrite;
