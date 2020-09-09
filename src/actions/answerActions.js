import { ADD_ANSWER_TO_SELECTED, REMOVE_ANSWER_FROM_SELECTED, REMOVE_SELECTED_ANSWERS, REMOVE_ANSWERS } from './actionTypes';

export const addAnswerToSelected = (answer, questionId) => ({
  type: ADD_ANSWER_TO_SELECTED,
  questionId,
  answer
});

export const removeAnswerFromSelected = (answer, questionId) => ({
  type: REMOVE_ANSWER_FROM_SELECTED,
  questionId,
  answer
});

export const removeSelectedAnswers = () => ({
  type: REMOVE_SELECTED_ANSWERS
});

export const removeAnswers = questionId => ({
  type: REMOVE_ANSWERS,
  questionId
});
