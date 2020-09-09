import React from 'react';
import { node, string } from 'prop-types';
import { ListGroup } from 'reactstrap';

const FeatureModulesList = ({ title, children }) => {
  const nodes = children.length > 0 ? children : (
    <h5><em>Add some modules to your app!!</em></h5>
  );
  return (
    <div>
      <h3>{title}</h3>
      <ListGroup>{nodes}</ListGroup>
    </div>
  );
};

FeatureModulesList.propTypes = {
  children: node,
  title: string.isRequired
};

export default FeatureModulesList;
