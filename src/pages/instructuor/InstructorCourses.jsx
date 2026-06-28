import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FiSearch, FiPlus, FiEdit2, FiUpload, FiUsers, FiStar } from "react-icons/fi"
import { getInstructorCourses, publishCourse } from "../../services/course.service"

const StatusBadge = ({ status }) => (
  <span
    className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
      status === "published"
        ? "bg-emerald-50 text-emerald-600"
        : "bg-gray-100 text-gray-500"
    }`}
  >
    {status}
  </span>
)

const InstructorCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [error, setError] = useState("")

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const res = await getInstructorCourses()
      setCourses(res.data)
    } catch (err) {
      setError(err.message || "Failed to load courses")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handlePublish = async (courseId) => {
    try {
      await publishCourse(courseId)
      fetchCourses()
    } catch (err) {
      setError(err.message || "Failed to publish course")
    }
  }

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === "All" ||
      (filter === "Published" && course.status === "published") ||
      (filter === "Draft" && course.status === "draft")
    return matchesSearch && matchesFilter
  })

  const totalEnrollment = courses.reduce((sum, c) => sum + (c.studentsCount || 0), 0)
  const publishedCount = courses.filter((c) => c.status === "published").length

  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Courses</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage, edit, and track all your courses</p>
        </div>
        <Link to="/instructordashboard/create-course">
          <button className="flex items-center gap-2 bg-indigo-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition cursor-pointer whitespace-nowrap">
            <FiPlus /> Create New Course
          </button>
        </Link>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <p className="text-[11px] sm:text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Total Courses</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{courses.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <p className="text-[11px] sm:text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Published</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{publishedCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <p className="text-[11px] sm:text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Total Enrolled</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalEnrollment.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your courses..."
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            {["All", "Published", "Draft"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition cursor-pointer ${
                  filter === tab ? "bg-indigo-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm">Loading your courses...</div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">No courses found.</div>
        ) : (
          <div className="flex flex-col divide-y divide-gray-50">
            {filteredCourses.map((course) => (
              <div key={course._id} className="flex flex-col sm:flex-row sm:items-center gap-4 py-4">
                <img
                  src={course.thumbnail?.url || "https://via.placeholder.com/120x120?text=Course"}
                  alt={course.title}
                  className="w-full sm:w-16 h-32 sm:h-16 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{course.title}</h3>
                    <StatusBadge status={course.status} />
                  </div>
                  <p className="text-xs text-gray-400">{course.category}</p>
                </div>

                <div className="flex items-center gap-5 text-sm text-gray-600 flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <FiUsers className="text-gray-400" size={14} />
                    {(course.studentsCount || 0).toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FiStar className="text-amber-400" size={14} />
                    {course.averageRating > 0 ? course.averageRating.toFixed(1) : "—"}
                  </div>
                  <div className="font-medium text-gray-900 w-16 text-right">
                    ${course.price?.toLocaleString() || 0}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {course.status === "draft" && (
                    <button
                      onClick={() => handlePublish(course._id)}
                      title="Publish"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition cursor-pointer"
                    >
                      <FiUpload size={13} /> Publish
                    </button>
                  )}
                  <button
                    title="Edit"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-indigo-600 transition cursor-pointer"
                  >
                    <FiEdit2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default InstructorCourses