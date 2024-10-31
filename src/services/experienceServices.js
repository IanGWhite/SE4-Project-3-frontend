import apiClient from "./services.js";

export default {
  getAllExperiences(tutorialId) {
    return apiClient.get(`/tutorials/${tutorialId}/experiences`);
  },
  getExperiences(tutorialId, id) {
    return apiClient.get(`/tutorials/${tutorialId}/experiences/${id}`);
  },
  createExperience(tutorialId, data) {
    return apiClient.post(`/tutorials/${tutorialId}/experiences`, data);
  },
  updateExperience(tutorialId, id, data) {
    return apiClient.put(`/tutorials/${tutorialId}/experiences/${id}`, data);
  },
  deleteExperience(tutorialId, id) {
    return apiClient.delete(`/tutorials/${tutorialId}/experiences/${id}`);
  },
};