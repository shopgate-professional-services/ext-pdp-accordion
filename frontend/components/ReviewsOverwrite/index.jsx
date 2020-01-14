import { withCurrentProduct } from '@shopgate/engage/core';
import connect from './connector';

/**
 * The ReviewsOverwrite component.
 *
 * @param {Object} props The component props.
 * @returns {JSX|null}
 */
const ReviewsOverwrite = ({ show, children }) => {
  if (!show) {
    return null;
  }
  return children;
};

export default withCurrentProduct(connect(ReviewsOverwrite));
