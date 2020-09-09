import { SubmissionError } from 'redux-form/immutable';
import { sessionService } from 'redux-react-session';
import sessionApi from '../api/sessionApi';
import { RECOVER_BUILD_SAVED } from './actionTypes';

export const recoverBuildSaved = (
  name,
  answers,
  featuresModules,
  userStories,
  variations
) => ({
  type: RECOVER_BUILD_SAVED,
  name,
  answers,
  featuresModules,
  userStories,
  variations
});

export const recoverLastBuildSaved = (
  name,
  answers,
  featuresModules,
  userStories,
  variations
) => (
  (dispatch) => {
    dispatch(recoverBuildSaved(name, answers, featuresModules, userStories, variations));
  }
);

export const login = user =>
  dispatch =>
    sessionApi.login({ user }).then(({ user: { userApp, ...user } }) => {
      sessionService.saveUser(user);
      const { name, answers, selectedVariations = [], userStories } = userApp;
      const answersSorted = answers.sort((a, b) =>
        ((a.questionId > b.questionId) || (a.questionId === b.questionId) ?
          0 : -1));
      const answersSelected = answersSorted
        .reduce((acc, val) => {
          acc[val.questionId] = acc[val.questionId] || [];
          acc[val.questionId].push(val.id);
          return acc;
        }, Object.create(null));
      const featuresModulesids = [...new Set(selectedVariations
        .map(({ featureModule }) => featureModule.id))];
      const variationsIds = [...new Set(selectedVariations
        .map(({ selectedVariationId }) => selectedVariationId))];

      dispatch(recoverLastBuildSaved(
        name,
        answersSelected,
        featuresModulesids,
        userStories,
        variationsIds
      ));
    }).catch((err) => {
      throw new SubmissionError({
        _error: err.error
      });
    });

export const logout = () =>
  () =>
    sessionApi.logout().then(() => {
      sessionService.deleteSession();
      sessionService.deleteUser();
    }).catch((err) => {
      throw (err);
    });
