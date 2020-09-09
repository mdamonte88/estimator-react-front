import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';

import { showSingleModule } from '../actions/moduleActions';

class ModuleFeatures extends Component {
  componentDidMount() {
    const { showSingleModule, match } = this.props;
    showSingleModule(match.params.moduleId);
  }

  render() {
    const { module } = this.props;
    return (
      <div className="container">
        <h1>{module.name}</h1>
        <h2>{module.description}</h2>
        <h2>{module.id}</h2>
        <h2>{module.image}</h2>
        <img src={module.image} alt="imagen del modulo" />
      </div>
    );
  }
}

ModuleFeatures.propTypes = {
  module: object.isRequired,
  showSingleModule: func.isRequired,
  match: object
};

const mapState = state => ({
  modules: state.getIn(['module', 'modules']).toJS(),
  module: state.getIn(['module', 'module']).toJS()
});

const mapDispatch = dispatch => ({
  showSingleModule: id => dispatch(showSingleModule(id))
});

export default connect(mapState, mapDispatch)(ModuleFeatures);
