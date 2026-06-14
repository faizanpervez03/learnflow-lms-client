import React from "react"
import { FiPlay, FiInfo } from "react-icons/fi"

const ContinueLearning = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

      {/* Section heading */}
      <h2 className="text-base font-bold text-gray-900 mb-4">Continue Learning</h2>

      {/* Course card */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-900 min-h-[180px] flex flex-col justify-between p-5">

        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610018556010-6a11691bc905?w=800&auto=format')" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-3">

          {/* Badge */}
          <span className="self-start bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
            COURSE IN PROGRESS
          </span>

          {/* Title */}
          <h3 className="text-white text-xl font-extrabold leading-snug max-w-xs">
            Advanced UI Design
          </h3>

        </div>

        {/* Bottom row — progress + buttons */}
        <div className="relative z-10 flex flex-col gap-3 mt-6">

          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: "65%" }} />
            </div>
            <span className="text-white text-xs font-bold">65%</span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#3525d7] hover:bg-[#2a1fb0] transition text-white text-sm font-semibold px-5 py-2.5 rounded-xl">
              <FiPlay size={14} />
              Resume Lesson
            </button>
            <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition text-white text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/30">
              <FiInfo size={14} />
              Details
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ContinueLearning