import React, { useState } from "react"
import { FiClock, FiBell, FiCheck } from "react-icons/fi"

const UpcomingQuiz = () => {
  const [reminded, setReminded] = useState(false)

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-gray-900">Upcoming Quiz</span>
        <span className="text-lg">📝</span>
      </div>

      {/* Date & time */}
      <div className="flex items-center gap-1.5 mt-1">
        <FiClock size={12} className="text-gray-400" />
        <p className="text-xs text-gray-500 font-semibold tracking-wide uppercase">
          Tomorrow • 10:00 AM
        </p>
      </div>

      {/* Quiz title */}
      <p className="text-sm font-bold text-gray-900 mt-2">Product Design Quiz</p>

      {/* Tags */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px] font-semibold bg-indigo-50 text-[#3525d7] px-2.5 py-1 rounded-full">
          UI/UX
        </span>
        <span className="text-[10px] font-semibold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
          20 Questions
        </span>
      </div>

      {/* Button */}
      <button
        onClick={() => setReminded(true)}
        className={`mt-4 w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-xl transition-all duration-300
          ${reminded
            ? "bg-green-500 text-white"
            : "bg-[#3525d7] hover:bg-[#2a1fb0] text-white"
          }`}
      >
        {reminded ? <FiCheck size={13} /> : <FiBell size={13} />}
        {reminded ? "Reminder Set!" : "Set Reminder"}
      </button>

    </div>
  )
}

export default UpcomingQuiz