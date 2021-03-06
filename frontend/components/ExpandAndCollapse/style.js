import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import getConfig from '../../helpers/getConfig';

const {
  sectionTextColor,
  sectionPreviewHeight,
} = getConfig();

const expandButton = css({
  color: sectionTextColor || '#000',
  marginTop: 10,
  textDecoration: `underline ${themeConfig.colors.primary}`,
  ':focus': {
    outline: 'none',
  },
}).toString();

const specialTextNoExpand = css({
}).toString();

const specialText = css({
  position: 'relative',
  maxHeight: sectionPreviewHeight || '100',
  overflow: 'hidden',
  transition: 'max-height 1s ease',
  '&.-expanded': {
    maxHeight: '10000vh',
  },
  '&:not(.-expanded):after': {
    content: ' ',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
  },
}).toString();

export default {
  expandButton,
  specialTextNoExpand,
  specialText,
};
