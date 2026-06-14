import React, { useState } from "react"
import {
  RiBookOpenLine,
  RiTimeLine,
  RiArrowRightLine,
  RiSearchLine,
  RiFilterLine,
  RiPlayCircleLine,
  RiCheckboxCircleLine,
  RiProgress3Line,
  RiStarFill,
  RiGridFill,
  RiListCheck,
} from "react-icons/ri"

const tabs = ["All Courses", "In Progress", "Completed", "Bookmarked"]

const courses = [
  {
    id: 1,
    title: "Advanced UI/UX Design",
    instructor: "Sarah Chen",
    category: "Design",
    progress: 65,
    status: "in-progress",
    lessons: 42,
    completedLessons: 27,
    duration: "18h 30m",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1610018556010-6a11691bc905?w=400&auto=format",
    color: "from-purple-500 to-indigo-600",
    lastAccessed: "2 hours ago",
    bookmarked: true,
  },
  {
    id: 2,
    title: "Full-Stack Web Dev with Next.js 14",
    instructor: "Jordan Jenkins",
    category: "Development",
    progress: 38,
    status: "in-progress",
    lessons: 68,
    completedLessons: 26,
    duration: "32h 15m",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format",
    color: "from-blue-500 to-cyan-500",
    lastAccessed: "Yesterday",
    bookmarked: false,
  },
  {
    id: 3,
    title: "Product Strategy 101",
    instructor: "Marcus Thomas",
    category: "Business",
    progress: 100,
    status: "completed",
    lessons: 30,
    completedLessons: 30,
    duration: "12h 00m",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format",
    color: "from-green-500 to-teal-500",
    lastAccessed: "3 days ago",
    bookmarked: false,
  },
  {
    id: 4,
    title: "UX Research Fundamentals",
    instructor: "Elena Rodriguez",
    category: "Design",
    progress: 20,
    status: "in-progress",
    lessons: 25,
    completedLessons: 5,
    duration: "9h 45m",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&auto=format",
    color: "from-pink-500 to-rose-500",
    lastAccessed: "5 days ago",
    bookmarked: true,
  },
  {
    id: 5,
    title: "Python for Data Science",
    instructor: "Alex Kim",
    category: "Data Science",
    progress: 100,
    status: "completed",
    lessons: 55,
    completedLessons: 55,
    duration: "24h 00m",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&auto=format",
    color: "from-yellow-500 to-orange-500",
    lastAccessed: "1 week ago",
    bookmarked: false,
  },
  {
    id: 6,
    title: "Digital Marketing Masterclass",
    instructor: "Trevor Rodriguez",
    category: "Marketing",
    progress: 55,
    status: "in-progress",
    lessons: 38,
    completedLessons: 21,
    duration: "15h 20m",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&auto=format",
    color: "from-orange-400 to-red-500",
    lastAccessed: "3 days ago",
    bookmarked: true,
  },
]

const statusColor = {
  "in-progress": "bg-blue-50 text-blue-600",
  "completed": "bg-green-50 text-green-600",
}

const statusLabel = {
  "in-progress": "In Progress",
  "completed": "Completed",
}

