import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, func, bool } from 'prop-types';
import { Container, Row, Col, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import NextStepButton from '../components/common/NextStepButton';
import routes from '../constants/routesPaths';
import { showQuestion } from '../actions/questionActions';
import { addAnswerToSelected, removeAnswerFromSelected, removeAnswers } from '../actions/answerActions';
import AnswerBox from '../components/answers/answerBox';
import NavBackCloseOnClick from '../components/common/NavBackCloseOnClick';
import ProgressBar from '../components/common/ProgressBar';
import '../styles/styles.scss';
import { DEFAULT_IMAGE_URL } from '../constants/constants';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionOrder: 0,
      search: ''
    };
    this.newQuestion = this.newQuestion.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);
    this.deleteAnswers = this.deleteAnswers.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.showQuestion();
  }

  newQuestion() {
    const { questionOrder } = this.state;
    this.setState({ questionOrder: questionOrder + 1 });
  }

  prevQuestion() {
    const { questionOrder } = this.state;
    this.setState({ questionOrder: questionOrder - 1 });
  }

  deleteAnswers() {
    const { removeAnswers, questions } = this.props;
    const { questionOrder } = this.state;
    const { id } = questions[questionOrder];
    removeAnswers(id);
    this.newQuestion();
  }

  handleInputChange(event) {
    this.setState({ search: event.target.value });
  }

  showAnswersContainer(questionId, answers, search) {
    const { addAnswerToSelected, removeAnswerFromSelected } = this.props;

    return (
      <div className="answers-container">
        {Object.keys(answers).map((answerId) => {
          const {
            id,
            name,
            description,
            image,
            hover,
            order
          } = answers[answerId];
          if (name.toUpperCase().includes(search.toUpperCase())) {
            return (
              <AnswerBox
                key={id}
                question={questionId}
                order={order}
                answer={name}
                description={description}
                addAnswer={() => addAnswerToSelected(id, questionId)}
                removeAnswer={() => removeAnswerFromSelected(id, questionId)}
                image={image || DEFAULT_IMAGE_URL}
                hover={hover}
              />
            );
          }
        })}
      </div>
    );
  }
  render() {
    const { questions, loading } = this.props;
    const { questionOrder, search } = this.state;
    if (!loading) {
      const questionsQuantity = questions.length;
      if (!questionsQuantity || questionOrder == questionsQuantity) {
        return <Redirect to={routes.myAppName} />;
      }
      if (questionOrder < 0) {
        return <Redirect to={routes.index} />;
      }
      const { name, answers, description, id } = questions[questionOrder];
      const progress = Math.trunc(((questionOrder + 1) /
        (questionsQuantity + 1)) * 100);
      return (
        <Container>
          <ProgressBar progress={progress} />
          <div className="px-12">
            <NavBackCloseOnClick
              linkGoBack={this.prevQuestion}
              linkClose={this.deleteAnswers}
            />
            <div className="question-container">
              <Row>
                <Col xs={12} md={12}>
                  <h1 className="question-title">
                    {name}
                  </h1>
                  <h2 className="question-description">
                    {description}
                  </h2>
                  <div className="search-app-kind">
                    { answers.length > 4 &&
                      <Input
                        className="search-app-kind-input"
                        onChange={this.handleInputChange}
                        type="string"
                        name="budget"
                        id="budget"
                        placeholder="Search..."
                      />
                    }

                  </div>
                  {this.showAnswersContainer(id, answers, search)}
                  <div className={questionOrder == questionsQuantity - 1 ? 'show button-link' : 'hidden'} >
                    <Link to={routes.myAppName}>
                      <NextStepButton label="Next" onClick={this.newQuestion} />
                    </Link>
                  </div>
                  <div className={questionOrder < questionsQuantity - 1 ? 'show button-link' : 'hidden'} >
                    <NextStepButton label="Next" onClick={this.newQuestion} />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      );
    }
    return (
      <div className={`${loading ? 'loader-page' : ''}`} />
    );
  }
}

Questions.propTypes = {
  loading: bool.isRequired,
  questions: array.isRequired,
  showQuestion: func.isRequired,
  addAnswerToSelected: func.isRequired,
  removeAnswerFromSelected: func.isRequired,
  removeAnswers: func.isRequired
};

const mapDispatchToProps = dispatch => ({
  showQuestion: () => dispatch(showQuestion()),
  addAnswerToSelected: (answerId, questionId) =>
    dispatch(addAnswerToSelected(answerId, questionId)),
  removeAnswerFromSelected: (answerId, questionId) =>
    dispatch(removeAnswerFromSelected(answerId, questionId)),
  removeAnswers: questionId => dispatch(removeAnswers(questionId))
});

const mapStateToProps = state => ({
  loading: state.getIn(['question', 'loading']),
  questions: state.getIn(['question', 'questions']).toJS()
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
