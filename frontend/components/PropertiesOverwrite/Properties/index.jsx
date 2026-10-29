import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@shopgate/engage/styles';
import HTMLContent from '../../HTMLContent';

const useStyles = makeStyles()(theme => ({
  content: {
    fontSize: theme.typography.body2.fontSize,
    padding: '0 16px',
    marginBottom: 12,
  },
  contentAccordion: {
    padding: '0 !important',
    marginBottom: '0 !important',
  },
  cell: {
    maxWidth: 100,
    padding: '2px 5px 2px 0',
    overflowWrap: 'break-word',
  },
  table: {
    paddingTop: 2,
  },
}));

/**
 * The Product Properties component.
 *
 * @param {Object} props The component props.
 * @returns {JSX|null}
 */
const Properties = ({ properties, isAccordion }) => {
  const { classes, cx } = useStyles();

  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <div className={cx('engage__product__product-properties', classes.content, isAccordion && classes.contentAccordion)}>
      <table className={classes.table}>
        <tbody>
          {properties.map(({ label, value }, index) => (
            <tr key={`${label}_${value}`}>
              <td className={classes.cell}>{label}</td>
              <td className={classes.cell} data-test-id={`property: ${value}`}>
                <HTMLContent contentId={`properties-${index}-${label}`}>{value}</HTMLContent>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Properties.propTypes = {
  isAccordion: PropTypes.bool,
  properties: PropTypes.arrayOf(PropTypes.shape()),
};

Properties.defaultProps = {
  properties: null,
  isAccordion: false,
};

export default Properties;
