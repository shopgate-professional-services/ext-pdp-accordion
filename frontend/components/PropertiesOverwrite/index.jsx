import { withCurrentProduct } from '@shopgate/engage/core';
import React from 'react';
import PropTypes from 'prop-types';
import connect from './connector';
import Properties from './Properties/index';

/**
 * The PropertiesOverwrite component.
 *
 * @param {Object} props The component props.
 * @returns {JSX|null}
 */
const PropertiesOverwrite = ({ properties }) => <Properties properties={properties} />;

PropertiesOverwrite.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.shape()),
};

PropertiesOverwrite.defaultProps = {
  properties: null,
};

export default withCurrentProduct(connect(PropertiesOverwrite));
