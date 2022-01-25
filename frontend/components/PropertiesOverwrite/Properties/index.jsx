import React from 'react';
import PropTypes from 'prop-types';
import HTMLContent from '../../HTMLContent';
import styles from './style';

/**
 * The Product Properties component.
 *
 * @param {Object} props The component props.
 * @returns {JSX|null}
 */
const Properties = ({ properties, isAccordion }) => {
  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.content} ${isAccordion ? styles.contentAccordion : ''}`}>
      <table className={styles.table}>
        <tbody>
          {properties.map(({ label, value }) => (
            <tr key={`${label}_${value}`}>
              <td className={styles.cell}>{label}</td>
              <td className={styles.cell} data-test-id={`property: ${value}`}>
                <HTMLContent>{value}</HTMLContent>
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
