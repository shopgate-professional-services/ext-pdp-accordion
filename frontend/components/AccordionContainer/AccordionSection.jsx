import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArrowIcon from '@shopgate/pwa-ui-shared/icons/ArrowIcon';
import RatingStars from '@shopgate/pwa-ui-shared/RatingStars';
import styles from './style';

/**
 * A simple AccoridonSection Component
 */
class AccordionSection extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.instanceOf(Object),
    isRating: PropTypes.bool,
    rating: PropTypes.instanceOf(Object),
  }

  static defaultProps = {
    children: null,
    isRating: false,
    rating: null,
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
        isOpen, label, isRating, rating,
      },
    } = this;

    return (
      <div>
        <button onClick={onClick} className={styles.sectionButton} type="button">
          <div className={styles.sectionTitleWrapper}>
            <div className={styles.sectionTitle}>
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
            <div className={styles.arrow}>
              {!isOpen && <span><ArrowIcon className={styles.arrowDown} /></span>}
              {isOpen && <span><ArrowIcon className={styles.arrowUp} /></span>}
            </div>
          </div>
        </button>
        {isOpen && (
          <div className={styles.sectionBlock}>
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}

export default AccordionSection;
