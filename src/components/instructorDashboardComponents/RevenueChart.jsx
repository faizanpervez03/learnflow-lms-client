import React from "react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { FiDownload, FiChevronDown } from "react-icons/fi"

const revenueData = [
  { month: "Jan", value: 420 }, { month: "Feb", value: 380 },
  { month: "Mar", value: 460 }, { month: "Apr", value: 520 },
  { month: "May", value: 480 }, { month: "Jun", value: 560 },
  { month: "Jul", value: 600 }, { month: "Aug", value: 580 },
  { month: "Sep", value: 640 }, { month: "Oct", value: 700 },
  { month: "Nov", value: 760 }, { month: "Dec", value: 850 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
        <p className="font-semibold">{label}</p>
        <p className="text-indigo-300">${payload[0].value}</p>
      </div>
    )
  }
  return null
}

const RevenueChart = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="font-bold text-gray-900">Revenue Analytics</h2>
          <p className="text-xs text-gray-400 mt-0.5">Performance overview for the last 12 months</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            Year 2026 <FiChevronDown size={12} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <FiDownload size={14} className="text-gray-500" />
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={revenueData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3525d7" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#3525d7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3525d7"
            strokeWidth={2.5}
            fill="url(#revenueGradient)"
            dot={false}
            activeDot={{ r: 5, fill: "#3525d7", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart