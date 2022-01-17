import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { HtmlSanitizer } from '@shopgate/engage/components';
import { useNavigation } from '@shopgate/engage/core';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const contentStyles = css({
  lineHeight: 1.7,
  overflow: 'hidden',
  wordBreak: ['break-all', 'break-word'],
  hyphens: 'auto',
  ' ul': {
    listStyle: 'disc',
  },
  ' ol': {
    listStyle: 'decimal',
  },
  ' ul, ol': {
    margin: '.75em 0',
    paddingLeft: '1.2em',
  },
  ' a': {
    color: themeConfig.colors.primary,
    margin: '-.35em',
    padding: '.35em',
    position: 'relative',
  },
  ' p': {
    marginTop: 0,
  },
});

/**
 * HTMLContent
 * @param {Object} props The component props
 * @returns {JSX}
 */
const HTMLContent = ({ children }) => {
  const { push } = useNavigation();

  const handleClick = useCallback((pathname, target) => {
    push({
      pathname,
      ...target && { state: { target } },
    });
  }, [push]);

  return (
    <div className={contentStyles}>
      <HtmlSanitizer settings={{ handleClick }}>
        {children}
      </HtmlSanitizer>
    </div>
  );
};

HTMLContent.propTypes = {
  children: PropTypes.node,
};

HTMLContent.defaultProps = {
  children: null,
};

export default HTMLContent;
