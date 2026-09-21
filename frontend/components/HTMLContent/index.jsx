import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { HtmlSanitizer } from '@shopgate/engage/components';
import { useNavigation } from '@shopgate/engage/core/hooks';
import { makeStyles } from '@shopgate/engage/styles';

const useStyles = makeStyles()(theme => ({
  content: {
    lineHeight: 1.7,
    overflow: 'hidden',
    wordBreak: ['break-all', 'break-word'],
    hyphens: 'auto',
    '& ul': {
      listStyle: 'disc',
    },
    '& ol': {
      listStyle: 'decimal',
    },
    '& ul, & ol': {
      margin: '.75em 0',
      paddingLeft: '1.2em',
    },
    '& a': {
      color: theme.palette.primary.main,
      margin: '-.35em',
      padding: '.35em',
      position: 'relative',
    },
    '& p': {
      marginTop: 0,
    },
  },
}));

/**
 * HTMLContent
 * @param {Object} props The component props
 * @returns {JSX}
 */
const HTMLContent = ({ children, contentId, processStyles }) => {
  const { classes } = useStyles();
  const { push } = useNavigation();

  const handleClick = useCallback((pathname, target) => {
    push({
      pathname,
      ...target && { state: { target } },
    });
  }, [push]);

  return (
    <div className={classes.content}>
      <HtmlSanitizer
        processStyles={processStyles}
        settings={{
          extension: 'pdp-accordion',
          content: contentId,
          handleClick,
        }}
      >
        {children}
      </HtmlSanitizer>
    </div>
  );
};

HTMLContent.propTypes = {
  contentId: PropTypes.string.isRequired,
  children: PropTypes.node,
  processStyles: PropTypes.bool,
};

HTMLContent.defaultProps = {
  children: null,
  processStyles: false,
};

export default HTMLContent;
