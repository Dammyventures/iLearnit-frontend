import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBook, BiTime } from "react-icons/bi";
import { PiUsersFourLight, PiStudent, PiChalkboardTeacher } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={50}
        color={value && value > 99 ? "success" : "error"}
        thickness={5}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="text-xs font-bold dark:text-white text-black">
          {value}%
        </span>
      </Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [coursesComparePercentage, setCoursesComparePercentage] = useState<any>();
  const [userComparePercentage, setUserComparePercentage] = useState<any>();
  const [completionComparePercentage, setCompletionComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        // User analytics
        const usersLastTwoMonths = data.users.last12Months.slice(-2);
        if (usersLastTwoMonths.length === 2) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;

          const usersPercentChange = usersPreviousMonth !== 0
            ? ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100
            : 100;

          setUserComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });
        }

        // Mock data for courses (since we don't have courses analytics)
        setCoursesComparePercentage({
          currentMonth: 15,
          previousMonth: 12,
          percentChange: 25, // 25% increase
        });

        // Course completion rate (mock data)
        setCompletionComparePercentage({
          currentMonth: 78, // 78% completion rate
          previousMonth: 72, // 72% previous month
          percentChange: 8.33, // 8.33% improvement
        });
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  return (
    <div className="mt-[120px] min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Students Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-4">
              <PiStudent className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <div>
              <h5 className="text-2xl font-bold text-gray-900 dark:text-white">1,248</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Students</p>
            </div>
          </div>
        </div>

        {/* Active Courses Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 mr-4">
              <BiBook className="text-green-600 dark:text-green-400 text-2xl" />
            </div>
            <div>
              <h5 className="text-2xl font-bold text-gray-900 dark:text-white">42</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">Active Courses</p>
            </div>
          </div>
        </div>

        {/* Instructors Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 mr-4">
              <PiChalkboardTeacher className="text-purple-600 dark:text-purple-400 text-2xl" />
            </div>
            <div>
              <h5 className="text-2xl font-bold text-gray-900 dark:text-white">28</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">Instructors</p>
            </div>
          </div>
        </div>

        {/* Avg. Study Time Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 mr-4">
              <BiTime className="text-orange-600 dark:text-orange-400 text-2xl" />
            </div>
            <div>
              <h5 className="text-2xl font-bold text-gray-900 dark:text-white">3.2h</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">Avg. Study Time</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[65%,35%] gap-6">
        {/* Main Analytics Chart - Using UserAnalytics which has isDashboard prop */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <UserAnalytics isDashboard={true} />
        </div>

        {/* Stats Cards */}
        <div className="space-y-6">
          {/* New Users Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-4">
                  <PiUsersFourLight className="text-blue-600 dark:text-blue-400 text-2xl" />
                </div>
                <div>
                  <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userComparePercentage?.currentMonth || 0}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    New Users
                  </p>
                </div>
              </div>
              <div className="text-right">
                <CircularProgressWithLabel
                  value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <div className={`flex items-center justify-end mt-2 ${userComparePercentage?.percentChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {userComparePercentage?.percentChange > 0 ? (
                    <HiTrendingUp size={16} className="mr-1" />
                  ) : (
                    <HiTrendingDown size={16} className="mr-1" />
                  )}
                  <span className="text-sm font-medium">
                    {userComparePercentage?.percentChange > 0
                      ? "+" + userComparePercentage?.percentChange.toFixed(2)
                      : userComparePercentage?.percentChange.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Completion Card */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 mr-4">
                  <BiBook className="text-green-600 dark:text-green-400 text-2xl" />
                </div>
                <div>
                  <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {completionComparePercentage?.currentMonth || 0}%
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Completion Rate
                  </p>
                </div>
              </div>
              <div className="text-right">
                <CircularProgressWithLabel
                  value={completionComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <div className={`flex items-center justify-end mt-2 ${completionComparePercentage?.percentChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {completionComparePercentage?.percentChange > 0 ? (
                    <HiTrendingUp size={16} className="mr-1" />
                  ) : (
                    <HiTrendingDown size={16} className="mr-1" />
                  )}
                  <span className="text-sm font-medium">
                    {completionComparePercentage?.percentChange > 0
                      ? "+" + completionComparePercentage?.percentChange.toFixed(2)
                      : completionComparePercentage?.percentChange.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Using OrdersAnalytics which has isDashboard prop */}
        <div className="bg-white  dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <OrdersAnalytics isDashboard={true} />
        </div>

        {/* Using AllInvoices which has isDashboard prop */}
        <div className="bg-white  dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
            Recent Activity
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;