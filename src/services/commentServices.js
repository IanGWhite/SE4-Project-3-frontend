import apiClient from "./services.js";

export default {
  getAllComments(studentId, resumeId) {
    return apiClient.get(`/students/${studentId}/resumes/${resumeId}/comments`);
  },
  getComments(studentId, id) {
    return apiClient.get(`/students/${studentId}/comments/${id}`);
  },
  createComment(studentId, resumeId, commentId) {
    return apiClient.post(`/students/${studentId}/${resumeId}/comment/${commentId}`);
  },
  updateComment(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/comments/${id}`, data);
  },
  deleteComment(studentId, resumeId, id) {
    return apiClient.delete(`/students/${studentId}/${resumeId}/comments/${id}`);
  },
};