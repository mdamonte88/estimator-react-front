import api from './apiService';

class UserStory {
  static getUserStories(idModule) {
    return api.get(`/feature_modules/${idModule}/user_stories`);
  }
}

export default UserStory;
