import api from './api';
import { mockJobs } from '../utils/mockData';

const simulateNetwork = (data) => new Promise((resolve) => setTimeout(() => resolve({ data }), 150));

export const jobService = {
  getJobs: async (params = {}) => {
    let filtered = [...mockJobs];
    const { search, jobType, status, page = 1, limit = 10 } = params;

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (j) => j.title.toLowerCase().includes(q) || j.companyName.toLowerCase().includes(q) || j.location.toLowerCase().includes(q)
      );
    }
    if (jobType && jobType !== 'All') {
      filtered = filtered.filter((j) => j.jobType === jobType);
    }
    if (status && status !== 'All') {
      filtered = filtered.filter((j) => j.status === status);
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const data = filtered.slice(startIndex, startIndex + limit);

    return await simulateNetwork({
      jobs: data,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  },

  approveJob: async (id) => {
    const job = mockJobs.find((j) => j.id === id);
    if (job) job.status = 'Approved';
    return await simulateNetwork({ success: true, job });
  },

  rejectJob: async (id) => {
    const job = mockJobs.find((j) => j.id === id);
    if (job) job.status = 'Rejected';
    return await simulateNetwork({ success: true, job });
  },

  bulkApproveJobs: async (ids = []) => {
    mockJobs.forEach((j) => {
      if (ids.includes(j.id)) j.status = 'Approved';
    });
    return await simulateNetwork({ success: true, count: ids.length });
  },

  bulkDeleteJobs: async (ids = []) => {
    for (let i = mockJobs.length - 1; i >= 0; i--) {
      if (ids.includes(mockJobs[i].id)) mockJobs.splice(i, 1);
    }
    return await simulateNetwork({ success: true, count: ids.length });
  },

  deleteJob: async (id) => {
    const idx = mockJobs.findIndex((j) => j.id === id);
    if (idx !== -1) mockJobs.splice(idx, 1);
    return await simulateNetwork({ success: true, message: 'Job listing deleted successfully' });
  }
};
