import connect from './connector';

/**
 * The DescriptionOverwrite component.
 *
 * @param {Object} props The component props.
 * @returns {JSX|null}
 */
const DescriptionOverwrite = ({ show, children }) => {
  if (!show) {
    return null;
  }
  return children;
};

export default connect(DescriptionOverwrite);
