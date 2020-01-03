import { withPageProductId } from '@shopgate-ps/pwa-extension-kit/connectors/';
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

export default withPageProductId(connect(ReviewsOverwrite));
