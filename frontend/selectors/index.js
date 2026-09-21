import { createSelector } from 'reselect';
import { getProductProperties } from '@shopgate/engage/product';
import config from '../config';

export const getFilteredProductProperties = createSelector(
  getProductProperties,
  (productProperties) => {
    if (!Array.isArray(productProperties)) {
      return [];
    }

    return productProperties
      .filter(productProperty => !config.accordionItems
        .some(property => property.name === productProperty.label))
      .map(productProperty => ({
        label: String(productProperty.label),
        value: String(productProperty.value),
      }));
  }
);
