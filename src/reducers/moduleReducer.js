import { fromJS, Map, List } from 'immutable';
import * as types from '../actions/actionTypes';

const initialState = Map({
  modules: List([]),
  suggestedModules: List([]),
  module: Map({}),
  loading: false
});

const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SHOW_MODULES_SUCCESS: {
      const newState = state.set('modules', fromJS(action.featureModules));
      return newState.set('loading', false);
    }
    case types.SAVE_SUGGESTED_MODULES_SUCCESS: {
      const newState = state.set('suggestedModules', fromJS(action.suggestedFeatureModules));
      return newState.set('loading', false);
    }
    case types.FETCH_SHOW_SINGLE_MODULE_SUCCESS: {
      const newState = state.set('module', fromJS(action.featureModule));
      return newState.set('loading', false);
    }
    case types.FETCH_SHOW_MODULES: {
      return state.set('loading', true);
    }
    case types.FETCH_SHOW_SINGLE_MODULE: {
      return state.set('loading', true);
    }
    default:
      return state;
  }
};

export const getModule = (state, id) => state.get('modules').toJS().find(mod => mod.id === id);

export default moduleReducer;
