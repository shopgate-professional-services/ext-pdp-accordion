import config from '../../config';

/**
 * The DescriptionOverwrite component.
 *
 * @param {Object} props The component props.
 * @returns {JSX|null}
 */
const DescriptionOverwrite = ({ children }) => {
  // Only show description if it's not defined in config as type
  const show = !config.accordionItems.some(property => property.type === 'description');

  if (!show) {
    return null;
  }
  return children;
};

export default DescriptionOverwrite;
