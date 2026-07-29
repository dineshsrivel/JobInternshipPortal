import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';

export const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans antialiased text-slate-800">
      {/* Fixed Left Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Workspace */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Sticky Top Navbar */}
        <Navbar
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Page Content View */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-200/60 bg-white/50 py-4 px-8 text-center text-xs text-slate-500 font-medium">
          © {new Date().getFullYear()} JobPulse Admin Portal. All rights reserved. • High-Performance SaaS Engine
        </footer>
      </div>
    </div>
  );
};
