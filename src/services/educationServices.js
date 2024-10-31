import apiClient from "./services.js";

export default {
  getAllEducations(tutorialId) {
    return apiClient.get(`/tutorials/${tutorialId}/educations`);
  },
  getEducations(tutorialId, id) {
    return apiClient.get(`/tutorials/${tutorialId}/educations/${id}`);
  },
  createEducation(tutorialId, data) {
    return apiClient.post(`/tutorials/${tutorialId}/educations`, data);
  },
  updateEducation(tutorialId, id, data) {
    return apiClient.put(`/tutorials/${tutorialId}/educations/${id}`, data);
  },
  deleteEducation(tutorialId, id) {
    return apiClient.delete(`/tutorials/${tutorialId}/educations/${id}`);
  },
};