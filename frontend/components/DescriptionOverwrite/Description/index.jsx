import { withNavigation } from '@shopgate/engage/core';
import React from 'react';
import PropTypes from 'prop-types';
import HtmlSanitizer from '@shopgate/pwa-common/components/HtmlSanitizer';
import PlaceholderParagraph from '@shopgate/pwa-ui-shared/PlaceholderParagraph';
import styles from './style';

/**
 * The Product Description component.
 * @param {Object} props The component props.
 * @returns {JSX}
 */
const Description = (props) => {
  if (props.html === '') {
    return null;
  }

  /**
   * Handles the click
   *
   * @param {string} pathname pathname
   * @param {string} target target
   */
  const handleClick = (pathname, target) => {
    props.historyPush({
      pathname,
      ...target && { state: { target } },
    });
  };

  return (
    <div className={styles.container}>
      <PlaceholderParagraph className={styles.placeholder} ready={!!props.html}>
        <div className={styles.content} data-test-id={props.html}>
          <HtmlSanitizer settings={{ handleClick }}>
            {props.html}
          </HtmlSanitizer>
        </div>
      </PlaceholderParagraph>
    </div>
  );
};

Description.propTypes = {
  historyPush: PropTypes.func.isRequired,
  html: PropTypes.string,
};

Description.defaultProps = {
  html: null,
};

export default withNavigation(Description);
