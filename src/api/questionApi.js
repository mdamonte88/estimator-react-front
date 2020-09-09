import api from './apiService';

class Question {
  static getQuestions() {
    return api.get('/questions');
  }
}

export default Question;
