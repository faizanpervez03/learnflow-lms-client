import React from "react"
import { FiEdit2 } from "react-icons/fi"

const recentCourses = [
  {
    title: "Advanced UI Design Principles",
    updated: "2 days ago",
    enrollment: 842,
    rating: 4.9,
    status: "Published",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=80&h=80&fit=crop",
  },
  {
    title: "React Mastery 2024",
    updated: "1 week ago",
    enrollment: 324,
    rating: 4.8,
    status: "Published",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&h=80&fit=crop",
  },
  {
    title: "Design Systems for Scale",
    updated: "Working draft",
    enrollment: 0,
    rating: null,
    status: "Draft",
    thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=80&h=80&fit=crop",
  },
]

const RecentCourses = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 overflow-x-auto">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-900">Recent Courses</h2>
        <a href="#" className="text-sm text-indigo-600 font-medium hover:underline">View All Courses</a>
      </div>

      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="text-left text-gray-400 text-[11px] uppercase tracking-wide border-b border-gray-100">
            <th className="pb-3 font-medium">Course Title</th>
            <th className="pb-3 font-medium">Enrollment</th>
            <th className="pb-3 font-medium">Rating</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentCourses.map((course, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0">
              <td className="py-3.5">
                <div className="flex items-center gap-3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-11 h-11 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{course.title}</p>
                    <p className="text-xs text-gray-400">{course.updated}</p>
                  </div>
                </div>
              </td>
              <td className="py-3.5 text-gray-700">{course.enrollment.toLocaleString()}</td>
              <td className="py-3.5 text-gray-700">
                {course.rating ? (
                  <span className="flex items-center gap-1">
                    <span className="text-amber-400">★</span> {course.rating}
                  </span>
                ) : "—"}
              </td>
              <td className="py-3.5">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  course.status === "Published"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {course.status}
                </span>
              </td>
              <td className="py-3.5 text-right">
                <button className="text-gray-400 hover:text-indigo-600 transition cursor-pointer">
                  <FiEdit2 size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentCourses