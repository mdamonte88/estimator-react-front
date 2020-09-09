import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl } from 'react-intl';
import Link from 'react-router-dom/Link';
import Loading from '../common/Loading';
import Input from '../common/Input';
import { validations, login } from '../../utils/constraints';
import InputDecoration from '../../icons/InputDecoration';
import routes from '../../constants/routesPaths';

export const LoginForm = ({ handleSubmit, error, submitting }) => (
  <div className="login-form-container">
    <form onSubmit={handleSubmit} className="form-group">
      {error && <strong>{error}</strong>}
      <div className="open-question">
        <div className="input-login">
          <Field
            name="email"
            component={Input}
            type="email"
            placeholder="email..."
          />
          <InputDecoration />
        </div>
        <div className="input-login">
          <Field
            name="password"
            component={Input}
            type="password"
            placeholder="password..."
          />
          <InputDecoration />
        </div>
        <div className="login-button">
          <button type="submit">
            Login
          </button>
        </div>
        <div className="link-to-sign-up">
          <Link to={routes.signUp}>
            Not registered? Sign up.
          </Link>
          {submitting && <Loading />}
        </div>
      </div>
    </form>
  </div>
);

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool.isRequired,
  error: string
};

export default reduxForm({
  form: 'login',
  validate: validations(login, { fullMessages: false })
})(injectIntl(LoginForm));
