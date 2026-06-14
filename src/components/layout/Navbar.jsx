import React, { useState, useRef, useEffect } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"
import { FiBell, FiUser, FiSettings, FiLogOut, FiGrid } from "react-icons/fi"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const linkClass = ({ isActive }) =>
    `pb-1 transition ${
      isActive
        ? "text-[#3525d7] border-b-2 border-[#3525d7]"
        : "text-gray-600 hover:text-[#3525d7]"
    }`

  return (
    <div className="border-b border-gray-200 bg-white relative z-50">

      <div className="flex items-center justify-between px-4 md:px-6 py-3">

        {/* LEFT — Logo + Nav */}
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src="/logo1.png" className="w-28" alt="logo" />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <NavLink to="/catalog"    className={linkClass}>Catalog</NavLink>
            <NavLink to="/mylearning" className={linkClass}>My Learning</NavLink>
            <NavLink to="/mentors"    className={linkClass}>Mentors</NavLink>
            <NavLink to="/resources"  className={linkClass}>Resources</NavLink>
          </nav>
        </div>

        {/* RIGHT — Icons + Button */}
        <div className="hidden md:flex items-center gap-4">
          <FiBell className="text-xl text-gray-600 hover:text-black cursor-pointer" />

          {/* User icon with dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(d => !d)}
              className={`text-xl transition cursor-pointer p-1 rounded-full
                ${dropdownOpen ? "text-[#3525d7] bg-indigo-50" : "text-gray-600 hover:text-black"}`}
            >
              <FiUser />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-10 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">

                {/* User info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#3525d7]">FP</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Faizan Pervez</p>
                      <p className="text-xs text-gray-400">Student Account</p>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="py-1">
                  <button
                    onClick={() => { navigate("/studentdashboard"); setDropdownOpen(false) }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-[#3525d7] transition"
                  >
                    <FiGrid className="text-base" />
                    Dashboard
                  </button>

                  <button
                    onClick={() => { navigate("/student/settings"); setDropdownOpen(false) }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-[#3525d7] transition"
                  >
                    <FiSettings className="text-base" />
                    Settings
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 pt-1">
                  <button
                    onClick={() => { navigate("/"); setDropdownOpen(false) }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                  >
                    <FiLogOut className="text-base" />
                    Logout
                  </button>
                </div>

              </div>
            )}
          </div>

          <button className="bg-[#3525d7] text-white px-4 py-2 rounded-md text-sm hover:bg-[#2a1fb0] transition">
            Upgrade Pro
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-gray-700"
        >
          {open ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3">

          {/* Icons + Button on top */}
          <div className="flex items-center justify-between py-3 border-b mb-3">
            <div className="flex items-center gap-4">
              <FiBell className="text-xl text-gray-600" />
              <button
                onClick={() => { navigate("/studentdashboard"); setOpen(false) }}
                className="text-xl text-gray-600 hover:text-[#3525d7]"
              >
                <FiUser />
              </button>
            </div>
            <button className="bg-[#3525d7] text-white px-4 py-2 rounded-md text-sm">
              Upgrade Pro
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col space-y-3">
            <NavLink to="/catalog"    className={linkClass} onClick={() => setOpen(false)}>Catalog</NavLink>
            <NavLink to="/mylearning" className={linkClass} onClick={() => setOpen(false)}>My Learning</NavLink>
            <NavLink to="/mentors"    className={linkClass} onClick={() => setOpen(false)}>Mentors</NavLink>
            <NavLink to="/resources"  className={linkClass} onClick={() => setOpen(false)}>Resources</NavLink>

            {/* Mobile dashboard link */}
            <button
              onClick={() => { navigate("/student/dashboard"); setOpen(false) }}
              className="text-left text-sm font-medium text-[#3525d7]"
            >
              → Go to Dashboard
            </button>
          </div>

        </div>
      )}

    </div>
  )
}

export default Navbar