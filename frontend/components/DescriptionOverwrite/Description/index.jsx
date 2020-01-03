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
const Description = ({ html }) => {
  if (html === '') {
    return null;
  }

  return (
    <div className={styles.container}>
      <PlaceholderParagraph className={styles.placeholder} ready={!!html}>
        <div className={styles.content} data-test-id={html}>
          <HtmlSanitizer settings={{ html }}>
            {html}
          </HtmlSanitizer>
        </div>
      </PlaceholderParagraph>
    </div>
  );
};

Description.propTypes = {
  html: PropTypes.string,
};

Description.defaultProps = {
  html: null,
};

export default Description;
