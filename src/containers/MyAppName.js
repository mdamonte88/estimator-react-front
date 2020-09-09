import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, string, func, object } from 'prop-types';
import routes from '../constants/routesPaths';
import { addAppName, addSuggestedFeatures } from '../actions/appActions';
import ProgressBar from '../components/common/ProgressBar';
import NavBackClose from '../components/common/NavBackClose';
import OpenQuestion from '../components/questions/OpenQuestion';
import { PROGRESS_APP_PERCENTAGES as progress } from '../constants/constants';

const MyAppName = ({
  appName,
  questions,
  addAppName,
  allAnswersSelected,
  addSuggestedFeatures
}) => (
  <div className="container">
    <ProgressBar progress={progress.three} />
    <div className="px-12">
      <NavBackClose
        linkGoBack={routes.questions}
        linkClose={routes.listModules}
      />
    </div>
    <OpenQuestion
      title="Name your awesome App"
      subTitle="Please choose the name of your new application!"
      inputInitialValue={appName}
      inputPlaceholder="Type Something..."
      buttonText="Continue"
      buttonLink={routes.myApp}
      handleSubmit={(inputValue) => {
        addSuggestedFeatures(questions, allAnswersSelected);
        addAppName(inputValue);
      }}
      footerText="I don't know yet"
      footerLink={routes.myApp}
    />
  </div>
);

MyAppName.propTypes = {
  appName: string.isRequired,
  questions: arrayOf(object),
  allAnswersSelected: object,
  addAppName: func.isRequired,
  addSuggestedFeatures: func.isRequired,
};

const mapStateToProps = state => ({
  appName: state.getIn(['myApp', 'name']),
  questions: state.getIn(['question', 'questions']).toJS(),
  allAnswersSelected: state.getIn(['answer', 'selectedAnswers']).toJS()
});

const mapDispatchToProps = dispatch => ({
  addAppName: name => dispatch(addAppName(name)),
  addSuggestedFeatures: (questions, allAnswersSelected) =>
    dispatch(addSuggestedFeatures(questions, allAnswersSelected))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAppName);
