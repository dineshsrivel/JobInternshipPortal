import React, { useState, useEffect } from 'react';
import {
  Users,
  Building2,
  Briefcase,
  Clock,
  CheckCircle2,
  XCircle,
  FileCheck,
  TrendingUp,
  Download,
  Filter,
  PlusCircle,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { StatCard } from '../components/cards/StatCard';
import { MonthlyJobsAreaChart } from '../components/charts/MonthlyJobsAreaChart';
import { RegistrationsLineChart } from '../components/charts/RegistrationsLineChart';
import { ApplicationStatusPieChart } from '../components/charts/ApplicationStatusPieChart';
import { TopHiringBarChart } from '../components/charts/TopHiringBarChart';
import { RecentActivityTimeline } from '../components/cards/RecentActivityTimeline';
import { Skeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/common/ErrorState';
import { analyticsService } from '../services/analyticsService';
import { jobService } from '../services/jobService';

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [activities, setActivities] = useState([]);
  const [pendingJobsList, setPendingJobsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsRes, analyticsRes, actRes, pendingRes] = await Promise.all([
        analyticsService.getDashboardStats(),
        analyticsService.getAnalyticsCharts(),
        analyticsService.getRecentActivities(),
        jobService.getJobs({ status: 'Pending', limit: 4 })
      ]);

      setStats(statsRes.data);
      setAnalytics(analyticsRes.data);
      setActivities(actRes.data);
      setPendingJobsList(pendingRes.data.jobs);
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError('Unable to synchronize live metrics from the administrative database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleApproveJob = async (jobId) => {
    try {
      await jobService.approveJob(jobId);
      toast.success('Job listing approved successfully!');
      setPendingJobsList(prev => prev.filter(j => j.id !== jobId));
      setStats(prev => prev ? { ...prev, pendingJobs: Math.max(0, prev.pendingJobs - 1), approvedJobs: prev.approvedJobs + 1 } : prev);
    } catch (err) {
      toast.error('Failed to approve job');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96 lg:col-span-2" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchDashboardData} />;
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Overview Dashboard</h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Real-time analytics, recruitment funnels, and pending action items.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toast.success('Analytics report generated (PDF preview ready)')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-2xs transition-all"
          >
            <Download className="w-4 h-4 text-slate-500" /> Export Summary
          </button>
          <button
            onClick={fetchDashboardData}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all"
          >
            <TrendingUp className="w-4 h-4" /> Refresh Metrics
          </button>
        </div>
      </div>

      {/* 8 Required Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Students"
          value={stats?.totalStudents ?? 0}
          growth={stats?.totalStudentsGrowth ?? 0}
          icon={Users}
          color="blue"
          sparklineData={[0, 0, 0, 0, 0, 0, 0]}
        />
        <StatCard
          title="Total Companies"
          value={stats?.totalCompanies ?? 0}
          growth={stats?.totalCompaniesGrowth ?? 0}
          icon={Building2}
          color="indigo"
          sparklineData={[0, 0, 0, 0, 0, 0, 0]}
        />
        <StatCard
          title="Total Active Jobs"
          value={stats?.totalActiveJobs ?? 0}
          growth={stats?.totalActiveJobsGrowth ?? 0}
          icon={Briefcase}
          color="emerald"
          sparklineData={[0, 0, 0, 0, 0, 0, 0]}
        />
        <StatCard
          title="Pending Jobs"
          value={stats?.pendingJobs ?? 0}
          growth={stats?.pendingJobsGrowth ?? 0}
          icon={Clock}
          color="amber"
          sparklineData={[0, 0, 0, 0, 0, 0, 0]}
        />
        <StatCard
          title="Approved Jobs"
          value={stats?.approvedJobs ?? 0}
          growth={stats?.approvedJobsGrowth ?? 0}
          icon={CheckCircle2}
          color="emerald"
          sparklineData={[0, 0, 0, 0, 0, 0, 0]}
        />
        <StatCard
          title="Rejected Jobs"
          value={stats?.rejectedJobs ?? 0}
          growth={stats?.rejectedJobsGrowth ?? 0}
          icon={XCircle}
          color="rose"
          sparklineData={[0, 0, 0, 0, 0, 0, 0]}
        />
        <StatCard
          title="Applications Today"
          value={stats?.applicationsToday ?? 0}
          growth={stats?.applicationsTodayGrowth ?? 0}
          icon={TrendingUp}
          color="blue"
          sparklineData={[0, 0, 0, 0, 0, 0, 0]}
        />
        <StatCard
          title="Total Applications"
          value={stats?.totalApplications ?? 0}
          growth={stats?.totalApplicationsGrowth ?? 0}
          icon={FileCheck}
          color="indigo"
          sparklineData={[0, 0, 0, 0, 0, 0, 0]}
        />
      </section>

      {/* Analytics Section Header */}
      <div id="analytics-section" className="pt-4 scroll-mt-24">
        {/* Charts Grid 1: Area Chart + Donut Status Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <MonthlyJobsAreaChart data={analytics?.monthlyJobsAndApps} />
          </div>
          <div>
            <ApplicationStatusPieChart data={analytics?.applicationStatusBreakdown} />
          </div>
        </div>

        {/* Charts Grid 2: Line Chart + Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RegistrationsLineChart data={analytics?.registrationsTrend} />
          <TopHiringBarChart data={analytics?.topHiringCompanies} />
        </div>
      </div>

      {/* Bottom Row: Recent Activity Feed + Pending Approvals Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Activity Timeline (2 Cols) */}
        <div className="lg:col-span-2">
          <RecentActivityTimeline activities={activities} />
        </div>

        {/* Quick Pending Approvals Widget (1 Col) */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Pending Job Approvals</h3>
                <p className="text-xs text-slate-500 font-medium">Quick admin decision queue</p>
              </div>
              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200">
                {pendingJobsList.length} Action Needed
              </span>
            </div>

            {pendingJobsList.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs font-medium">
                No pending job listings in queue!
              </div>
            ) : (
              <div className="space-y-3">
                {pendingJobsList.map((job) => (
                  <div key={job.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100/60 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{job.title}</h4>
                        <p className="text-[11px] text-slate-500 font-medium">{job.companyName} • {job.location}</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        ₹{(job.salary / 100000).toFixed(1)} LPA
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50">
                      <span className="text-[10px] text-slate-400 font-semibold">{job.jobType}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleApproveJob(job.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition-colors"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <a href="/jobs" className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
              View All Pending Jobs →
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
