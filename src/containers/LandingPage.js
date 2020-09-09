import { func, object } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import routes from '../constants/routesPaths';
import { selectPlatform } from '../actions/landingActions';

class LandingPage extends Component {
  handleClick(id) {
    this.props.selectPlatform(id);
  }

  render() {
    const { types } = this.props;
    return (
      <div className="container">
        <h2><FormattedMessage id="landing.title" /></h2>
        <div className="row" >
          {types.map((type, key) =>
            <div key={key} className="typeStyle" onClick={() => this.handleClick(type.id)}>
              <Link to={routes.questions}>
                <h2>{type.image}</h2>
              </Link>
            </div>)}
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  selectPlatform: func.isRequired,
  types: object.isRequired
};

const mapStateToProps = state => ({
  types: state.getIn(['landing', 'types']).toJS()
});

const mapDispatch = dispatch => ({
  selectPlatform: id => dispatch(selectPlatform(id))
});

export default connect(mapStateToProps, mapDispatch)(LandingPage);
