import React from 'react';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import routes from '../constants/routesPaths';
import { enterEmailComunication } from '../actions/appActions';
import ProgressBar from '../components/common/ProgressBar';
import NavBackClose from '../components/common/NavBackClose';
import OpenQuestion from '../components/questions/OpenQuestion';
import { emailValidate } from '../utils/formValidators';
import { PROGRESS_APP_PERCENTAGES as progress } from '../constants/constants';

const EmailPage = ({ setEmail, email }) => (
  <div className="container">
    <ProgressBar progress={progress.one} />
    <div className="px-12">
      <NavBackClose linkClose={routes.questions} />
    </div>
    <OpenQuestion
      name="email"
      title="Enter email for communication"
      subTitle="please enter your email!"
      inputPlaceholder="Example@example.com..."
      inputInitialValue={email}
      buttonText="Continue"
      buttonLink={routes.questions}
      handleSubmit={email => setEmail(email)}
      validateType={emailValidate}
      footerLink={routes.emailApp}
    />
  </div>
);

EmailPage.propTypes = {
  setEmail: func.isRequired,
  email: string.isRequired
};

const mapStateToProps = state => ({
  email: state.getIn(['myApp', 'email'])
});

const mapDispatchToProps = dispatch => ({
  setEmail: email => dispatch(enterEmailComunication(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailPage);
