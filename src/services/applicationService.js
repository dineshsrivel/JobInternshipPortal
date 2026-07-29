import api from './api';
import { mockApplications } from '../utils/mockData';

const simulateNetwork = (data) => new Promise((resolve) => setTimeout(() => resolve({ data }), 150));

export const applicationService = {
  getApplications: async (params = {}) => {
    let filtered = [...mockApplications];
    const { search, company, job, status, page = 1, limit = 10 } = params;

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (a) => a.studentName.toLowerCase().includes(q) || a.jobTitle.toLowerCase().includes(q) || a.companyName.toLowerCase().includes(q)
      );
    }
    if (company && company !== 'All') {
      filtered = filtered.filter((a) => a.companyName === company);
    }
    if (job && job !== 'All') {
      filtered = filtered.filter((a) => a.jobTitle === job);
    }
    if (status && status !== 'All') {
      filtered = filtered.filter((a) => a.status === status);
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const data = filtered.slice(startIndex, startIndex + limit);

    return await simulateNetwork({
      applications: data,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  },

  updateApplicationStatus: async (id, status) => {
    const app = mockApplications.find((a) => a.id === id);
    if (app) app.status = status;
    return await simulateNetwork({ success: true, application: app });
  }
};
