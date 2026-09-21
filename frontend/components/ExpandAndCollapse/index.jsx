import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { I18n } from '@shopgate/engage/components';
import { makeStyles } from '@shopgate/engage/styles';
import getConfig from '../../helpers/getConfig';

const { sectionPreviewHeight } = getConfig();

const useStyles = makeStyles()(theme => ({
  expandButton: {
    color: theme.palette.text.primary,
    marginTop: 10,
    textDecoration: `underline ${theme.palette.primary.main}`,
    '&:focus': {
      outline: 'none',
    },
  },
  specialTextNoExpand: {},
  specialText: {
    position: 'relative',
    maxHeight: sectionPreviewHeight || '100',
    overflow: 'hidden',
    transition: 'max-height 1s ease',
    '&.-expanded': {
      maxHeight: '10000vh',
    },
    '&:not(.-expanded):after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: `linear-gradient(transparent, ${theme.palette.background.default})`,
    },
  },
}));

/**
 * The ExpandAndCollapse component.
 * @param {Object} props The component props.
 * @returns {JSX}
 */
const ExpandAndCollapse = ({ children }) => {
  const { classes, cx } = useStyles();
  const expandRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(true);

  const html = children && children.props ? children.props.html : undefined;

  useEffect(() => {
    if (!expandRef.current) {
      return;
    }
    setShowExpandButton(expandRef.current.clientHeight >= parseInt(sectionPreviewHeight, 10));
  }, [html]);

  const handleClick = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  if (!showExpandButton) {
    return (
      <div>
        <div ref={expandRef} className={classes.specialTextNoExpand}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div ref={expandRef} className={cx(classes.specialText, expanded && '-expanded')}>
        {children}
      </div>
      <button type="button" className={classes.expandButton} onClick={handleClick}>
        {expanded
          ? <I18n.Text string="accordion.expandButton.labelCollapse" />
          : <I18n.Text string="accordion.expandButton.labelExpand" />}
      </button>
    </div>
  );
};

ExpandAndCollapse.propTypes = {
  children: PropTypes.instanceOf(Object),
};

ExpandAndCollapse.defaultProps = {
  children: null,
};

export default ExpandAndCollapse;
