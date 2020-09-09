import { fromJS, Map } from 'immutable';
import { FETCH_VARIATIONS_MODULE_ID_SUCCESS,
  FETCH_VARIATIONS_MODULE_ID,
  FETCH_USER_STORIES_VARIATIONS_ID_SUCCESS,
  FETCH_USER_STORIES_VARIATIONS_ID,
  CLEAN_BACKLOG_VARIATION } from '../actions/actionTypes';

const initialState = Map({
  moduleVariations: Map({}),
  loading: false,
  loadingUser: false,
  selectedModuleVariationsByModuleId: {},
  selectedModuleVariationId: undefined,
  userStoriesForModuleVariationsId: Map({})
});

const moduleVariationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VARIATIONS_MODULE_ID_SUCCESS: {
      const newState = state.set('moduleVariations', fromJS({
        ...action.moduleVariations.reduce((obj, modVar) => {
          obj[modVar.id] = modVar;
          return obj;
        }, state.get('moduleVariations').toJS())
      }));
      return newState.set('loading', false);
    }
    case FETCH_VARIATIONS_MODULE_ID: {
      return state.set('loading', true);
    }
    case FETCH_USER_STORIES_VARIATIONS_ID: {
      return state.set('loadingUser', true);
    }
    case CLEAN_BACKLOG_VARIATION: {
      return state.set('userStoriesForModuleVariationsId', Map({}));
    }
    case FETCH_USER_STORIES_VARIATIONS_ID_SUCCESS: {
      const newStateUserStoriesForModuleVariationId = state.set('userStoriesForModuleVariationsId', fromJS({
        ...action.userStoriesVariations.reduce((obj, UserVar) => {
          obj[UserVar.id] = UserVar;
          return obj;
        }, {})
      }));
      const newStateselectedModuleVariationsByModuleId =
        fromJS(newStateUserStoriesForModuleVariationId.get('selectedModuleVariationsByModuleId')).set(action.moduleId, action.variationId);
      return newStateUserStoriesForModuleVariationId.set('selectedModuleVariationId', action.variationId)
        .set('selectedModuleVariationsByModuleId', newStateselectedModuleVariationsByModuleId)
        .set('loadingUser', false);
    }
    default:
      return state;
  }
};

export default moduleVariationsReducer;
