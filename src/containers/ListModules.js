import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, bool, func, object } from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Button } from 'reactstrap';
import { addToSelected,
  removeFromSelected,
  addAllToApp,
  loadAddedModules
} from '../actions/appActions';
import FeatureModuleCard from '../components/featureModules/FeatureModuleCard';
import { showSingleModule } from '../actions/moduleActions';
import { getModulesCategories, setModuleCategory } from '../actions/categoriesActions';
import CategorySidebar from './CategorySidebar';
import routes from '../constants/routesPaths';
import { filterByCategory, filterBySearchInput } from '../helpers/categorySidebarHelpers';

class ListModules extends Component {
  componentDidMount() {
    const {
      loadAddedModules,
      getModulesCategories } = this.props;

    loadAddedModules();
    getModulesCategories();
  }

  render() {
    const { modules,
      onAddClick,
      onRemoveClick,
      modulesCategories,
      setModuleCategory,
      addSelectedToApp,
      toAddModules,
      loading } = this.props;

    return (
      <Container className="modules-container">
        <div className="header">
          <Link to={routes.myApp} className="close-button">
            X
          </Link>
        </div>
        <h3>Add Features</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
        <Row>
          <CategorySidebar
            className="side-bar col-xs-12 col-sm-4 col-md-4 col-lg-2 col-xl-2"
            modulesCategories={modulesCategories}
            setModuleCategory={setModuleCategory}
          />
          <div className={`${loading ? 'loader-page' : ''} col-xs-12 col-sm-8 col-md-8 col-lg-10 col-xl-10`}>
            <Row className="modules-row">
              {modules.map(module => (
                <FeatureModuleCard
                  key={module.id}
                  module={module}
                  onAddToSelectedClicked={() => onAddClick(module.id)}
                  onRemoveFromSelectedClicked={() => onRemoveClick(module.id)}
                  modal={() => this.toggle(module)}
                />
              ))}
            </Row>
          </div>
        </Row>
        <Link
          className="button-link"
          to={routes.myApp}
        >
          <Button
            className="fixed-button"
            onClick={() => addSelectedToApp(modules, toAddModules)}
          >
            Add to my App!
          </Button>
        </Link>
        <div className="white-gradient" />
      </Container>
    );
  }
}

ListModules.propTypes = {
  onAddClick: func.isRequired,
  onRemoveClick: func.isRequired,
  getModulesCategories: func.isRequired,
  setModuleCategory: func.isRequired,
  addSelectedToApp: func.isRequired,
  loadAddedModules: func.isRequired,
  loading: bool,
  modules: array.isRequired,
  toAddModules: object.isRequired,
  modulesCategories: object.isRequired
};

const mapDispatchToProps = dispatch => ({
  showSingleModule: () => dispatch(showSingleModule()),
  onAddClick: id => dispatch(addToSelected(id)),
  onRemoveClick: id => dispatch(removeFromSelected(id)),
  addSelectedToApp: (modules, ids) => dispatch(addAllToApp(modules, ids)),
  getModulesCategories: () => dispatch(getModulesCategories()),
  setModuleCategory: id => dispatch(setModuleCategory(id)),
  loadAddedModules: () => dispatch(loadAddedModules())
});

function filterModules(state) {
  const allModules = state.getIn(['module', 'modules']).toJS().filter(({ id }) => !state.getIn(['myApp', 'addedIds']).includes(id));

  const categoryFilter = state.getIn(['categoriesReducer', 'selectedCategoryId']);
  const searchInput = state.getIn(['categoriesReducer', 'searchInput']);

  const filteredModulesByCategory = filterByCategory(
    categoryFilter,
    allModules
  );
  const filteredModules = filterBySearchInput(
    searchInput,
    filteredModulesByCategory
  );

  return filteredModules;
}

const mapStateToProps = state => ({
  modules: filterModules(state),
  toAddModules: state.getIn(['myApp', 'toAddIds']),
  module: state.getIn(['module', 'module']),
  loading: state.getIn(['module', 'loading']),
  modulesCategories: state.getIn(['categoriesReducer', 'modulesCategories']).toJS()
});

export default connect(mapStateToProps, mapDispatchToProps)(ListModules);
