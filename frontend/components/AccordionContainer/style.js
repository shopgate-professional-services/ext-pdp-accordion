import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import getConfig from '../../helpers/getConfig';

const {
  sectionColor,
  sectionBorderColor,
  sectionTextColor,
  sectionButtonColor,
  sectionButtonTextColor,
  sectionButtonTextSize,
  animate,
} = getConfig();

const animationDuration = 500;

const container = css({
  backgroundColor: themeConfig.colors.shade8,
  marginBottom: 28,
});

const sectionButton = css({
  fontSize: sectionButtonTextSize || 16,
  fontWeight: 500,
  color: sectionButtonTextColor || '#000',
  background: sectionButtonColor || themeConfig.colors.shade8,
  width: '100%',
  textAlign: 'left',
  outline: 'none',
  padding: themeConfig.variables.gap.big,
  borderTop: 1,
  borderTopStyle: 'solid',
  borderTopColor: sectionBorderColor || 'white',
});

const sectionBorder = css({
  borderBottom: 1,
  borderBottomStyle: 'solid',
  borderBottomColor: sectionBorderColor || 'white',
});

const sectionBlock = css({
  backgroundColor: sectionColor || '#fff',
  color: sectionTextColor || null,
  fontSize: 14,
  lineHeight: 1.7,
  wordBeak: 'break-word',
  padding: `0 ${themeConfig.variables.gap.big}px 12px ${themeConfig.variables.gap.big}px`,
});

const transitionBlock = css({
  ...(animate ? {
    transition: `max-height ${animationDuration}ms cubic-bezier(0, 1, 0, 1)`,
  } : null),
  maxHeight: 0,
  overflow: 'hidden',
}).toString();

const transitionBlockOpen = css({
  ...(animate ? {
    transition: `max-height ${animationDuration * 2}ms ease-in-out !important`,
  } : null),
  maxHeight: '1000vh !important',
}).toString();

const arrow = css({
  flex: '0 0 auto',
});

const arrowDown = css({
  transform: 'rotate(270deg)',
}).toString();

const arrowUp = css({
  transform: 'rotate(90deg)',
}).toString();

const stars = css({
  flex: '30 0 auto',
});

const sectionTitleWrapper = css({
  display: 'flex',
  alignItems: 'center',
});

const sectionTitle = css({
  fontWeight: '500',
  flex: '1 1 auto',
  display: 'flex',
  alignItems: 'center',
  paddingRight: 8,
});

export default {
  container,
  sectionTitleWrapper,
  sectionTitle,
  sectionButton,
  transitionBlock,
  transitionBlockOpen,
  sectionBlock,
  sectionBorder,
  arrow,
  arrowUp,
  arrowDown,
  stars,
};
