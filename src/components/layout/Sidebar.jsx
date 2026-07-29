import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileCheck,
  FileBarChart,
  Bell,
  LineChart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness
} from 'lucide-react';
import { LogoutConfirmModal } from '../modals/LogoutConfirmModal';

export const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Students', path: '/students', icon: Users },
    { label: 'Companies', path: '/companies', icon: Building2 },
    { label: 'Jobs', path: '/jobs', icon: Briefcase },
    { label: 'Applications', path: '/applications', icon: FileCheck },
    { label: 'Reports', path: '/reports', icon: FileBarChart },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Analytics', path: '/#analytics', icon: LineChart, isHash: true },
    { label: 'Settings', path: '/settings', icon: Settings }
  ];

  const handleNavClick = (item) => {
    if (item.isHash) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('analytics-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <aside
        className={`fixed left-0 top-0 bottom-0 z-40 bg-white border-r border-slate-200/80 flex flex-col transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
              <BriefcaseBusiness className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="leading-tight">
                <h1 className="font-extrabold text-base text-slate-900 tracking-tight">JobPulse</h1>
                <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase">Admin Portal</p>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle Button */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.isHash
              ? location.hash === '#analytics' || (location.pathname === '/' && location.hash === '#analytics')
              : location.pathname === item.path && location.hash !== '#analytics';

            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => handleNavClick(item)}
                className={({ isActive: navActive }) => {
                  const active = item.isHash ? isActive : navActive && location.hash !== '#analytics';
                  return `flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 group ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/70'
                  }`;
                }}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all group"
            title={isCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
            {!isCollapsed && <span>Logout System</span>}
          </button>
        </div>
      </aside>

      <LogoutConfirmModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
    </>
  );
};
