import { fromJS, List, Map } from 'immutable';
import { FETCH_SHOW_QUESTION, FETCH_SHOW_QUESTION_SUCCESS } from '../actions/actionTypes';

const initialState = Map({
  loading: true,
  questions: List()
});

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHOW_QUESTION: {
      return state.set('loading', true);
    }
    case FETCH_SHOW_QUESTION_SUCCESS: {
      const newState = state.set('loading', false);
      return newState.set('questions', fromJS(action.questions));
    }
    default:
      return state;
  }
};

export default questionReducer;
