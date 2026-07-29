// Empty data stores - all metrics reset to zero until live module integration
export const mockStudents = [];

export const mockCompanies = [];

export const mockJobs = [];

export const mockApplications = [];

// Reset Summary Stats to Zeros
export const mockSummaryStats = {
  totalStudents: 0,
  totalStudentsGrowth: 0,
  totalCompanies: 0,
  totalCompaniesGrowth: 0,
  totalActiveJobs: 0,
  totalActiveJobsGrowth: 0,
  pendingJobs: 0,
  pendingJobsGrowth: 0,
  approvedJobs: 0,
  approvedJobsGrowth: 0,
  rejectedJobs: 0,
  rejectedJobsGrowth: 0,
  applicationsToday: 0,
  applicationsTodayGrowth: 0,
  totalApplications: 0,
  totalApplicationsGrowth: 0
};

// Reset Analytics Charts to Zeros & Empty Sets
export const mockAnalyticsData = {
  monthlyJobsAndApps: [
    { month: 'Jan', jobs: 0, applications: 0 },
    { month: 'Feb', jobs: 0, applications: 0 },
    { month: 'Mar', jobs: 0, applications: 0 },
    { month: 'Apr', jobs: 0, applications: 0 },
    { month: 'May', jobs: 0, applications: 0 },
    { month: 'Jun', jobs: 0, applications: 0 },
    { month: 'Jul', jobs: 0, applications: 0 }
  ],
  registrationsTrend: [
    { month: 'Jan', students: 0, companies: 0 },
    { month: 'Feb', students: 0, companies: 0 },
    { month: 'Mar', students: 0, companies: 0 },
    { month: 'Apr', students: 0, companies: 0 },
    { month: 'May', students: 0, companies: 0 },
    { month: 'Jun', students: 0, companies: 0 },
    { month: 'Jul', students: 0, companies: 0 }
  ],
  applicationStatusBreakdown: [
    { name: 'Applied', value: 0, color: '#3B82F6' },
    { name: 'Shortlisted', value: 0, color: '#6366F1' },
    { name: 'Interview', value: 0, color: '#F59E0B' },
    { name: 'Selected', value: 0, color: '#10B981' },
    { name: 'Rejected', value: 0, color: '#EF4444' }
  ],
  topHiringCompanies: [],
  mostAppliedJobs: []
};

// Empty Recent Activities Feed
export const mockActivities = [];

// Empty System Notifications
export const mockNotifications = [];
