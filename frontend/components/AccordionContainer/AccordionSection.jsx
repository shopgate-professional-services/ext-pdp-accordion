import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { RatingStars } from '@shopgate/engage/components';
import { makeStyles } from '@shopgate/engage/styles';
import AccordionIcon from './AccordionIcon';
import getConfig from '../../helpers/getConfig';

const {
  showLastSectionBottomBorder,
  animate,
} = getConfig();

const animationDuration = 500;

const useStyles = makeStyles()(theme => ({
  sectionTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: 500,
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    paddingRight: 8,
  },
  sectionButton: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: 500,
    color: theme.palette.text.primary,
    background: theme.palette.background.surface,
    width: '100%',
    textAlign: 'left',
    outline: 'none',
    padding: 16,
    borderTop: 1,
    borderTopStyle: 'solid',
    borderTopColor: theme.components.separatorLine.borderColor,
  },
  transitionBlock: {
    ...(animate ? {
      transition: `max-height ${animationDuration}ms cubic-bezier(0, 1, 0, 1)`,
    } : null),
    maxHeight: 0,
    overflow: 'hidden',
  },
  transitionBlockOpen: {
    ...(animate ? {
      transition: `max-height ${animationDuration * 2}ms ease-in-out !important`,
    } : null),
    maxHeight: '1000vh !important',
  },
  sectionBlock: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontSize: theme.typography.body2.fontSize,
    lineHeight: 1.7,
    wordBreak: 'break-word',
    padding: 16,
  },
  sectionBorder: {
    borderBottom: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.components.separatorLine.borderColor,
  },
  stars: {
    flex: '30 0 auto',
  },
}));

/**
 * A simple AccordionSection Component
 * @param {Object} props The component props.
 * @returns {JSX}
 */
const AccordionSection = ({
  isOpen, label, onClick, children, isLast, isRating, rating,
}) => {
  const { classes, cx } = useStyles();

  const handleClick = useCallback(() => {
    onClick(label);
  }, [onClick, label]);

  return (
    <div className={cx('pdp-accordion__container__section', showLastSectionBottomBorder && isLast && classes.sectionBorder)}>
      <button
        onClick={handleClick}
        className={cx('pdp-accordion__container__section__header', classes.sectionButton)}
        type="button"
        aria-expanded={isOpen}
      >
        <div className={classes.sectionTitleWrapper}>
          <div className={cx(classes.sectionTitle, 'accordion__container__section__header__title')}>
            {label}
          </div>
          {isRating &&
            <RatingStars
              display="big"
              className={classes.stars}
              isSelectable={false}
              value={rating && rating.average ? rating.average : 0}
            />
          }
          <AccordionIcon isOpen={isOpen} />
        </div>
      </button>
      <div
        className={cx('pdp-accordion__container__section__content', classes.transitionBlock, isOpen && classes.transitionBlockOpen)}
        aria-hidden={!isOpen}
      >
        <div className={classes.sectionBlock}>
          {children}
        </div>
      </div>
    </div>
  );
};

AccordionSection.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.instanceOf(Object),
  isLast: PropTypes.bool,
  isRating: PropTypes.bool,
  rating: PropTypes.instanceOf(Object),
};

AccordionSection.defaultProps = {
  children: null,
  isRating: false,
  rating: null,
  isLast: false,
};

export default AccordionSection;
