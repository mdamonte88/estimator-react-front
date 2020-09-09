import * as types from './actionTypes';
import sessionApi from '../api/sessionApi';
import myAppApi from '../api/myAppApi';
import { showUserStories } from './userStoryActions';
import contactUsApi from '../api/contactUsApi';

export const addToSelectedUnsafe = moduleId => ({
  type: types.SELECT_MODULE_TO_ADD,
  moduleId
});

export const removeFromSelectedUnsafe = moduleId => ({
  type: types.DESELECT_MODULE_TO_ADD,
  moduleId
});

export const loadAddedModulesUnsafe = () => ({
  type: types.LOAD_ADDED_MODULES
});

export const addAllToAppUnsafe = (moduleIds, variationIds = [], searchInput = '') => ({
  type: types.ADD_SELECTED_MODULES_TO_APP,
  moduleIds,
  variationIds,
  searchInput
});

export const removeFromAppUnsafe = moduleId => ({
  type: types.REMOVE_MODULE_FROM_APP,
  moduleId
});

export const addToSelected = moduleId => (dispatch) => {
  dispatch(addToSelectedUnsafe(moduleId));
};

export const removeFromSelected = moduleId => (dispatch) => {
  dispatch(removeFromSelectedUnsafe(moduleId));
};

export const loadAddedModules = () => (dispatch) => {
  dispatch(loadAddedModulesUnsafe());
};

export const flushAddedModules = () => ({
  type: types.FLUSH_ADDED_MODULES
});

export const addAllToApp = (modules, ids) => (dispatch) => {
  const defaultVariationIds = modules.filter(({ id }) => ids.includes(id))
    .map(({ defaultVariation = {} }) => defaultVariation.id);
  dispatch(addAllToAppUnsafe(ids, defaultVariationIds));
  dispatch(flushAddedModules());
  dispatch(showUserStories(ids));
};

export const removeUserStory = userStoryId =>
  ({
    type: types.REMOVE_USER_STORY,
    userStoryId
  });


export const removeVariationIdFromMyApp =
(
  variationIds,
  userStoriesFromVariationId
) =>
  ({
    type: types.REMOVE_VARIATIONS,
    variationIds,
    userStoriesFromVariationId
  });


export const removeFromApp = (
  featureModule,
  userStories,
  variations
) => (dispatch) => {
  dispatch(removeFromAppUnsafe(featureModule.id));

    Object.keys(userStories).map((userStoryId) => {
      const { id, featureModuleId } = userStories[userStoryId];
      if (featureModuleId === featureModule.id) {
        dispatch(removeUserStory(id));
      }
    });

    Object.keys(variations).map((variationId) => {
      const { id, featureModuleId, userStories } = variations[variationId];
      if (featureModuleId === featureModule.id) {
        dispatch(removeVariationIdFromMyApp(id, userStories));
      }
    });
  };

export const addAppName = name => ({
  type: types.ADD_NAME_TO_APP,
  name
});

export const addSuggestedFeaturesSuccess = suggestedFeatureModules => ({
  type: types.SAVE_SUGGESTED_MODULES_SUCCESS,
  suggestedFeatureModules
});

export const addSuggestedFeatures = (questions = [], allAnswersSelected = {}) =>
  (
    (dispatch) => {
      const suggestedFeatures = [];
      questions.forEach((q) => {
        const currentAnwsersIdsSelected = allAnswersSelected[q.id] || [];
        const answersFiltered = (currentAnwsersIdsSelected.length && q.answers
          .filter(qa => currentAnwsersIdsSelected.includes(qa.id))) || [];

        answersFiltered.forEach(({ featureModules }) =>
          featureModules.forEach((f) => {
            const found = suggestedFeatures
              .find(element => element.id === f.id);

            if (!found) {
              f.isSuggested = true;
              suggestedFeatures.push(f);
            }
          }));
      });
      const modulesIds = suggestedFeatures.map(({ id }) => id);
      dispatch(addAllToAppUnsafe(modulesIds));
      dispatch(addSuggestedFeaturesSuccess(suggestedFeatures));
    }
  );

export const postEnterEmail = () => ({
  type: types.POST_ENTER_EMAIL
});

export const enterEmailSuccess = email => ({
  type: types.ENTER_EMAIL_SUCCESS,
  email
});

export const enterEmailComunication = email => (
  (dispatch) => {
    dispatch(postEnterEmail());
    sessionApi.signUp({ user: { email, password: 'adminEmail' } })
      .then(({ user }) => {
        dispatch(enterEmailSuccess(user.email));
      });
  }
);

export const exportLocalStoreTry = () => ({
  type: types.SAVE_LOCAL_STORE_TRY
});

export const exportLocalStoreSuccess = () => ({
  type: types.SAVE_LOCAL_STORE_SUCCESS
});

export const saveLocalStore = state => (dispatch) => {
  const { myApp: {
    email,
    name,
    userStories,
    addedIds,
    variations
  }, answer: { selectedAnswers } } = state;
  const variationsFormated = [];
  const addedAnswersIds = [].concat(...Object.values(selectedAnswers));

  addedIds.forEach((id, index) => variationsFormated.push({
    featureModuleId: id,
    moduleVariationId: variations[index]
  }));

  dispatch(exportLocalStoreTry());
  myAppApi
    .persistLocalStore(
      email,
      name,
      userStories,
      addedAnswersIds,
      variationsFormated
    )
    .then(() => {
      dispatch(exportLocalStoreSuccess());
    });
};

export const addToVariationsSelected = (
  variationIds,
  userStoriesFromVariationId
) =>
  ({
    type: types.LOAD_ADDED_VARIATIONS,
    variationIds,
    userStoriesFromVariationId
  });

export const addUserStories = userStories => ({
  type: types.ADD_USER_STORIES,
  userStories
});

export const sendContactUsSucces = message => ({
  type: types.SEND_MAIL_CONTACT_US_SUCCESS,
  message
});

export const contactUs = (name, email, message) => (
  (dispatch) => {
    contactUsApi.send({ user: { name, email }, message })
      .then(() => {
        dispatch(sendContactUsSucces('Se ha envieado el email'));
      });
  }
);
