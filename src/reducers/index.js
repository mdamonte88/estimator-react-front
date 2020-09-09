import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import { sessionImmutableReducer as session } from 'redux-react-session';
import module, * as fromModules from './moduleReducer';
import myApp from './appReducer';
import userStories from './userStoryReducer';
import categoriesReducer from './categoriesReducer';

import router from './routerReducer';
import landing from './landingReducer';
import moduleVariations from './moduleVariationsReducer';
import question from './questionReducer';
import answer from './answerReducer';

const rootReducer = combineReducers({
  form,
  session,
  router,
  module,
  userStories,
  myApp,
  landing,
  moduleVariations,
  categoriesReducer,
  question,
  answer
});

export const getModule = (state, id) => fromModules.getModule(state.get('module'), id);

export const getAppModules = (state) => {
  const modules = [];
  state.getIn(['myApp', 'addedIds']).forEach((id) => {
    const module = getModule(state, id);
    module && modules.push(module);
  });
  return modules;
};

export default rootReducer;
