import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withCurrentProduct } from '@shopgate/engage/core/hocs';
import { getFilteredProductProperties } from '../../selectors';
import Properties from './Properties/index';
import config from '../../config';

/**
 * The PropertiesOverwrite component.
 *
 * @param {Object} props The component props.
 * @returns {JSX|null}
 */
const PropertiesOverwrite = ({ productId, isAccordion }) => {
  const properties = useSelector(state => getFilteredProductProperties(state, { productId }));

  const hide = useMemo(() => {
    const hasPropertiesConfig = config.accordionItems.some(property => property.type === 'properties');
    return !isAccordion && hasPropertiesConfig;
  }, [isAccordion]);

  if (hide) {
    return null;
  }

  return (
    <Properties properties={properties} isAccordion={isAccordion} />
  );
};

PropertiesOverwrite.propTypes = {
  isAccordion: PropTypes.bool,
  productId: PropTypes.string,
};

PropertiesOverwrite.defaultProps = {
  isAccordion: false,
  productId: null,
};

export default withCurrentProduct(PropertiesOverwrite);
