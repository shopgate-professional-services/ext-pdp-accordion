import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { PlaceholderParagraph } from '@shopgate/engage/components';
import { makeStyles } from '@shopgate/engage/styles';
import HTMLContent from '../../HTMLContent';

const useStyles = makeStyles()(theme => ({
  container: {
    fontSize: theme.typography.body2.fontSize,
    userSelect: 'none',
  },
  placeholder: {
    height: 14,
  },
}));

/**
 * The Product Description component.
 * @param {Object} props The component props.
 * @returns {JSX}
 */
const Description = (props) => {
  const { classes } = useStyles();

  if (props.html === '') {
    return null;
  }

  return (
    <div className={classes.container}>
      <PlaceholderParagraph className={classes.placeholder} ready={!!props.html}>
        <HTMLContent contentId="description">
          {props.html}
        </HTMLContent>
      </PlaceholderParagraph>
    </div>
  );
};

Description.propTypes = {
  html: PropTypes.string,
};

Description.defaultProps = {
  html: null,
};

export default memo(Description);
