import api from './api';
import { mockCompanies } from '../utils/mockData';

const simulateNetwork = (data) => new Promise((resolve) => setTimeout(() => resolve({ data }), 150));

export const companyService = {
  getCompanies: async (params = {}) => {
    let filtered = [...mockCompanies];
    const { search, industry, status, page = 1, limit = 10 } = params;

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (c) => c.name.toLowerCase().includes(q) || c.hrName.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      );
    }
    if (industry && industry !== 'All') {
      filtered = filtered.filter((c) => c.industry === industry);
    }
    if (status && status !== 'All') {
      filtered = filtered.filter((c) => c.status === status);
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const data = filtered.slice(startIndex, startIndex + limit);

    return await simulateNetwork({
      companies: data,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  },

  approveCompany: async (id) => {
    const comp = mockCompanies.find((c) => c.id === id);
    if (comp) {
      comp.status = 'Verified';
      comp.verification = 'Approved';
    }
    return await simulateNetwork({ success: true, company: comp });
  },

  rejectCompany: async (id) => {
    const comp = mockCompanies.find((c) => c.id === id);
    if (comp) {
      comp.status = 'Suspended';
      comp.verification = 'Rejected';
    }
    return await simulateNetwork({ success: true, company: comp });
  },

  deleteCompany: async (id) => {
    const idx = mockCompanies.findIndex((c) => c.id === id);
    if (idx !== -1) mockCompanies.splice(idx, 1);
    return await simulateNetwork({ success: true, message: 'Company deleted successfully' });
  }
};
