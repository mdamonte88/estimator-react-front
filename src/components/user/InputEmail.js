import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import Loading from '../common/Loading';
import Input from '../common/Input';
import { validations, inputEmail } from '../../utils/constraints';

const messages = defineMessages({
  email: { id: 'form.email' }
});

export const InputEmail = ({ handleSubmit, error, submitting, intl }) => (
  <form onSubmit={handleSubmit} className="form-group">
    {error && <strong>{error}</strong>}
    <div>
      <Field
        name="email"
        label={intl.formatMessage(messages.email)}
        component={Input}
        type="email"
      />
    </div>
    <button type="submit" className="btn btn-primary">
      <FormattedMessage id="form.submit" />
    </button>
    {submitting && <Loading />}
  </form>
);

InputEmail.propTypes = {
  handleSubmit: func.isRequired,
  intl: intlShape.isRequired,
  submitting: bool.isRequired,
  error: string
};

export default reduxForm({
  form: 'inputEmail',
  validate: validations(inputEmail, { fullMessages: false })
})(injectIntl(InputEmail));
