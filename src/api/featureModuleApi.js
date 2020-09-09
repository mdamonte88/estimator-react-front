import api from './apiService';

class FeatureModule {
  static getModules() {
    return api.get('/feature_modules');
  }
  static getModule(id) {
    return api.get(`/feature_modules/${id}`);
  }
  static addComment(moduleId, content) {
    return api.post(`/feature_modules/${moduleId}/comments`, { comment: { content } });
  }
}

export default FeatureModule;
