import api from './api';
import { mockSummaryStats, mockAnalyticsData, mockActivities } from '../utils/mockData';

const simulateNetwork = (data) => new Promise((resolve) => setTimeout(() => resolve({ data }), 150));

export const analyticsService = {
  getDashboardStats: async () => {
    return await simulateNetwork(mockSummaryStats);
  },

  getAnalyticsCharts: async () => {
    return await simulateNetwork(mockAnalyticsData);
  },

  getRecentActivities: async () => {
    return await simulateNetwork(mockActivities);
  }
};
