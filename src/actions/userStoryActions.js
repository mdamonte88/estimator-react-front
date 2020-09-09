import userStoryApi from '../api/userStoryApi';
import * as types from './actionTypes';
import { addUserStories } from './appActions';

export const fetchUserStories = () => ({
  type: types.FETCH_USER_STORIES
});

export const fetchUserStoriesSuccess = (userStories, featureModuleId) => ({
  type: types.FETCH_USER_STORIES_SUCCESS,
  userStories,
  featureModuleId
});

export const showUserStories = featureModuleIds => (
  (dispatch) => {
    dispatch(fetchUserStories());
    featureModuleIds.map((featureModuleId) => {
      userStoryApi.getUserStories(featureModuleId)
        .then(({ userStories }) => {
          dispatch(fetchUserStoriesSuccess(userStories, featureModuleId));
          dispatch(addUserStories(userStories));
        });
    });
  }
);

export const removeUserStories = featureModuleId => ({
  type: types.REMOVE_USER_STORIES,
  featureModuleId
});
