import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccordionSection from './AccordionSection';

import styles from './style';

/**
 * Accordion Component
 * @param {string} label AccordionSection label
 */
class AccordionContainer extends Component {
  static propTypes = {
    allowMultipleOpen: PropTypes.bool,
    children: PropTypes.instanceOf(Object),
  };

  static defaultProps = {
    children: null,
  };

  /**
   * Constructor.
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    const openSections = {};

    this.props.children.forEach((child) => {
      if (child.props.isOpen) {
        openSections[child.props.label] = true;
      }
    });

    this.state = { openSections };
  }

  onClick = (label) => {
    const {
      props: { allowMultipleOpen },
      state: { openSections },
    } = this;

    const isOpen = !!openSections[label];

    if (allowMultipleOpen) {
      this.setState({
        openSections: {
          ...openSections,
          [label]: !isOpen,
        },
      });
    } else {
      this.setState({
        openSections: {
          [label]: !isOpen,
        },
      });
    }
  };

  /**
   * Renders Accordion
   * @returns {JSX}
   */
  render() {
    const {
      onClick,
      props: { children },
      state: { openSections },
    } = this;

    return (
      <div className={styles.container}>
        {children.map(child => (
          <AccordionSection
            isOpen={!!openSections[child.props.label]}
            key={child.props.label}
            label={child.props.label}
            onClick={onClick}
            isRating={child.props.isRating}
            rating={child.props.rating}
          >
            {child.props.children}
          </AccordionSection>
        ))}
      </div>
    );
  }
}

AccordionContainer.defaultProps = {
  allowMultipleOpen: false,
};

export default AccordionContainer;
