import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const content = css({
  fontSize: 14,
  padding: `0 ${(themeConfig.variables.gap.small * 1.375)}px ${themeConfig.variables.gap.big}px`,
  marginBottom: 12,
}).toString();

const label = css({
  paddingBottom: (themeConfig.variables.gap.small * 1.5),
}).toString();

const cell = css({
  maxWidth: 100,
  padding: '2px 5px',
  overflowWrap: 'break-word',
}).toString();

const table = css({
  paddingTop: 2,
}).toString();

export default {
  content,
  label,
  cell,
  table,
};
