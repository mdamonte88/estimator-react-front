import moduleVariationsApi from '../api/moduleVariationsApi';
import {
  FETCH_VARIATIONS_MODULE_ID_SUCCESS,
  FETCH_VARIATIONS_MODULE_ID,
  FETCH_USER_STORIES_VARIATIONS_ID,
  FETCH_USER_STORIES_VARIATIONS_ID_SUCCESS,
  CLEAN_BACKLOG_VARIATION
} from './actionTypes';

export const fetchModuleVariations = () => ({
  type: FETCH_VARIATIONS_MODULE_ID
});

export const fetchUserStoriesForVariations = () => ({
  type: FETCH_USER_STORIES_VARIATIONS_ID
});

export const fetchUserStoriesForVariationsSuccess = (
  userStoriesVariations,
  variationId,
  moduleId
) =>
  ({
    type: FETCH_USER_STORIES_VARIATIONS_ID_SUCCESS,
    variationId,
    moduleId,
    userStoriesVariations
  });

export const fetchModuleVariationsSuccess = moduleVariations => ({
  type: FETCH_VARIATIONS_MODULE_ID_SUCCESS,
  moduleVariations
});

export const moduleVariations = id => (
  (dispatch) => {
    dispatch(fetchModuleVariations());
    moduleVariationsApi.getModuleVariations(id)
      .then(({ moduleVariations }) => {
        dispatch(fetchModuleVariationsSuccess(moduleVariations));
      });
  }
);

export const selectModuleVariation = (variationId, moduleId) => (
  (dispatch) => {
    dispatch(fetchUserStoriesForVariations());
    moduleVariationsApi.getUserStoriesForVariationsId(variationId, moduleId)
      .then(({ userStories }) => {
        dispatch(fetchUserStoriesForVariationsSuccess(
          userStories,
          variationId,
          moduleId
        ));
      });
  }
);

export const cleanBacklogVariation = () => ({
  type: CLEAN_BACKLOG_VARIATION
});
