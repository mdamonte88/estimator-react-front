import { fromJS, Map } from 'immutable';
import * as types from '../actions/actionTypes';

const initialState = fromJS({
  modulesCategories: Map({}),
  selectedCategoryId: 'all',
  searchInput: ''
});

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_MODULES_CATEGORIES_SUCCESS: {
      return state.set('modulesCategories', fromJS({
        ...action.modulesCategories.reduce((obj, moduleCategory) => {
          obj[moduleCategory.id] = moduleCategory;
          return obj;
        }, {})
      }));
    }
    case types.SET_MODULE_CATEGORY: {
      return state.set('selectedCategoryId', action.selectedId);
    }
    case types.SET_SEARCH_INPUT:
    case types.ADD_SELECTED_MODULES_TO_APP: {
      return state.set('searchInput', action.searchInput);
    }
    default:
      return state;
  }
};

export default categoriesReducer;
