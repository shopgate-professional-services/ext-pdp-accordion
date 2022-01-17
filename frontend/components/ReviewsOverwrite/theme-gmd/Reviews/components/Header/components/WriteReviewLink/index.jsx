import { withCurrentProduct } from '@shopgate/engage/core';
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import I18n from '@shopgate/pwa-common/components/I18n';
import { ITEM_PATH } from '@shopgate/pwa-common-commerce/product/constants';
import { bin2hex } from '@shopgate/pwa-common/helpers/data';
import ButtonLink from '@shopgate/pwa-ui-shared/ButtonLink';
import connect from './connector';

const buttonStyle = css({
  paddingRight: 0,
}).toString();

/**
 * Link to add a review.
 * @returns {JSX|null}
 */
const WriteReviewLink = ({ productId }) => {
  if (!productId) {
    return null;
  }

  const publicProductId = bin2hex(productId);

  return (
    <div data-test-id="writeReview">
      <ButtonLink className={buttonStyle} href={`${ITEM_PATH}/${publicProductId}/write_review`} noGap>
        <I18n.Text string="reviews.button_add" />
      </ButtonLink>
    </div>
  );
};

WriteReviewLink.propTypes = {
  productId: PropTypes.string,
};

WriteReviewLink.defaultProps = {
  productId: null,
};

export default withCurrentProduct(connect(WriteReviewLink));
