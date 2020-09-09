import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import routes from '../constants/routesPaths';
import bludcode from '../images/bludcode.png';

const HomePage = () => (
  <Container className="home-page">
    <Row className="center-items">
      <Col>
        <img src={bludcode} alt="Bludcode Logo" className="bludcode-logo-intro" />
      </Col>
    </Row>
    <Row>
      <Col>
        <h1 className="title-intro">Roadmapping do it yourself</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <Link to={routes.questions}>
          <Button className="button-start-rmdiy">Start</Button>
        </Link>
      </Col>
    </Row>
    <Row>
      <Col>
        <p className="paragraph-intro">
        Bludcode Roadmapping is a process where we dive deep into the concept for your product,
          design a solution that solves the core problem while staying lean, and prepare you with everything
          you need to develop your product the right way. At the end of a Roadmapping session,
          you’ll come out with a clickable prototype, a step-by-step blueprint for development,
          and the knowledge that your product is ready for its users.
        </p>
      </Col>
    </Row>
  </Container>
);

export default HomePage;
