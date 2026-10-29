import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withCurrentProduct } from '@shopgate/engage/core';
import { getProductReviewsExcerpt } from '@shopgate/engage/reviews';
import { makeStyles } from '@shopgate/engage/styles';
import Header from '@shopgate/engage/reviews/components/Reviews/components/Header';
import List from '@shopgate/engage/reviews/components/Reviews/components/List';
import AllReviewsLink from '@shopgate/engage/reviews/components/Reviews/components/AllReviewsLink';

const useStyles = makeStyles()(() => ({
  container: {
    marginBottom: 8,
  },
}));

/**
 * The Product Reviews component rendered inside the accordion on the pdp.
 * @param {Object} props The component props.
 * @returns {JSX}
 */
const Reviews = ({ productId }) => {
  const { classes } = useStyles();
  const reviews = useSelector(state => getProductReviewsExcerpt(state, { productId }));

  return (
    <div className={classes.container} data-test-id="reviewSection">
      <Header productId={productId} />
      <List reviews={reviews} />
      <AllReviewsLink productId={productId} />
    </div>
  );
};

Reviews.propTypes = {
  productId: PropTypes.string,
};

Reviews.defaultProps = {
  productId: null,
};

export default withCurrentProduct(Reviews);
