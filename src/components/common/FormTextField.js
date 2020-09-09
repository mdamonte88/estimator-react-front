import React from 'react';
import { Alert, Label, Input } from 'reactstrap';
import { string, object } from 'prop-types';

const FormTextField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error } }) =>
  (
    <div>
      <Label>{label}</Label>
      <div>
        <Input {...input} type={type} placeholder={placeholder} />
        {touched && error && <Alert color="danger">{error}</Alert>}
      </div>
    </div>
  );

FormTextField.propTypes = {
  input: object.isRequired,
  label: string.isRequired,
  type: string.isRequired,
  placeholder: string.isRequired,
  meta: object.isRequired
};

export default FormTextField;
