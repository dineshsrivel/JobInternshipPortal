export const JOB_STATUS = {
  APPROVED: 'Approved',
  PENDING: 'Pending',
  REJECTED: 'Rejected'
};

export const APPLICATION_STATUS = {
  APPLIED: 'Applied',
  SHORTLISTED: 'Shortlisted',
  INTERVIEW: 'Interview',
  SELECTED: 'Selected',
  REJECTED: 'Rejected'
};

export const COMPANY_STATUS = {
  VERIFIED: 'Verified',
  PENDING: 'Pending',
  SUSPENDED: 'Suspended'
};

export const STUDENT_STATUS = {
  ACTIVE: 'Active',
  PENDING_VERIFICATION: 'Pending',
  SUSPENDED: 'Suspended'
};

export const JOB_TYPES = ['Full-Time', 'Internship', 'Contract', 'Remote', 'Hybrid'];

export const COLLEGES = [
  'IIT Bombay', 'IIT Delhi', 'BITS Pilani', 'NIT Trichy',
  'Delhi University', 'Vellore Institute of Technology',
  'SRM Institute', 'DTU Delhi', 'IIIT Hyderabad', 'Anna University'
];

export const INDUSTRIES = [
  'Information Technology', 'SaaS / Cloud', 'FinTech', 'EdTech',
  'E-Commerce', 'Healthcare AI', 'Robotics & Hardware', 'Data Analytics'
];

export const ADMIN_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
  { id: 'students', label: 'Students', path: '/students', icon: 'Users' },
  { id: 'companies', label: 'Companies', path: '/companies', icon: 'Building2' },
  { id: 'jobs', label: 'Jobs', path: '/jobs', icon: 'Briefcase' },
  { id: 'applications', label: 'Applications', path: '/applications', icon: 'FileCheck' },
  { id: 'reports', label: 'Reports', path: '/reports', icon: 'FileBarChart' },
  { id: 'notifications', label: 'Notifications', path: '/notifications', icon: 'Bell' },
  { id: 'analytics', label: 'Analytics', path: '/#analytics', icon: 'LineChart' },
  { id: 'settings', label: 'Settings', path: '/settings', icon: 'Settings' }
];
