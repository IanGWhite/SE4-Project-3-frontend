import apiClient from "./services.js";

export default {
  getAllResumes(studentId) {
    return apiClient.get(`/tutorials/${studentId}/resumes`);
  },
  getResumes(studentId, id) {
    return apiClient.get(`/tutorials/${studentId}/resumes/${id}`);
  },
  createResume(studentId, data) {
    return apiClient.post(`/tutorials/${studentId}/resumes`, data);
  },
  updateResume(studentId, id, data) {
    return apiClient.put(`/tutorials/${studentId}/resumes/${id}`, data);
  },
  deleteResume(studentId, id) {
    return apiClient.delete(`/tutorials/${studentId}/resumes/${id}`);
  },
};