import React, { useState, useEffect } from 'react';
import { Search, X, Users, Building2, Briefcase, FileCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockStudents, mockCompanies, mockJobs, mockApplications } from '../../utils/mockData';

export const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ students: [], companies: [], jobs: [], applications: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ students: [], companies: [], jobs: [], applications: [] });
      return;
    }
    const q = query.toLowerCase();
    setResults({
      students: mockStudents.filter(s => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)).slice(0, 3),
      companies: mockCompanies.filter(c => c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q)).slice(0, 3),
      jobs: mockJobs.filter(j => j.title.toLowerCase().includes(q) || j.companyName.toLowerCase().includes(q)).slice(0, 3),
      applications: mockApplications.filter(a => a.studentName.toLowerCase().includes(q) || a.jobTitle.toLowerCase().includes(q)).slice(0, 3)
    });
  }, [query]);

  if (!isOpen) return null;

  const totalHits = results.students.length + results.companies.length + results.jobs.length + results.applications.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/40 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Students, Companies, Jobs, Applications... (ESC to close)"
            className="w-full bg-transparent text-sm text-slate-800 focus:outline-none font-medium placeholder-slate-400"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 rounded-md">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-200/70 hover:bg-slate-200 rounded-lg">
            ESC
          </button>
        </div>

        {/* Results list */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {!query && (
            <div className="text-center py-8 text-slate-400 text-xs">
              Type to search across Students, Companies, Jobs, and Applications
            </div>
          )}

          {query && totalHits === 0 && (
            <div className="text-center py-8 text-slate-500 text-sm">
              No matching records found for "<span className="font-semibold text-slate-700">{query}</span>"
            </div>
          )}

          {/* Students Category */}
          {results.students.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5 text-blue-600" /> Students ({results.students.length})
              </div>
              <div className="space-y-1">
                {results.students.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => {
                      navigate(`/students?search=${student.name}`);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 hover:bg-blue-50/60 rounded-xl cursor-pointer transition-all group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600">{student.name}</p>
                      <p className="text-xs text-slate-500">{student.college} • {student.email}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Companies Category */}
          {results.companies.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Companies ({results.companies.length})
              </div>
              <div className="space-y-1">
                {results.companies.map((company) => (
                  <div
                    key={company.id}
                    onClick={() => {
                      navigate(`/companies?search=${company.name}`);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 hover:bg-emerald-50/60 rounded-xl cursor-pointer transition-all group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-emerald-600">{company.name}</p>
                      <p className="text-xs text-slate-500">{company.industry} • HR: {company.hrName}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jobs Category */}
          {results.jobs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Briefcase className="w-3.5 h-3.5 text-amber-600" /> Jobs ({results.jobs.length})
              </div>
              <div className="space-y-1">
                {results.jobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => {
                      navigate(`/jobs?search=${job.title}`);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 hover:bg-amber-50/60 rounded-xl cursor-pointer transition-all group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-amber-600">{job.title}</p>
                      <p className="text-xs text-slate-500">{job.companyName} • {job.location} ({job.jobType})</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
