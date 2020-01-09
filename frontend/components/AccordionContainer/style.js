import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import getConfig from '../../helpers/getConfig';

const {
  sectionColor,
  sectionTextColor,
  sectionButtonColor,
  sectionButtonTextColor,
  sectionButtonTextSize,
} = getConfig();

const container = css({
  backgroundColor: themeConfig.colors.shade8,
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
  borderColor: 'white',
  borderStyle: 'solid',
});

const sectionBlock = css({
  backgroundColor: sectionColor || '#fff',
  color: sectionTextColor || null,
  fontSize: 14,
  lineHeight: 1.7,
  wordBeak: 'break-word',
  padding: `12px ${themeConfig.variables.gap.big}px 12px ${themeConfig.variables.gap.big}px`,
});

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
});

export default {
  container,
  sectionTitleWrapper,
  sectionTitle,
  sectionButton,
  sectionBlock,
  arrow,
  arrowUp,
  arrowDown,
  stars,
};
