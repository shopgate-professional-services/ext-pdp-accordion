import React from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import Title from './components/Title/index';
import Rating from './components/Rating/index';
import Text from './components/Text/index';
import Info from './components/Info/index';

/**
 * Single Review Component.
 * @param {Object} props The component props.
 * @returns {JSX}
 */
const Review = ({ review }) => (
  <div className={styles} data-test-id={`reviewTitle: ${review.title}`}>
    <Title title={review.title} />
    <Rating rate={review.rate} />
    <Text review={review.review} />
    <Info review={review} />
  </div>
);

Review.propTypes = {
  review: PropTypes.shape().isRequired,
};

export default Review;
