import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Icon from '@shopgate/pwa-common/components/Icon';
import ArrowIcon from '@shopgate/pwa-ui-shared/icons/ArrowIcon';
import config from '../../config';
import styles from './style';

const {
  sectionButtonIcon,
  sectionButtonIconOpen,
  sectionButtonIconFontSize,
  sectionButtonIconColor,
} = config;

/**
 * AccordionIcon component
 * @param {Object} props Component props
 * @returns {JSX}
 */
const AccordionIcon = ({ isOpen }) => {
  const IconClosed = useCallback(() => (
    <span style={{ color: sectionButtonIconColor }}>
      { sectionButtonIcon ? (
        <Icon
          content={sectionButtonIcon}
          // Apply the default class when only one icon replacement is provided with config
          className={!sectionButtonIconOpen ? styles.arrowDown : null}
          size={sectionButtonIconFontSize}
        />
      ) : (
        <ArrowIcon
          className={styles.arrowDown}
          size={sectionButtonIconFontSize}
        />
      )}
    </span>
  ), []);

  const IconOpen = useCallback(() => (
    <span style={{ color: sectionButtonIconColor }}>
      { sectionButtonIconOpen || sectionButtonIcon ? (
        <Icon
          content={sectionButtonIconOpen || sectionButtonIcon}
          // Apply the default class when only one icon replacement is provided with config
          className={!sectionButtonIconOpen ? styles.arrowUp : null}
          size={sectionButtonIconFontSize}
        />
      ) : (
        <ArrowIcon
          className={styles.arrowUp}
          size={sectionButtonIconFontSize}
        />
      ) }
    </span>
  ), []);

  return (
    <div className={styles.arrow}>
      { !isOpen ? (
        <IconClosed />
      ) : (
        <IconOpen />
      )}
    </div>
  );
};

AccordionIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default AccordionIcon;
