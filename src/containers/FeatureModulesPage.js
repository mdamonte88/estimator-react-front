import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import FeatureModuleList from './ListModules';
import AppContainer from './MyAppContainer';

const FeatureModulesPage = () => (
  <Container className="modules-container">
    <Row className="show-grid">
      <Col xs={12} md={12}>
        <FeatureModuleList title="Add Features" />
      </Col>
      <Col xs={4} md={3}>
        <AppContainer />
      </Col>
    </Row>
  </Container>
);

export default FeatureModulesPage;
