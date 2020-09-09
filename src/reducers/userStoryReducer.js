import { fromJS } from 'immutable';
import { FETCH_USER_STORIES, FETCH_USER_STORIES_SUCCESS, REMOVE_USER_STORIES } from '../actions/actionTypes';

const initialState = fromJS({
  loading: true,
  userStories: {}
});

const userStoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_STORIES: {
      return state.set('loading', true);
    }
    case FETCH_USER_STORIES_SUCCESS: {
      const addedUserStories = action.userStories.reduce((obj, userStory) => {
        obj[userStory.id] = userStory;
        return obj;
      }, {});

      const userStories = { ...state.get('userStories').toJS(), ...addedUserStories };

      return state.set('loading', false).set('userStories', fromJS(userStories));
    }

    case REMOVE_USER_STORIES: {
      const newAddedUserStories = state.get('userStories').delete(action.featureModuleId);

      return state.set('userStories', newAddedUserStories);
    }
    default:
      return state;
  }
};

export default userStoryReducer;
