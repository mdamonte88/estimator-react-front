import { fromJS, Map } from 'immutable';
import { ADD_ANSWER_TO_SELECTED,
  REMOVE_ANSWER_FROM_SELECTED,
  REMOVE_SELECTED_ANSWERS,
  REMOVE_ANSWERS,
  RECOVER_BUILD_SAVED
} from '../actions/actionTypes';

const initialState = fromJS({
  selectedAnswers: Map({})
});

const answerReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECOVER_BUILD_SAVED: {
      return state.set('selectedAnswers', Map(fromJS(action.answers)));
    }
    case ADD_ANSWER_TO_SELECTED: {
      const selAnswers = state.get('selectedAnswers');
      let answers = selAnswers.get(action.questionId);
      if (answers) {
        answers = answers.concat(action.answer);
      } else {
        answers = [action.answer];
      }
      return state.setIn(['selectedAnswers', action.questionId], answers);
    }
    case REMOVE_ANSWER_FROM_SELECTED: {
      const answersFiltered = state.getIn(['selectedAnswers', action.questionId]).filter(ans => ans !== action.answer);
      return state.setIn(['selectedAnswers', action.questionId], answersFiltered);
    }
    case REMOVE_SELECTED_ANSWERS: {
      return state.set('selectedAnswers', Map({}));
    }
    case REMOVE_ANSWERS: {
      return state.setIn(['selectedAnswers', action.questionId], []);
    }
    default:
      return state;
  }
};

export default answerReducer;
