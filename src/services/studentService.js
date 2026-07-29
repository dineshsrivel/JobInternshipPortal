import api from './api';
import { mockStudents } from '../utils/mockData';

// Simulated delay helper for realistic network responses
const simulateNetwork = (data) => new Promise((resolve) => setTimeout(() => resolve({ data }), 150));

export const studentService = {
  // Fetch paginated & filtered students list
  getStudents: async (params = {}) => {
    try {
      // In production: return await api.get('/students', { params });
      let filtered = [...mockStudents];
      const { search, college, status, page = 1, limit = 10 } = params;

      if (search) {
        const query = search.toLowerCase();
        filtered = filtered.filter(
          (s) => s.name.toLowerCase().includes(query) || s.email.toLowerCase().includes(query) || s.college.toLowerCase().includes(query)
        );
      }

      if (college && college !== 'All') {
        filtered = filtered.filter((s) => s.college === college);
      }

      if (status && status !== 'All') {
        filtered = filtered.filter((s) => s.status === status);
      }

      const total = filtered.length;
      const startIndex = (page - 1) * limit;
      const data = filtered.slice(startIndex, startIndex + limit);

      return await simulateNetwork({
        students: data,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      });
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  getStudentById: async (id) => {
    const student = mockStudents.find((s) => s.id === id);
    return await simulateNetwork(student);
  },

  updateStudentStatus: async (id, status) => {
    const student = mockStudents.find((s) => s.id === id);
    if (student) student.status = status;
    return await simulateNetwork({ success: true, student });
  },

  deleteStudent: async (id) => {
    const index = mockStudents.findIndex((s) => s.id === id);
    if (index !== -1) mockStudents.splice(index, 1);
    return await simulateNetwork({ success: true, message: 'Student deleted successfully' });
  }
};
