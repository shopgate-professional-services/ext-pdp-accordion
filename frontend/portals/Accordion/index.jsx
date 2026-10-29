import React from 'react';
import { makeStyles } from '@shopgate/engage/styles';
import AccordionContainer from '../../components/AccordionContainer';

const useStyles = makeStyles()(() => ({
  container: {
    paddingBottom: 16,
  },
}));

/**
 * The Accordion component
 * @returns {JSX}
 */
const Accordion = () => {
  const { classes } = useStyles();

  return (
    <div className={`pdp-accordion ${classes.container}`}>
      <AccordionContainer />
    </div>
  );
};

export default Accordion;
