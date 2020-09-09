import modulesCategoriesApi from '../api/categoriesApi';
import * as types from './actionTypes';

export const fetchModulesCategories = () => ({
  type: types.FETCH_MODULES_CATEGORIES
});

export const fetchModulesCategoriesSuccess = modulesCategories => ({
  type: types.FETCH_MODULES_CATEGORIES_SUCCESS,
  modulesCategories
});

export const getModulesCategories = () => (
  (dispatch) => {
    dispatch(fetchModulesCategories());
    modulesCategoriesApi.getModulesCategories()
      .then(({ modulesCategories }) => {
        dispatch(fetchModulesCategoriesSuccess(modulesCategories));
      });
  }
);

export const setModuleCategory = selectedId => ({
  type: types.SET_MODULE_CATEGORY,
  selectedId
});

export const setSearchInput = searchInput => ({
  type: types.SET_SEARCH_INPUT,
  searchInput
});
