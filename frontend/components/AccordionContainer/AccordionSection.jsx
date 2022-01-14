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
      <div className={showLastSectionBottomBorder && isLast ? styles.sectionBorder : null}>
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
            <AccordionIcon isOpen={isOpen} />
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
