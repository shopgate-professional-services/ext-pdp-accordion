import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const containerDefaults = {
  fontWeight: 500,
  margin: 0,
};

const container = css(containerDefaults).toString();

const withTopGapContainer = css({
  ...containerDefaults,
  marginTop: themeConfig.variables.gap.xbig,
}).toString();

const reviewsLine = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: `0 0 ${themeConfig.variables.gap.small}px`,
  marginBottom: -2,
}).toString();

const averageRatingNumber = css({
  color: themeConfig.colors.primary,
  marginLeft: themeConfig.variables.gap.small,
}).toString();

const averageRatingText = css({
  marginLeft: 0,
}).toString();

const noReviews = css({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  alignItems: 'center',
  padding: `0 ${themeConfig.variables.gap.small}px`,
  paddingTop: themeConfig.variables.gap.small,
  textAlign: 'center',
}).toString();

export default {
  container,
  reviewsLine,
  averageRatingNumber,
  averageRatingText,
  withTopGapContainer,
  noReviews,
};
