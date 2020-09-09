import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import '../../styles/styles.scss';
import { enterEmailComunication, saveLocalStore } from '../../actions/appActions';

class SaveMyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    const { saveLocalStore, actualState } = this.props;
    return (
      <div>
        <Button
          className="save-button"
          onClick={() => saveLocalStore(actualState)}
        >
            Save!
        </Button>
      </div>
    );
  }
}

SaveMyApp.propTypes = {
  saveLocalStore: func.isRequired,
  actualState: object.isRequired
};

const mapDispatchToProps = dispatch => ({
  saveLocalStore: state => dispatch(saveLocalStore(state)),
  setEmail: email => dispatch(enterEmailComunication(email))
});

const mapStateToProps = state => ({
  actualState: state.toJS(),
  email: state.getIn(['myApp', 'email'])
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveMyApp);
