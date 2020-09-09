import React from 'react';
import { string, func } from 'prop-types';
import { Button } from 'reactstrap';

const NextStepButton = ({
  label,
  onClick
}) => (
  <Button className="next-question" outline color="success" onClick={onClick}>
    {label}
  </Button>
);

NextStepButton.propTypes = {
  label: string,
  onClick: func.isRequired
};

export default NextStepButton;
