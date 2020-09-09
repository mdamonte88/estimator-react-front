import React from 'react';
import { func, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl } from 'react-intl';
import { Container, Row, Col } from 'reactstrap';

import Loading from '../common/Loading';
import Input from '../common/Input';
import { validations, signUp } from '../../utils/constraints';

const SignUpForm = ({ handleSubmit, submitting }) => (
  <Container>
    <Row>
      <Col md={{ size: 6, offset: 3 }} className="sign-up">
        <form onSubmit={handleSubmit}>
          <div className="input-sign-up">
            <Field
              name="email"
              placeholder="your email"
              component={Input}
              type="email"
            />
          </div>
          <div className="input-sign-up">
            <Field
              name="password"
              placeholder="choose a password"
              component={Input}
              type="password"
            />
          </div>
          <div className="input-sign-up">
            <Field
              name="passwordConfirmation"
              placeholder="password confirmation"
              component={Input}
              type="password"
            />
          </div>
          <div className="sign-up-button">
            <button type="submit">
              Sign Up
            </button>
          </div>
          {submitting && <Loading />}
        </form>
      </Col>
    </Row>
  </Container>
);

SignUpForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool.isRequired,
};

export default reduxForm({
  form: 'signUp',
  validate: validations(signUp, { fullMessages: false })
})(injectIntl(SignUpForm));
