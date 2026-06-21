import React from "react"
import { FiPlus, FiSearch } from "react-icons/fi"
import StatsOverview from "../../components/instructorDashboardComponents/StatsOverview"
import RevenueChart from "../../components/instructorDashboardComponents/RevenueChart"
import RecentCourses from "../../components/instructorDashboardComponents/RecentCourses"

const InstructorDashboard = () => {
  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3  ">
        <h1 className="text-xl font-bold text-gray-900">Instructor Dashboard</h1>
        <div className="flex items-center flex-col md:flex-row gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              placeholder="Search courses, students..."
              className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg w-56 sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer whitespace-nowrap">
            <FiPlus /> Create New Course
          </button>
        </div>
      </div>

      <StatsOverview />
      <RevenueChart />
      <RecentCourses />

    </div>
  )
}

export default InstructorDashboard