import React from "react"
import { FiArrowRight } from "react-icons/fi"

const courses = [
  {
    title: "Web Dev Masterclass",
    instructor: "Instructor: Sarah Chen",
    progress: 83,
    color: "from-blue-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format",
  },
  {
    title: "Product Strategy 101",
    instructor: "Instructor: Marcus Thomas",
    progress: 48,
    color: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format",
  },
  {
    title: "UX Research Fundamentals",
    instructor: "Instructor: Elena Rodriguez",
    progress: 29,
    color: "from-teal-400 to-cyan-500",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&auto=format",
  },
]

const EnrolledCourses = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-gray-900">My Enrolled Courses</h2>
        <button className="flex items-center gap-1 text-xs font-semibold text-[#3525d7] hover:underline transition">
          View All <FiArrowRight size={13} />
        </button>
      </div>

      {/* Course cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300 cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="relative h-32 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-60`} />
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col gap-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900 leading-snug">{course.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{course.instructor}</p>
              </div>

              {/* Progress */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Progress</span>
                  <span className="text-xs font-bold text-[#3525d7]">{course.progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#3525d7] rounded-full transition-all duration-700"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default EnrolledCourses