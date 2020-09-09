import { fromJS, List } from 'immutable';
import * as types from '../actions/actionTypes';

const initialState = fromJS({
  addedIds: List([]),
  toAddIds: List([]),
  name: '',
  email: '',
  color: '#ffffff',
  variations: List([]),
  userStories: List([]),
  message: ''
});

export const getNewUserStories = (listUserFromVariationId, userStories) => {
  let ret = userStories;
  listUserFromVariationId.forEach((num) => {
    ret = ret.filter(id => id !== num);
  });
  return ret;
};

const appReducer = (
  state = initialState,
  { colorHex, email, message, moduleId,
    moduleIds, name, type, userStoryId,
    userStories, userStoriesFromVariationId,
    variationIds, featuresModules, variations
  }
) => {
  switch (type) {
    case types.ENTER_EMAIL_SUCCESS: {
      return state.set('email', email);
    }
    case types.SEND_MAIL_CONTACT_US_SUCCESS: {
      return state.set('contact_us_success', message);
    }
    case types.RECOVER_BUILD_SAVED: {
      const newState = state.set('name', name)
        .set('addedIds', fromJS(featuresModules))
        .set('variations', fromJS(variations));
      return newState.set('userStories', List(userStories));
    }
    case types.ADD_NAME_TO_APP:
      return state.set('name', name);
    case types.SELECT_MODULE_TO_ADD:
      if (state.get('toAddIds').indexOf(moduleId) !== -1) {
        return state;
      }
      return state.set('toAddIds', state.get('toAddIds').push(moduleId));
    case types.DESELECT_MODULE_TO_ADD:
      if (state.get('toAddIds').indexOf(moduleId) === -1) {
        return state;
      }
      return state.set('toAddIds', state.get('toAddIds').filter(id => id !== moduleId));
    case types.ADD_SELECTED_MODULES_TO_APP: {
      const newState = state.set('userStories', initialState.get('userStories'))
        .set('variations', fromJS(variationIds));
      return newState.set('addedIds', fromJS(moduleIds));
    }
    case types.REMOVE_MODULE_FROM_APP:
      if (state.get('addedIds').indexOf(moduleId) !== -1) {
        return state.set('addedIds', state.get('addedIds').filter(id => id !== moduleId));
      }
      return state;
    case types.LOAD_ADDED_MODULES:
      return state.set('toAddIds', state.get('addedIds'));
    case types.LOAD_ADDED_VARIATIONS:
      if (!state.get('variations').includes(variationIds)) {
        const newState = state.set('userStories', state.get('userStories').concat(userStoriesFromVariationId));
        return newState.set('variations', state.get('variations').push(variationIds));
      }
      return state;
    case types.REMOVE_VARIATIONS:
      if (state.get('variations').indexOf(variationIds) != -1) {
        const newState = state.set('userStories', getNewUserStories(userStoriesFromVariationId, state.get('userStories')));
        return newState.set('variations', state.get('variations').filter(id => id !== variationIds));
      }
      return state;
    case types.FLUSH_ADDED_MODULES:
      return state.set('toAddIds', initialState.get('toAddIds'));
    case types.CHANGE_COLOR:
      return state.set('color', colorHex);
    case types.ADD_USER_STORIES: {
      const userStories = state.get('userStories');
      const addedUserStories = userStories
        .map(userStory => (userStory.id));

      return state.set('userStories', userStories.concat(addedUserStories));
    }
    case types.REMOVE_USER_STORY: {
      if (state.get('userStories').indexOf(userStoryId) != -1) {
        return state.set('userStories', state.get('userStories').filter(id => id !== userStoryId));
      }
      return state;
    }
    default:
      return state;
  }
};

export default appReducer;
