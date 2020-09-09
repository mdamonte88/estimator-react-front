import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { func, bool } from 'prop-types';
import FormTextField from './FormTextField';
import { required, maxLength } from '../../utils/formValidators';

const CommentForm = (props) => {
  const { handleSubmit, submitting } = props;
  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <Field
        name="comment"
        type="text"
        component={FormTextField}
        placeholder="Leave a note..."
        label="Notes"
        validate={[required, maxLength]}
        className="comment-box"
      />
      <div className="button-link">
        <div className="button-submit">
          <button type="submit" disabled={submitting} className="button btn-submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool.isRequired
};

export default reduxForm({
  form: 'CommentForm',
  fields: ['comment', 'moduleId'],
})(CommentForm);
