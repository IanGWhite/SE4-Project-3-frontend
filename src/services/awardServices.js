import apiClient from "./services.js";

export default {
  getAllAwards(tutorialId) {
    return apiClient.get(`/tutorials/${tutorialId}/awards`);
  },
  getAwards(tutorialId, id) {
    return apiClient.get(`/tutorials/${tutorialId}/awards/${id}`);
  },
  createAward(tutorialId, data) {
    return apiClient.post(`/tutorials/${tutorialId}/awards`, data);
  },
  updateAward(tutorialId, id, data) {
    return apiClient.put(`/tutorials/${tutorialId}/awards/${id}`, data);
  },
  deleteAward(tutorialId, id) {
    return apiClient.delete(`/tutorials/${tutorialId}/awards/${id}`);
  },
};
