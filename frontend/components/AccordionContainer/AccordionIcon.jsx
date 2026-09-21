import React from 'react';
import PropTypes from 'prop-types';
import { Icon, ArrowIcon } from '@shopgate/engage/components';
import { makeStyles } from '@shopgate/engage/styles';
import config from '../../config';

const {
  sectionButtonIcon,
  sectionButtonIconOpen,
  sectionButtonIconFontSize,
} = config;

const useStyles = makeStyles()(() => ({
  arrow: {
    flex: '0 0 auto',
  },
  arrowDown: {
    transform: 'rotate(270deg)',
  },
  arrowUp: {
    transform: 'rotate(90deg)',
  },
}));

/**
 * AccordionIcon component
 * @param {Object} props Component props
 * @returns {JSX}
 */
const AccordionIcon = ({ isOpen }) => {
  const { classes, theme } = useStyles();

  if (!isOpen) {
    return (
      <div className={classes.arrow}>
        <span style={{ color: theme.palette.text.primary }}>
          { sectionButtonIcon ? (
            <Icon
              content={sectionButtonIcon}
              className={!sectionButtonIconOpen ? classes.arrowDown : null}
              size={sectionButtonIconFontSize}
            />
          ) : (
            <ArrowIcon
              className={classes.arrowDown}
              size={sectionButtonIconFontSize}
            />
          )}
        </span>
      </div>
    );
  }

  return (
    <div className={classes.arrow}>
      <span style={{ color: theme.palette.text.primary }}>
        { sectionButtonIconOpen || sectionButtonIcon ? (
          <Icon
            content={sectionButtonIconOpen || sectionButtonIcon}
            className={!sectionButtonIconOpen ? classes.arrowUp : null}
            size={sectionButtonIconFontSize}
          />
        ) : (
          <ArrowIcon
            className={classes.arrowUp}
            size={sectionButtonIconFontSize}
          />
        ) }
      </span>
    </div>
  );
};

AccordionIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default AccordionIcon;
