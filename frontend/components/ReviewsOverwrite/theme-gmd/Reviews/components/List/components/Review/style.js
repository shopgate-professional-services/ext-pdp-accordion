import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

export default css({
  marginLeft: 0,
  padding: `${themeConfig.variables.gap.big}px ${themeConfig.variables.gap.big}px ${themeConfig.variables.gap.big}px 0`,
  borderTop: `1px solid ${themeConfig.colors.shade7}`,
}).toString();
