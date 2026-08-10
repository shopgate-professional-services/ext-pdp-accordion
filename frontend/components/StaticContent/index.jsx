import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import HTMLContent from '../HTMLContent';
import formatHtml from '../../helpers/formatHtml';

const ACCORDION_UPDATED_EVENT = 'pdpAccordion:updated';

/**
 * Renders a static accordion HTML block with resolved product variables.
 *
 * Dispatches `pdpAccordion:updated` when its resolved content or product
 * variables change so integrations can reinitialize third-party widgets.
 * @param {Object} props The component props.
 * @returns {JSX}
 */
const StaticContent = ({
  name,
  info,
  productVariables,
}) => {
  const {
    productId,
    productName,
    productNumber,
  } = productVariables;
  const resolvedProductVariables = useMemo(() => ({
    productId,
    productName,
    productNumber,
  }), [productId, productName, productNumber]);
  const formattedHtml = useMemo(
    () => formatHtml(info, resolvedProductVariables),
    [info, resolvedProductVariables]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.CustomEvent !== 'function') {
      return;
    }

    window.dispatchEvent(new CustomEvent(ACCORDION_UPDATED_EVENT, {
      detail: {
        name,
        html: formattedHtml,
        ...resolvedProductVariables,
      },
    }));
  }, [formattedHtml, name, resolvedProductVariables]);

  const contentId = `static-${name}`;

  return (
    <HTMLContent
      key={contentId}
      contentId={contentId}
      processStyles
    >
      {formattedHtml}
    </HTMLContent>
  );
};

StaticContent.propTypes = {
  info: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  productVariables: PropTypes.shape().isRequired,
};

export default StaticContent;
