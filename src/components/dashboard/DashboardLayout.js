import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Mood Tracker', href: '/mood-tracker', icon: '📊' },
    { name: 'Assessments', href: '/assessments', icon: '📝' },
    { name: 'Chat Support', href: '/chat', icon: '💬' },
    { name: 'Resources', href: '/resources', icon: '📚' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="hidden md:flex md:w-64 md:flex-col"
      >
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-indigo-600 border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-white text-xl font-bold">MindCare</h1>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-700 hover:text-white"
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center md:hidden">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-gray-600"
                  >
                    ☰
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <h4 className="text-sm font-medium text-gray-800">{currentUser?.name}</h4>
                      <p className="text-xs text-gray-500 capitalize">{currentUser?.role}</p>
                    </div>
                    <img
                      className="h-10 w-10 rounded-full"
                      src={currentUser?.avatar}
                      alt=""
                    />
                  </div>
                </div>
                <div className="ml-3">
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-600">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-indigo-100 hover:bg-indigo-700 hover:text-white"
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;