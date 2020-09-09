import React from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';

import SignUpForm from '../components/user/SignUpForm';
import { signUp } from '../actions/userActions';
import routes from '../constants/routesPaths';

const SignUpPage = ({ signUp, authenticated }) => {
  if (authenticated) {
    return <Redirect to={routes.index} />;
  }
  return (
    <Container>
      <Row>
        <Col xs={12} md={12} className="sign-up sign-up-title">
          Sign Up.
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12}>
          <SignUpForm onSubmit={signUp} />
        </Col>
      </Row>
    </Container>
  );
};

SignUpPage.propTypes = {
  signUp: func.isRequired,
  authenticated: bool.isRequired
};

const mapState = state => ({
  authenticated: state.getIn(['session', 'authenticated'])
});

const mapDispatch = dispatch => ({
  signUp: user => dispatch(signUp(user.toJS()))
});

export default connect(mapState, mapDispatch)(SignUpPage);
