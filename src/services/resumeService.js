import apiClient from "./services.js";

export default {
  getAllResumes(tutorialId) {
    return apiClient.get(`/tutorials/${tutorialId}/resumes`);
  },
  getResumes(tutorialId, id) {
    return apiClient.get(`/tutorials/${tutorialId}/resumes/${id}`);
  },
  createResume(tutorialId, data) {
    return apiClient.post(`/tutorials/${tutorialId}/resumes`, data);
  },
  updateResume(tutorialId, id, data) {
    return apiClient.put(`/tutorials/${tutorialId}/resumes/${id}`, data);
  },
  deleteResume(tutorialId, id) {
    return apiClient.delete(`/tutorials/${tutorialId}/resumes/${id}`);
  },
};