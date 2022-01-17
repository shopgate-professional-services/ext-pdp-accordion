import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const content = css({
  fontSize: 14,
  padding: '0 16px',
  marginBottom: 12,
}).toString();

const contentAccordion = css({
  padding: '0 !important',
  marginBottom: '0 !important',
});

const label = css({
  paddingBottom: (themeConfig.variables.gap.small * 1.5),
}).toString();

const cell = css({
  maxWidth: 100,
  padding: '2px 5px 2px 0',
  overflowWrap: 'break-word',
}).toString();

const table = css({
  paddingTop: 2,
}).toString();

export default {
  content,
  contentAccordion,
  label,
  cell,
  table,
};
