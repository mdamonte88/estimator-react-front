import api from './apiService';

class VariationsModule {
  static getModuleVariations(id) {
    return api.get(`/feature_modules/${id}/module_variations`);
  }
  static getUserStoriesForVariationsId(variationId, moduleId) {
    return api.get(`/feature_modules/${moduleId}/user_stories?module_variation_id=${variationId}`);
  }
}

export default VariationsModule;
