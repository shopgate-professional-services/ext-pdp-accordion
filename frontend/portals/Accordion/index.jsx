import React from 'react';
import AccordionContainer from '../../components/AccordionContainer';
import { container } from './styles';

/**
 * The Accordion component
 * @returns {JSX}
 */
const Accordion = () => (
  <div className={`pdp-accordion ${container}`}>
    <AccordionContainer />
  </div>
);

export default Accordion;
