import PropTypes from 'prop-types';
import config from '../../config.json';

const show = !config.accordionItems.some(property => property.type === 'reviews');

/**
 * The ReviewsOverwrite component to make sure no duplicate reviews are shown.
 *
 * @param {Object} props The component props.
 * @returns {JSX|null}
 */
const ReviewsOverwrite = ({ children }) => {
  if (!show) {
    return null;
  }
  return children;
};

ReviewsOverwrite.propTypes = {
  children: PropTypes.node,
};

ReviewsOverwrite.defaultProps = {
  children: null,
};

export default ReviewsOverwrite;
