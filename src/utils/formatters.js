export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return 'N/A';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatSalaryRange = (salary) => {
  if (typeof salary === 'string') return salary;
  if (!salary) return 'Negotiable';
  if (salary >= 100000) {
    const lpa = (salary / 100000).toFixed(1);
    return `₹${lpa} LPA`;
  }
  return `₹${salary.toLocaleString('en-IN')}/mo`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString);
};

export const getStatusBadgeStyle = (status) => {
  switch (status?.toLowerCase()) {
    case 'approved':
    case 'verified':
    case 'active':
    case 'selected':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'pending':
    case 'applied':
    case 'pending_verification':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'rejected':
    case 'suspended':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'shortlisted':
    case 'interview':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};
