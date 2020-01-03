import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
/**
 * Styles for a link parent container.
 * @type {string}
 */
const container = css({
  display: 'flex',
  justifyContent: 'flex-end',
  textAlign: 'right',
  marginTop: -themeConfig.variables.gap.small,
  marginBottom: -themeConfig.variables.gap.big,
});

export { container };
