import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const main = {
  fontSize: 12,
  margin: '0 0.5em 0 0 !important',
  lineHeight: '2em',
  textAlign: 'left',
};

const greyStyle = css({
  ...main,
  color: themeConfig.colors.shade3,
  fontSize: 12,
}).toString();

const prominentStyle = css({
  ...main,
  color: themeConfig.colors.primary,
}).toString();

export {
  greyStyle,
  prominentStyle,
};

