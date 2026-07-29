import React, { useState } from 'react';
import { Search, Bell, MessageSquare, Moon, Sun, Menu, ChevronDown, User, Shield, LogOut, CheckCircle2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Avatar } from '../common/Avatar';
import { GlobalSearchModal } from '../modals/GlobalSearchModal';
import { LogoutConfirmModal } from '../modals/LogoutConfirmModal';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    toast.success(
      isDarkMode ? 'Switched to Light Mode' : 'Light Mode is enforced by portal rules',
      { icon: '☀️' }
    );
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 transition-all">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Mobile Toggle & Quick Search Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
              title="Toggle Navigation Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search Bar Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 bg-slate-100/80 hover:bg-slate-100 text-slate-500 hover:text-slate-700 rounded-xl border border-slate-200/60 text-xs font-medium w-64 lg:w-80 transition-all group"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              <span className="flex-1 text-left">Search Students, Jobs, Companies...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white rounded border border-slate-200 shadow-2xs">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* Right Action Icons & Admin Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle Button (UI Only) */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all relative"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Messages Icon */}
            <button
              onClick={() => toast('No unread admin messages', { icon: '💬' })}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all relative"
              title="Messages"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            </button>

            {/* Notification Drawer Button */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
              </button>

              {/* Quick Notifications Popover */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">System Alerts</h4>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-semibold rounded-full">2 New</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100/80 transition-colors">
                      <p className="font-semibold text-slate-800">14 Jobs Pending Approval</p>
                      <p className="text-slate-500 mt-0.5 text-[11px]">Requires admin verification before going live.</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100/80 transition-colors">
                      <p className="font-semibold text-slate-800">New Company Registered</p>
                      <p className="text-slate-500 mt-0.5 text-[11px]">Groww FinTech uploaded verification KYC.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

            {/* Admin Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 p-1.5 hover:bg-slate-100 rounded-xl transition-all"
              >
                <Avatar
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                  name={user?.name || 'Sarah Jenkins'}
                  size="md"
                  className="ring-2 ring-blue-600/20"
                />
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-slate-800 leading-tight">{user?.name || 'Sarah Jenkins'}</p>
                  <p className="text-[10px] font-semibold text-blue-600">{user?.role || 'Super Administrator'}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
              </button>

              {/* Profile Menu Popover */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in duration-150">
                  <div className="p-2.5 bg-blue-50/60 rounded-xl mb-2">
                    <p className="text-xs font-bold text-slate-900">{user?.name || 'Sarah Jenkins'}</p>
                    <p className="text-[11px] text-slate-500">{user?.email || 'admin@jobpulse.io'}</p>
                    <div className="flex items-center gap-1 mt-1 text-[10px] font-medium text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full w-max">
                      <CheckCircle2 className="w-3 h-3" /> Active Session
                    </div>
                  </div>

                  <div className="space-y-1 text-xs font-medium text-slate-700">
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 hover:bg-slate-100 rounded-xl transition-all"
                    >
                      <User className="w-4 h-4 text-slate-400" /> My Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 hover:bg-slate-100 rounded-xl transition-all"
                    >
                      <Shield className="w-4 h-4 text-slate-400" /> Settings
                    </Link>
                    <div className="my-1 border-t border-slate-100" />
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        setIsLogoutModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-rose-50 text-rose-600 rounded-xl transition-all text-left font-semibold"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
    </>
  );
};
