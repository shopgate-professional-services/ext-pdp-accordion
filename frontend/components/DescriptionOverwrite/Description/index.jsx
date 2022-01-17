import React from 'react';
import PropTypes from 'prop-types';
import PlaceholderParagraph from '@shopgate/pwa-ui-shared/PlaceholderParagraph';
import HTMLContent from '../../HTMLContent';
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

  return (
    <div className={styles.container}>
      <PlaceholderParagraph className={styles.placeholder} ready={!!props.html}>
        <HTMLContent>
          {props.html}
        </HTMLContent>
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