const StudentMyCourses = () => {
  const [activeTab, setActiveTab] = useState("All Courses")
  const [search, setSearch] = useState("")
  const [view, setView] = useState("grid")

  const filtered = courses.filter(c => {
    const matchTab =
      activeTab === "All Courses" ? true :
      activeTab === "In Progress" ? c.status === "in-progress" :
      activeTab === "Completed" ? c.status === "completed" :
      activeTab === "Bookmarked" ? c.bookmarked : true

    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase())

    return matchTab && matchSearch
  })

  const total = courses.length
  const completed = courses.filter(c => c.status === "completed").length
  const inProgress = courses.filter(c => c.status === "in-progress").length
  const avgProgress = Math.round(courses.reduce((a, c) => a + c.progress, 0) / total)

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">My Courses</h1>
          <p className="text-sm text-gray-400 mt-1">Track and continue your learning journey.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#3525d7] hover:bg-[#2a1fb0] transition text-white text-sm font-semibold px-5 py-2.5 rounded-xl self-start sm:self-auto shadow-md shadow-indigo-200">
          <RiBookOpenLine size={16} />
          Browse More Courses
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Enrolled",   value: total,       icon: RiBookOpenLine,        color: "bg-indigo-50 text-[#3525d7]" },
          { label: "In Progress",      value: inProgress,  icon: RiProgress3Line,       color: "bg-blue-50 text-blue-600"    },
          { label: "Completed",        value: completed,   icon: RiCheckboxCircleLine,  color: "bg-green-50 text-green-600"  },
          { label: "Avg. Progress",    value: `${avgProgress}%`, icon: RiTimeLine,      color: "bg-purple-50 text-purple-600"},
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters row */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        {/* Tabs */}
        <div className="flex items-center gap-1 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200
                ${activeTab === tab
                  ? "bg-[#3525d7] text-white shadow-md shadow-indigo-200"
                  : "text-gray-500 hover:bg-indigo-50 hover:text-[#3525d7]"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search + view toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
            <RiSearchLine size={14} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-36"
            />
          </div>

          {/* Grid / List toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 rounded-lg transition ${view === "grid" ? "bg-white shadow-sm text-[#3525d7]" : "text-gray-400"}`}
            >
              <RiGridFill size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-1.5 rounded-lg transition ${view === "list" ? "bg-white shadow-sm text-[#3525d7]" : "text-gray-400"}`}
            >
              <RiListCheck size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 flex flex-col items-center gap-3 text-center">
          <RiBookOpenLine size={40} className="text-gray-200" />
          <p className="text-sm font-bold text-gray-400">No courses found</p>
          <p className="text-xs text-gray-300">Try a different filter or search term.</p>
        </div>
      )}

      {/* Grid view */}
      {view === "grid" && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(course => (
            <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 group cursor-pointer flex flex-col">

              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden shrink-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-60`} />

                {/* Status badge */}
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full
                  ${course.status === "completed" ? "bg-green-500 text-white" : "bg-white/20 backdrop-blur-sm text-white border border-white/30"}`}>
                  {statusLabel[course.status]}
                </span>

                {/* Play button */}
                {course.status !== "completed" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <RiPlayCircleLine size={24} className="text-[#3525d7]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">

                {/* Category */}
                <span className="text-[10px] font-bold text-[#3525d7] uppercase tracking-wider">{course.category}</span>

                {/* Title */}
                <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">{course.title}</h3>

                {/* Instructor + rating */}
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">{course.instructor}</p>
                  <div className="flex items-center gap-1">
                    <RiStarFill size={11} className="text-yellow-400" />
                    <span className="text-xs font-bold text-gray-700">{course.rating}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="flex flex-col gap-1.5 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{course.completedLessons}/{course.lessons} lessons</span>
                    <span className="text-xs font-bold text-[#3525d7]">{course.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700
                        ${course.status === "completed" ? "bg-green-500" : "bg-[#3525d7]"}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-1">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <RiTimeLine size={12} /> {course.duration}
                  </span>
                  <button className={`flex items-center gap-1 text-xs font-bold transition
                    ${course.status === "completed" ? "text-green-600 hover:text-green-700" : "text-[#3525d7] hover:text-[#2a1fb0]"}`}>
                    {course.status === "completed" ? "Review" : "Continue"}
                    <RiArrowRightLine size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List view */}
      {view === "list" && filtered.length > 0 && (
        <div className="flex flex-col gap-3">
          {filtered.map(course => (
            <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-5 hover:shadow-md transition-shadow duration-300 cursor-pointer group">

              {/* Thumbnail */}
              <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-50`} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-[#3525d7] uppercase tracking-wider">{course.category}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor[course.status]}`}>
                    {statusLabel[course.status]}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 truncate">{course.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{course.instructor} · {course.duration}</p>
              </div>

              {/* Progress */}
              <div className="hidden sm:flex flex-col gap-1.5 w-36 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{course.progress}%</span>
                  <span className="text-xs text-gray-400">{course.completedLessons}/{course.lessons}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${course.status === "completed" ? "bg-green-500" : "bg-[#3525d7]"}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* CTA */}
              <button className={`shrink-0 flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition
                ${course.status === "completed"
                  ? "bg-green-50 text-green-600 hover:bg-green-100"
                  : "bg-indigo-50 text-[#3525d7] hover:bg-[#3525d7] hover:text-white"}`}>
                {course.status === "completed" ? "Review" : "Continue"}
                <RiArrowRightLine size={13} />
              </button>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default StudentMyCourses