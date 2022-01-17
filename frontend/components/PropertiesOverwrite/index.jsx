import { withCurrentProduct } from '@shopgate/engage/core';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import connect from './connector';
import Properties from './Properties/index';
import config from '../../config';

/**
 * The PropertiesOverwrite component.
 *
 * @param {Object} props The component props.
 * @returns {JSX|null}
 */
const PropertiesOverwrite = ({ properties, isAccordion }) => {
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
  properties: PropTypes.arrayOf(PropTypes.shape()),
};

PropertiesOverwrite.defaultProps = {
  properties: null,
  isAccordion: false,
};

export default withCurrentProduct(connect(PropertiesOverwrite));
