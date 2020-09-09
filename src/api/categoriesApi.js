import api from './apiService';

class ModulesCategories {
  static getModulesCategories() {
    return api.get('/modules_categories');
  }
}

export default ModulesCategories;
