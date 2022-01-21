import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RatingStars from '@shopgate/pwa-ui-shared/RatingStars';
import AccordionIcon from './AccordionIcon';
import styles from './style';

import getConfig from '../../helpers/getConfig';

const { showLastSectionBottomBorder } = getConfig();

/**
 * A simple AccordionSection Component
 */
class AccordionSection extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.instanceOf(Object),
    isLast: PropTypes.bool,
    isRating: PropTypes.bool,
    rating: PropTypes.instanceOf(Object),
  }

  static defaultProps = {
    children: null,
    isRating: false,
    rating: null,
    isLast: false,
  };

  onClick = () => {
    this.props.onClick(this.props.label);
  }

  /**
   * Renders accordion
   * @returns {JSX}
   */
  render() {
    const {
      onClick,
      props: {
        isOpen, label, isRating, rating, isLast,
      },
    } = this;

    return (
      <div className={`pdp-accordion__container__section ${showLastSectionBottomBorder && isLast ? styles.sectionBorder : ''}`}>
        <button
          onClick={onClick}
          className={`pdp-accordion__container__section__header ${styles.sectionButton}`}
          type="button"
        >
          <div className={styles.sectionTitleWrapper}>
            <div className={`${styles.sectionTitle} accordion__container__section__header__title`}>
              {label}
            </div>
            {isRating &&
              <RatingStars
                display="big"
                className={`${styles.stars}`}
                isSelectable={false}
                value={rating && rating.average ? rating.average : 0}
              />
            }
            <AccordionIcon isOpen={isOpen} />
          </div>
        </button>
        <div className={`pdp-accordion__container__section__content ${styles.transitionBlock} ${isOpen ? styles.transitionBlockOpen : null}`}>
          <div className={styles.sectionBlock}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default AccordionSection;
