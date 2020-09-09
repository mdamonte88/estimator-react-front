import React from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import LoginForm from '../components/user/LoginForm';
import { login } from '../actions/sessionActions';
import routes from '../constants/routesPaths';

const LoginPage = ({ login, authenticated }) => {
  if (authenticated) {
    return <Redirect to={routes.index} />;
  }
  return (
    <Container>
      <Row>
        <Col xs={12} md={12} className="login login-title">
          Please, log in.
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} className="login">
          <LoginForm onSubmit={login} />
        </Col>
      </Row>
    </Container>
  );
};

LoginPage.propTypes = {
  login: func.isRequired,
  authenticated: bool.isRequired,
};

const mapState = state => ({
  authenticated: state.getIn(['session', 'authenticated'])
});

const mapDispatch = dispatch => ({
  login: user => dispatch(login(user.toJS()))
});

export default connect(mapState, mapDispatch)(LoginPage);
