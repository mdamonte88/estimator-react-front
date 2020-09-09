import React, { Component } from 'react';
import { object, string, array, func } from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Modal } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getAppModules } from '../reducers';
import { removeFromApp, addToVariationsSelected, removeVariationIdFromMyApp, addToSelected } from '../actions/appActions';
import { showModules } from '../actions/moduleActions';
import routes from '../constants/routesPaths';
import FeatureModuleItem from '../components/featureModules/FeatureModuleItem';
import FeatureModuleDetails from '../components/featureModules/FeatureModuleDetails';
import Header from '../components/common/Header';
import Title from '../components/common/Title';
import { DEFAULT_APP_NAME } from '../constants/constants';
import { moduleVariations, selectModuleVariation, cleanBacklogVariation } from '../actions/moduleVariationsActions';
import SaveButton from '../components/common/SaveMyApp';
import emptyFeatures from '../images/emptyFeatures.png';

class MyAppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      mod: null,
      showModulesDetails: true,
    };
    this.toggle = this.toggle.bind(this);
    this.selectVariation = this.selectVariation.bind(this);
    this.handleViewBacklogDetails = this.handleViewBacklogDetails.bind(this);
  }

  componentDidMount() {
    const {
      showModules,
      modules,
      moduleVariations
    } = this.props;

    showModules();
    modules && modules.forEach(({ id }) => {
      id && moduleVariations(id);
    });
  }

  selectVariation(variationId, moduleId) {
    this.props.doSelectModuleVariation(variationId, moduleId);
  }

  handleViewBacklogDetails() {
    this.setState({ showModulesDetails: !this.state.showModulesDetails });
  }

  toggle(module) {
    this.setState({
      modal: !this.state.modal,
      mod: module
    }, () => {
      if (this.state.modal) {
        this.props.cleanBacklogVariation();
        this.setState({ showModulesDetails: true });
      }
    });
  }

  render() {
    const { mod, modal, showModulesDetails } = this.state;
    const { appName,
      modules,
      removeFromApp,
      addToVariationsSelected,
      removeVariationIdFromMyApp,
      userStories,
      variations
    } = this.props;
    return (
      <div className="min-h-screen bg-blue-green">
        <Header menuActive={{ screens: true }} />
        <Container>
          <div>
            { modal &&
            <Modal isOpen={modal} toggle={this.toggle} size="lg" >
              <FeatureModuleDetails
                key={mod.id}
                module={mod}
                moduleUnique={mod}
                viewDetails={showModulesDetails}
                viewBacklog={this.handleViewBacklogDetails}
                selectVariation={() => addToVariationsSelected}
                toggle={this.toggle}
                removeVariation={() => removeVariationIdFromMyApp}
              />
            </Modal>}
          </div>
          <Row className="main-row">
            <Col xs={10}>
              <Title title={appName || DEFAULT_APP_NAME} />
              {!modules.length &&
                <div className="empty-features">
                  <img src={emptyFeatures} alt="" />
                  <h1> It’s time to add some features into your App. </h1>
                  <h2>
                    Click on the add button below and select the ones you need.
                  </h2>
                </div>
              }
              <div className="show-grid" >
                {
                  modules.map((featureModule) => {
                    if (!featureModule) { return false; }
                    const {
                      id,
                      defaultVariation = {},
                      name,
                      moduleCategories
                    } = featureModule;
                    const modalImage = (defaultVariation && defaultVariation.image) || '';
                    return <FeatureModuleItem
                      className="col-xs-12 col-sm-6 col-lg-4 col-xl-3"
                      openModal={() => this.toggle(featureModule)}
                      key={id}
                      id={id}
                      name={name}
                      image={modalImage}
                      categories={moduleCategories}
                      onRemoveFromAppClicked={() =>
                        removeFromApp(featureModule, userStories, variations)}
                    />;
                  })
                }
                <Link
                  to={routes.listModules}
                  className="plus-link"
                >
                  <button className="select-feature-modules" > + </button>
                </Link>
                <SaveButton />
              </div>
            </Col>
          </Row>
          <div className="app-white-gradient" />
        </Container>
      </div>
    );
  }
}

MyAppContainer.propTypes = {
  showModules: func.isRequired,
  modules: array.isRequired,
  removeFromApp: func.isRequired,
  appName: string,
  cleanBacklogVariation: func.isRequired,
  doSelectModuleVariation: func.isRequired,
  moduleVariations: func.isRequired,
  addToVariationsSelected: func.isRequired,
  removeVariationIdFromMyApp: func.isRequired,
  variations: object.isRequired,
  userStories: object.isRequired
};

function getModulesSelected(state) {
  return getAppModules(state);
}

const mapStateToProps = state => ({
  modules: getModulesSelected(state),
  appName: state.getIn(['myApp', 'name']),
  variations: state.getIn(['moduleVariations', 'moduleVariations']).toJS(),
  userStories: state.getIn(['userStories', 'userStories']).toJS()
});

const mapDispatchToProps = dispatch => ({
  showModules: () => dispatch(showModules()),
  removeFromApp: (featureModule, userStories, variations) =>
    dispatch(removeFromApp(featureModule, userStories, variations)),
  moduleVariations: id => dispatch(moduleVariations(id)),
  addToVariationsSelected: (varId, usersFromVariationId) =>
    dispatch(addToVariationsSelected(varId, usersFromVariationId)),
  doSelectModuleVariation: (variationId, moduleId) =>
    dispatch(selectModuleVariation(variationId, moduleId)),
  cleanBacklogVariation: () => dispatch(cleanBacklogVariation()),
  removeVariationIdFromMyApp: (varId, usersFromVariationId) =>
    dispatch(removeVariationIdFromMyApp(varId, usersFromVariationId)),
  addSuggestionSelected: id => dispatch(addToSelected(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAppContainer);
