import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import Link from 'react-router-dom/Link';

import Status from '../components/routes/Status';
import bludcodeLogo from '../icons/rootstrap-animated-logo.svg';
import thumbDown from '../icons/thumb_down.svg';
import routes from '../constants/routesPaths';

const NotFoundPage = () => (
  <Status code={404}>
    <Container>
      <Row className="page-not-found">
        <Col xs={12} className="logo-header">
          <img src={bludcodeLogo} alt="logo" />
        </Col>
        <Col xs={{ size: 6, offset: 1 }}>
          <h1> Oops ! </h1>
          <h2>
          The page you were looking for has been moved, deleted or never existed :(
          </h2>
          <h5> if you were looking for the 404 Page you did it </h5>
        </Col>
        <Col xs={{ size: 2, offset: 1 }} className="thumb-down">
          <img src={thumbDown} alt="logo" />
        </Col>
        <Col xs={12} className="end-info-not-found">
          <Link className="go-back" to={routes.index}>
            Start Again
          </Link>
        </Col>
      </Row>
    </Container>
  </Status>
);

export default NotFoundPage;
