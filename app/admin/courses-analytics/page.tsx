// File: app/admin/courses-analytics/RecentActivity.tsx
'use client';

import React from 'react';

interface RecentActivityProps {
  params?: any;
  searchParams?: any;
}

const RecentActivity = ({ params, searchParams }: RecentActivityProps) => {
  // You can use params and searchParams here if needed
  const isDashboard = false; // Set default value internally instead of as a prop
  
  return (
    <div>
      <h2 className={isDashboard ? "text-lg font-semibold mb-4" : "text-2xl font-bold mb-6"}>
        Recent Activity
      </h2>
      <div className="space-y-3">
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
          <p className="text-sm">Student &quot;John Doe&quot; completed &quot;Introduction to Programming&quot;</p>
        </div>
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
          <p className="text-sm">New course &quot;Advanced React&quot; published by Dr. Smith</p>
        </div>
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
          <p className="text-sm">25 new students registered in the last 24 hours</p>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;