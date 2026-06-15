import React, { useState, useRef, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { FiBell, FiSearch, FiSettings, FiGrid, FiLogOut } from 'react-icons/fi'
import Sidebar from '../studentDashboardComponents/Sidebar'

import DashboardFooter from './DashboardFooter'

const StudentLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const navigate = useNavigate()

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className='flex h-screen bg-[#f7f8fc]'>

      {/* ── Sidebar ── */}
      <>
        {/* Desktop: always visible */}
        <div className='hidden md:flex shrink-0'>
          <Sidebar />
        </div>

        {/* Mobile: slide-in drawer */}
        <div className={`fixed inset-y-0 left-0 z-50 flex md:hidden transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar />
        </div>

        {/* Mobile: backdrop overlay */}
        {mobileOpen && (
          <div
            className='fixed inset-0 z-40 bg-black/40 md:hidden'
            onClick={() => setMobileOpen(false)}
          />
        )}
      </>

      {/* ── Right side ── */}
      <div className='flex flex-col flex-1 min-w-0 h-screen'>

        {/* Dashboard Topbar */}
        <header className='flex items-center justify-between gap-4 bg-white border-b border-gray-100 px-6 py-3 shrink-0'>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className='md:hidden p-2 rounded-xl text-gray-500 hover:text-[#3525d7] hover:bg-indigo-50 transition'
            aria-label='Open menu'
          >
            <svg width='20' height='20' fill='none' viewBox='0 0 24 24'>
              <path d='M4 6h16M4 12h16M4 18h16' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
            </svg>
          </button>

          {/* Search */}
          <div className='flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2 flex-1 max-w-md'>
            <FiSearch className='text-gray-400 shrink-0' size={16} />
            <input
              type='text'
              placeholder='Search courses, mentors...'
              className='bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full'
            />
          </div>

          {/* Right actions */}
          <div className='flex items-center gap-3'>

            {/* Notification bell */}
            <button
              className='relative p-2 rounded-xl text-gray-500 hover:text-[#3525d7] hover:bg-indigo-50 transition'
              aria-label='Notifications'
            >
              <FiBell size={20} />
              <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full' />
            </button>

            {/* Profile avatar with dropdown */}
            <div className='relative' ref={profileRef}>
              <button
                onClick={() => setProfileOpen(o => !o)}
                className={`flex items-center gap-2.5 transition p-1 rounded-xl
                  ${profileOpen ? 'bg-indigo-50' : 'hover:bg-gray-100'}`}
              >
                <div className='w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0'>
                  <span className='text-sm font-bold text-[#3525d7]'>FP</span>
                </div>
                <div className='hidden md:block text-left leading-tight'>
                  <p className='text-sm font-bold text-gray-900'>Faizan Pervez</p>
                  <p className='text-xs text-gray-400'>Student</p>
                </div>
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div className='absolute right-0 top-12 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50'>

                  {/* User info */}
                  <div className='px-4 py-3 border-b border-gray-100'>
                    <div className='flex items-center gap-3'>
                      <div className='w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0'>
                        <span className='text-sm font-bold text-[#3525d7]'>FP</span>
                      </div>
                      <div>
                        <p className='text-sm font-bold text-gray-900'>Faizan Pervez</p>
                        <p className='text-xs text-gray-400'>Student Account</p>
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className='py-1'>
                    <button
                      onClick={() => { navigate('/studentdashboard'); setProfileOpen(false) }}
                      className='flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-[#3525d7] transition'
                    >
                      <FiGrid size={15} /> Dashboard
                    </button>
                    <button
                      onClick={() => { navigate('/studentdashboard/settings'); setProfileOpen(false) }}
                      className='flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-[#3525d7] transition'
                    >
                      <FiSettings size={15} /> Settings
                    </button>
                  </div>

                  {/* Logout */}
                  <div className='border-t border-gray-100 pt-1'>
                    <button
                      onClick={() => { navigate('/'); setProfileOpen(false) }}
                      className='flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition'
                    >
                      <FiLogOut size={15} /> Logout
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>
        </header>

        {/* Scrollable area */}
        <div className='flex-1 overflow-y-auto flex flex-col'>
          <main className='flex-1 px-6 py-6'>
            <Outlet />
          </main>
          <DashboardFooter />
        </div>

      </div>
    </div>
  )
}

export default StudentLayout