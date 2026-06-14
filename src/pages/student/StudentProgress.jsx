import React, { useState } from "react"
import {
  RiBookOpenLine,
  RiCheckboxCircleLine,
  RiFileListLine,
  RiAwardLine,
  RiDownloadLine,
  RiArrowRightLine,
  RiSearchLine,
  RiCircleFill,
} from "react-icons/ri"
import {    
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

const stats = [
  { label: "Courses Enrolled", value: 12, icon: RiBookOpenLine,       color: "bg-indigo-50 text-[#3525d7]" },
  { label: "Completed",        value: 4,  icon: RiCheckboxCircleLine, color: "bg-green-50 text-green-600"  },
  { label: "Quizzes Taken",    value: 15, icon: RiFileListLine,       color: "bg-blue-50 text-blue-600"    },
  { label: "Certificates",     value: 3,  icon: RiAwardLine,          color: "bg-purple-50 text-purple-600"},
]

const weeklyData = [
  { day: "Mon", hours: 5.0 },
  { day: "Tue", hours: 2.0 },
  { day: "Wed", hours: 4.5 },
  { day: "Thu", hours: 1.5 },
  { day: "Fri", hours: 5.0 },
  { day: "Sat", hours: 3.0 },
  { day: "Sun", hours: 2.5 },
]

const courses = [
  {
    title: "Advanced Figma Systems",
    lessons: "12 of 18 lessons completed",
    progress: 65,
    image: "https://images.unsplash.com/photo-1610018556010-6a11691bc905?w=80&auto=format",
    color: "from-purple-500 to-indigo-600",
  },
  {
    title: "Python for Data Science",
    lessons: "4 of 26 lessons completed",
    progress: 15,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=80&auto=format",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Marketing Strategy 101",
    lessons: "22 of 25 lessons completed",
    progress: 88,
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=80&auto=format",
    color: "from-orange-400 to-red-500",
  },
]

const ACTIVE_DAY = "Fri"

const StudentProgress = () => {
  const [search, setSearch] = useState("")

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Learning Progress</h1>
          <p className="text-sm text-gray-400 mt-1">Track your academic milestones and daily study habits.</p>
        </div>
        <button className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:border-[#3525d7] hover:text-[#3525d7] transition text-xs font-semibold px-4 py-2 rounded-xl">
          <RiDownloadLine size={14} /> Report
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wide font-semibold">{s.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Chart + Current Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Weekly Study Hours chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-gray-900">Weekly Study Hours</h2>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <RiCircleFill size={8} className="text-[#3525d7]" /> Daily Hours
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData} barSize={28} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "12px" }}
                formatter={(val) => [`${val}h`, "Study Hours"]}
              />
              <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                {weeklyData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.day === ACTIVE_DAY ? "#3525d7" : "#e0e7ff"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Current Focus card */}
        <div className="bg-[#3525d7] rounded-2xl p-6 flex flex-col gap-5">
          <h2 className="text-sm font-bold text-white">Current Focus</h2>

          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-sm font-bold text-white leading-snug">
              Advanced UI Development with React & Tailwind
            </p>
          </div>

          {/* Course goal progress */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-indigo-200 font-semibold">Course Goal</span>
              <span className="text-xs font-extrabold text-white">78%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: "78%" }} />
            </div>
          </div>

          {/* Next session */}
          <div className="bg-white/10 rounded-xl px-4 py-3">
            <p className="text-xs text-indigo-200">Next session:</p>
            <p className="text-xs font-bold text-white mt-0.5">Tomorrow at 10:00 AM</p>
          </div>

          {/* CTA */}
          <button className="mt-auto w-full bg-white text-[#3525d7] font-bold text-sm py-3 rounded-xl hover:bg-indigo-50 transition">
            Start Learning
          </button>
        </div>

      </div>

      {/* Ongoing Courses */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-bold text-gray-900">Ongoing Courses</h2>
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
            <RiSearchLine size={13} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-xs text-gray-600 placeholder-gray-400 outline-none w-32"
            />
          </div>
        </div>

        {/* Course list */}
        <div className="flex flex-col gap-4">
          {filtered.map((course, i) => (
            <div key={i} className="flex items-center gap-4">

              {/* Thumbnail */}
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-60`} />
              </div>

              {/* Info + Progress */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{course.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{course.lessons}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#3525d7] rounded-full transition-all duration-700"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#3525d7] shrink-0">{course.progress}%</span>
                </div>
              </div>

              {/* Continue button */}
              <button className="shrink-0 bg-[#3525d7] hover:bg-[#2a1fb0] transition text-white text-xs font-bold px-4 py-2 rounded-xl">
                Continue
              </button>

            </div>
          ))}
        </div>

        {/* View all */}
        <button className="mt-5 w-full flex items-center justify-center gap-1.5 text-xs font-bold text-[#3525d7] hover:underline transition pt-4 border-t border-gray-100">
          View All 12 Courses <RiArrowRightLine size={13} />
        </button>

      </div>

    </div>
  )
}

export default StudentProgress