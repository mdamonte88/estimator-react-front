import api from './apiService';

class MyApp {
  static persistLocalStore(email, name, userStoryIds, answerIds, variations) {
    return api.post('/user_apps/', { app: { email, name, userStoryIds, answerIds, variations } });
  }
}

export default MyApp;
