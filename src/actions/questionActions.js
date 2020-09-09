import questionApi from '../api/questionApi';
import * as types from './actionTypes';

export const fetchQuestion = () => ({
  type: types.FETCH_SHOW_QUESTION,
});

export const fetchQuestionSuccess = questions => ({
  type: types.FETCH_SHOW_QUESTION_SUCCESS,
  questions
});

export const showQuestion = () => (
  (dispatch) => {
    dispatch(fetchQuestion());
    questionApi.getQuestions()
      .then(({ questions }) => {
        dispatch(fetchQuestionSuccess(questions));
      });
  }
);

