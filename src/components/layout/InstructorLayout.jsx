import React, { useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import {
  FiGrid, FiBookOpen, FiPlusCircle, FiUsers, FiDollarSign, FiStar,
  FiSettings, FiLogOut, FiMenu, FiX,
} from "react-icons/fi"
import { useAuth } from "../../context/AuthContext"

const InstructorLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getInitials = (name) => {
    if (!name) return "U"
    const parts = name.trim().split(" ")
    if (parts.length === 1) return parts[0][0].toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
      isActive ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-indigo-50 hover:text-[#3525d7]"
    }`

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar — fixed on desktop, slide-in on mobile */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col justify-between z-50
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div>
          <div className="px-6 py-5 flex items-center justify-between">
            <h1 className="text-lg font-bold text-[#3525d7]">LearnFlow</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-3">
            <NavLink to="/instructordashboard" end className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FiGrid /> Dashboard
            </NavLink>
            <NavLink to="/instructordashboard/courses" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FiBookOpen /> Courses
            </NavLink>
            <NavLink to="/instructordashboard/create-course" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FiPlusCircle /> Create Course
            </NavLink>
            <NavLink to="/instructordashboard/students" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FiUsers /> Students
            </NavLink>
            <NavLink to="/instructordashboard/earnings" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FiDollarSign /> Earnings
            </NavLink>
            <NavLink to="/instructordashboard/reviews" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FiStar /> Reviews
            </NavLink>
          </nav>
        </div>

        <div className="px-3 pb-5">
          <NavLink to="/instructordashboard/settings" className={linkClass} onClick={() => setSidebarOpen(false)}>
            <FiSettings /> Settings
          </NavLink>

          <div className="mt-3 bg-indigo-50 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-gray-700">PRO PLAN</p>
            <p className="text-[11px] text-gray-500 mt-1 mb-3">
              Unlock advanced analytics and team features.
            </p>
            <button className="w-full bg-indigo-600 text-white text-xs font-medium py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer">
              Go Premium
            </button>
          </div>

          <div className="relative mt-4">
            <button
              onClick={() => setDropdownOpen((d) => !d)}
              className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-[#3525d7]">{getInitials(user?.name)}</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900">{user?.name || "Instructor"}</p>
                <p className="text-xs text-gray-400">Instructor</p>
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute bottom-14 left-0 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-1 z-50">
                <button
                  onClick={() => { navigate("/instructordashboard/settings"); setDropdownOpen(false) }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-[#3525d7] transition"
                >
                  <FiSettings className="text-base" /> Settings
                </button>
                <div className="border-t border-gray-100 pt-1">
                  <button
                    onClick={() => { logout(); navigate("/"); setDropdownOpen(false) }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                  >
                    <FiLogOut className="text-base" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">

        {/* Mobile top bar with hamburger */}
        <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-700">
            <FiMenu size={22} />
          </button>
          <h1 className="text-base font-bold text-[#3525d7]">LearnFlow</h1>
          <div className="w-6" /> {/* spacer to balance hamburger width */}
        </div>

        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

    </div>
  )
}

export default InstructorLayout