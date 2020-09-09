import React from 'react';
import { connect } from 'react-redux';
import { string, array } from 'prop-types';
import { Row, Col } from 'reactstrap';
import { getModule } from '../reducers';
import UserStoriesForCategory from '../components/userStories/UserStoriesForCategory';
import Header from '../components/common/Header';
import Title from '../components/common/Title';
import { getDecorationColor } from '../utils/helpers';
import { DEFAULT_APP_NAME } from '../constants/constants';

const BacklogPage = ({ appName, addedModules }) => {
  const addedModulesGroupByCategory = addedModules.reduce((acc, module) => {
    (acc[module.moduleCategories[0].name] = acc[module.moduleCategories[0].name]
      || []).push(module);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-blue-green">
      <Header menuActive={{ backlog: true }} />
      <div className="container">
        <Row className="main-row">
          <Col xs={10} >
            <Row>
              <Col xs={12} >
                <Title title={appName || DEFAULT_APP_NAME} />
              </Col>
              <Col xs={12} >
                {Object.keys(addedModulesGroupByCategory)
                  .map((categoryName, index) =>
                    (
                      <UserStoriesForCategory
                        key={addedModulesGroupByCategory[categoryName][0].id}
                        categoryName={categoryName}
                        modules={addedModulesGroupByCategory[categoryName]}
                        decorationColor={getDecorationColor(index)}
                      />
                    ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

BacklogPage.propTypes = {
  addedModules: array.isRequired,
  appName: string,
};

const mapStateToProps = state => ({
  addedModules: state.getIn(['myApp', 'addedIds']).toJS().map(moduleId => getModule(state, moduleId)),
  appName: state.getIn(['myApp', 'name']),
});

export default connect(mapStateToProps, null)(BacklogPage);
