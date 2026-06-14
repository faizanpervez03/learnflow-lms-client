import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import {
  RiDashboardLine,
  RiBookOpenLine,
  RiCompassLine,
  RiBarChartBoxLine,
  RiAwardLine,
  RiFileListLine,
  RiSettingsLine,
  RiLogoutBoxLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
} from "react-icons/ri"

const navItems = [
  { label: "Dashboard", icon: RiDashboardLine, to: "/studentdashboard", end: true },
  { label: "My Courses", icon: RiBookOpenLine, to: "/studentdashboard/mycourses", end: true },
  { label: "Catalog", icon: RiCompassLine, to: "/studentdashboard/catalog", end: true },
  { label: "Quizzes", icon: RiFileListLine, to: "/studentdashboard/quizzes", end: true },
  { label: "Progress", icon: RiBarChartBoxLine, to: "/studentdashboard/progress", end: true },
  { label: "Certificates", icon: RiAwardLine, to: "/studentdashboard/certificates", end: true },
  { label: "Settings", icon: RiSettingsLine, to: "/studentdashboard/settings", end: true },
]

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
    ${isActive
      ? "bg-[#3525d7] text-white shadow-md shadow-indigo-200"
      : "text-gray-500 hover:bg-indigo-50 hover:text-[#3525d7]"
    }`

  return (
    <aside className={`h-screen sticky top-0 flex flex-col bg-white border-r border-gray-100 transition-all duration-300
      ${collapsed ? "w-[72px]" : "w-[220px]"}`}
    >

      {/* Logo */}
      <div className={`flex items-center px-4 py-5 border-b border-gray-100
        ${collapsed ? "justify-center" : "justify-between"}`}>
        {!collapsed && (
          <img src="./logo1.png" alt="LearnFlow" className="w-28" />
        )}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="text-gray-400 hover:text-[#3525d7] transition-colors p-1 rounded-lg hover:bg-indigo-50"
        >
          {collapsed ? <RiMenuUnfoldLine size={20} /> : <RiMenuFoldLine size={20} />}
        </button>
      </div>

      {/* User info */}
      {!collapsed ? (
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-[#3525d7]">FP</span>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 truncate">Faizan Pervez</p>
            <p className="text-xs text-gray-400 truncate">Student Account</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center py-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-sm font-bold text-[#3525d7]">FP</span>
          </div>
        </div>
      )}

      {/* Nav links */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, to, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={linkClass}
            title={collapsed ? label : ""}
          >
            <Icon size={20} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Upgrade banner */}
      {!collapsed && showBanner && (
        <div className="mx-3 mb-4 rounded-2xl bg-[#3525d7] p-4 flex flex-col gap-2 relative">
          {/* Cross button */}
          <button
            onClick={() => setShowBanner(false)}
            className="absolute top-2.5 right-2.5 text-indigo-300 hover:text-white transition"
            aria-label="Dismiss"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <p className="text-xs font-bold text-white">LIMIT REACHED</p>
          <p className="text-xs text-indigo-200 leading-snug">Unlock all mentors with Pro Premium</p>
          <button className="mt-1 bg-white text-[#3525d7] text-xs font-bold py-1.5 rounded-lg hover:bg-indigo-50 transition">
            Go Premium
          </button>
        </div>
      )}


      {/* Logout */}
      <div className="px-3 pb-5">
        <button
          onClick={() => navigate("/")}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500
            hover:bg-red-50 hover:text-red-500 transition-all duration-200
            ${collapsed ? "justify-center" : ""}`}
          title={collapsed ? "Logout" : ""}
        >
          <RiLogoutBoxLine size={20} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

    </aside>
  )
}

export default Sidebar