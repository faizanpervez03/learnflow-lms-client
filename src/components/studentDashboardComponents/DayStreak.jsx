import React from "react"

const days = ["M", "T", "W", "T", "F", "S", "S"]
const completedDays = 4

const DayStreak = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-gray-900">Day Streak</span>
        <span className="text-2xl">🔥</span>
      </div>

      {/* Streak count */}
      <p className="text-3xl font-extrabold text-[#3525d7]">{completedDays}</p>
      <p className="text-xs text-gray-400 mt-1">You're on fire! Keep your streak alive.</p>

      {/* Days row */}
      <div className="flex items-center justify-between mt-4">
        {days.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
              ${i < completedDays
                ? "bg-[#3525d7] text-white shadow-md shadow-indigo-200"
                : "bg-gray-100 text-gray-400"
              }`}
            >
              {i < completedDays ? "✓" : ""}
            </div>
            <span className="text-[10px] text-gray-400">{day}</span>
          </div>
        ))}
      </div>

    </div>
  )
}

export default DayStreak