import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const list = css({
  listStyleType: 'disc',
  padding: `0px ${themeConfig.variables.gap.big}px 0px ${themeConfig.variables.gap.big}px`,
});

export default {
  list,
};
