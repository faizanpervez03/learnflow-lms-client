import React from "react"
import { FiDollarSign, FiTrendingUp, FiUsers, FiStar } from "react-icons/fi"

const StatCard = ({ label, value, change, icon, iconBg, iconColor }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 hover:shadow-sm transition">
    <div className="flex items-center justify-between mb-3 sm:mb-4">
      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <span className={iconColor}>{icon}</span>
      </div>
      {change && (
        <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full whitespace-nowrap">
          {change}
        </span>
      )}
    </div>
    <p className="text-[11px] sm:text-xs text-gray-400 font-medium uppercase tracking-wide mb-1 truncate">
      {label}
    </p>
    <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
  </div>
)

const StatsOverview = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        label="Total Earnings"
        value="$4.2k"
        change="+12.5%"
        icon={<FiDollarSign size={16} className="sm:text-lg" />}
        iconBg="bg-indigo-50"
        iconColor="text-indigo-600"
      />
      <StatCard
        label="This Month"
        value="$850"
        change="+8%"
        icon={<FiTrendingUp size={16} />}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
      />
      <StatCard
        label="Total Students"
        value="1,240"
        change="+286 new"
        icon={<FiUsers size={16} />}
        iconBg="bg-amber-50"
        iconColor="text-amber-600"
      />
      <StatCard
        label="Avg Rating"
        value="4.9"
        change="98% Positive"
        icon={<FiStar size={16} />}
        iconBg="bg-rose-50"
        iconColor="text-rose-500"
      />
    </div>
  )
}

export default StatsOverview