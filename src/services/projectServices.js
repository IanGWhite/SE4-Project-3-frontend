import apiClient from "./services.js";

export default {
  getAllProjects(tutorialId) {
    return apiClient.get(`/tutorials/${tutorialId}/projects`);
  },
  getProjects(tutorialId, id) {
    return apiClient.get(`/tutorials/${tutorialId}/projects/${id}`);
  },
  createProject(tutorialId, data) {
    return apiClient.post(`/tutorials/${tutorialId}/projects`, data);
  },
  updateProject(tutorialId, id, data) {
    return apiClient.put(`/tutorials/${tutorialId}/projects/${id}`, data);
  },
  deleteProject(tutorialId, id) {
    return apiClient.delete(`/tutorials/${tutorialId}/projects/${id}`);
  },
};