import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const container = css({
  marginBottom: themeConfig.variables.gap.small,
}).toString();

export default {
  container,
};
