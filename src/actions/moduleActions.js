import { reset } from 'redux-form';
import featureModuleApi from '../api/featureModuleApi';
import * as types from './actionTypes';
import { COMMENT_FORM_NAME } from '../constants/constants';

export const fetchModules = () => ({
  type: types.FETCH_SHOW_MODULES
});

export const fetchModulesSuccess = featureModules => ({
  type: types.FETCH_SHOW_MODULES_SUCCESS,
  featureModules
});

export const fetchSingleModule = () => ({
  type: types.FETCH_SHOW_SINGLE_MODULE
});

export const fetchSingleModuleSuccess = featureModule => ({
  type: types.FETCH_SHOW_SINGLE_MODULE_SUCCESS,
  featureModule
});

export const showSingleModule = id => (
  (dispatch) => {
    dispatch(fetchSingleModule());
    featureModuleApi.getModule(id)
      .then(({ featureModule }) => {
        dispatch(fetchSingleModuleSuccess(featureModule));
      });
  }
);

export const showModules = () => (
  (dispatch) => {
    dispatch(fetchModules());
    featureModuleApi.getModules().then(({ featureModules }) => {
      dispatch(fetchModulesSuccess(featureModules));
    });
  }
);

export const addCommentTry = () => ({
  type: types.ADD_COMMENT_TO_MODULE_TRY
});

export const addCommentSuccess = featureModule => ({
  type: types.ADD_COMMENT_TO_MODULE_SUCCESS,
  featureModule
});

export const addCommentToModule = (immutableCommentData, dispatch) => {
  const commentData = immutableCommentData.toJS();
  dispatch(addCommentTry());
  featureModuleApi.addComment(commentData.moduleId, commentData.comment)
    .then(({ comment }) => {
      dispatch(addCommentSuccess(comment));
      dispatch(reset(`${COMMENT_FORM_NAME}${commentData.moduleId}`));
    });
};
