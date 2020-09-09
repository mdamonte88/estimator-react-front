import React from 'react';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import Header from '../components/common/Header';
import LabelDecoration from '../icons/LabelDecoration';
import routes from '../constants/routesPaths';
import { removeSelectedAnswers } from '../actions/answerActions';

const showQuestionAnswer = (answersAll, question) => {
  const { id, answers: currentAnwsers } = question;
  const answersSelected = answersAll[id];
  const answersFiltered = answersSelected && answersSelected.length > 0 &&
    currentAnwsers.filter(q => answersAll[id].includes(q.id));

  return (
    <div className="question-answer link-decorated active">
      {answersFiltered && answersFiltered.length > 0 ? answersFiltered.map(a => a.name).join(' | ') : 'Not answered'}
      <div className="decoration" >
        <LabelDecoration />
      </div>
    </div>
  );
};

const SetupPage = ({ questions, answers, retake }) => (
  <div className="min-h-screen bg-blue-green">
    <Header menuActive={{ setup: true }} />
    <div className="container">
      <Row className="main-row show-grid setup" >
        <Col xs={8} >
          <h3 className="setup-title">Your Setup</h3>
          <ListGroup>
            {questions.map(question =>
              <ListGroupItem key={question.id}>
                <div className="question">
                  <div className="question-title">
                    {question.name}
                  </div>
                  <div className="question-description">
                    {question.description}
                  </div>
                </div>
                { showQuestionAnswer(answers, question) }
              </ListGroupItem>)}
          </ListGroup>
          <Link to={routes.questions} onClick={retake} className="retake-link">
            Retake Questionary
          </Link>
        </Col>
      </Row>
    </div>
  </div>
);

SetupPage.propTypes = {
  questions: array.isRequired,
  answers: object.isRequired,
  retake: func.isRequired,
};

const mapStateToProps = state => ({
  questions: state.getIn(['question', 'questions']).toJS(),
  answers: state.getIn(['answer', 'selectedAnswers']).toJS()
});

const mapDispatch = dispatch => ({
  retake: () => dispatch(removeSelectedAnswers())
});

export default connect(mapStateToProps, mapDispatch)(SetupPage);
