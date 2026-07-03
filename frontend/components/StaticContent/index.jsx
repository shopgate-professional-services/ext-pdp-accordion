import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import HTMLContent from '../HTMLContent';
import formatHtml from '../../helpers/formatHtml';

const ACCORDION_UPDATED_EVENT = 'pdpAccordion:updated';

/**
 * Renders a static accordion HTML block with resolved product variables.
 *
 * After each render a `pdpAccordion:updated` browser event is dispatched so
 * integrations can reinitialize third-party widgets after SPA product
 * navigation.
 * @param {Object} props The component props.
 * @returns {JSX}
 */
const StaticContent = ({
  name,
  info,
  productVariables,
}) => {
  const formattedHtml = useMemo(
    () => formatHtml(info, productVariables),
    [info, productVariables]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.CustomEvent !== 'function') {
      return;
    }

    window.dispatchEvent(new CustomEvent(ACCORDION_UPDATED_EVENT, {
      detail: {
        name,
        html: formattedHtml,
        ...productVariables,
      },
    }));
  }, [formattedHtml, name, productVariables]);

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
