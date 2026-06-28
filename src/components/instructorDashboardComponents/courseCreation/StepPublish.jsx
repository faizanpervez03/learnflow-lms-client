import React, { useState } from "react"
import { FiAlertCircle, FiCheckCircle, FiEye } from "react-icons/fi"
import { publishCourse } from "../../../services/course.service"

const StepPublish = ({ course, onBack, onPublished }) => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const totalLessons = course.curriculum?.reduce((sum, s) => sum + s.lessons.length, 0) || 0
  const sectionsWithoutLessons = course.curriculum?.some((s) => s.lessons.length === 0)

  const checklist = [
    { label: "Course thumbnail uploaded", done: !!course.thumbnail },
    { label: "Curriculum complete", done: course.curriculum?.length > 0 && !sectionsWithoutLessons },
    { label: "Pricing configured", done: course.pricing?.type === "free" || course.pricing?.amount > 0 },
  ]

  const readiness = Math.round((checklist.filter((c) => c.done).length / checklist.length) * 100)
  const canPublish = checklist.every((c) => c.done)

  const handlePublish = async () => {
    setError("")
    setLoading(true)
    try {
      await publishCourse(course._id)
      onPublished()
    } catch (err) {
      setError(err.message || "Failed to publish course")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-44 h-28 rounded-xl bg-gray-100 overflow-hidden shrink-0">
            {course.thumbnail && <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />}
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-indigo-600 uppercase">{course.level}</span>
            <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
            <p className="text-sm text-gray-400">{course.subtitle}</p>
            <div className="flex gap-5 mt-2 text-xs text-gray-500">
              <span><span className="font-semibold text-gray-700">Category:</span> {course.category}</span>
              <span><span className="font-semibold text-gray-700">Price:</span> {course.pricing?.type === "free" ? "Free" : `${course.pricing?.currency} ${course.pricing?.amount}`}</span>
              <span><span className="font-semibold text-gray-700">Curriculum:</span> {totalLessons} Lessons</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3">
          <h4 className="text-sm font-bold text-gray-900">Ready to Go?</h4>
          {checklist.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm">
              {item.done ? (
                <FiCheckCircle className="text-green-500 shrink-0" size={16} />
              ) : (
                <FiAlertCircle className="text-amber-500 shrink-0" size={16} />
              )}
              <span className={item.done ? "text-gray-700" : "text-gray-400"}>{item.label}</span>
            </div>
          ))}
          <div className="mt-1">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Publish Readiness</span>
              <span>{readiness}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 transition-all" style={{ width: `${readiness}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-indigo-800">
          Once published, your course will be available for purchase in the marketplace immediately.
        </p>
        <div className="flex gap-3 shrink-0">
          <button type="button" className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-white transition cursor-pointer">
            <FiEye size={14} /> Preview Course
          </button>
          <button
            type="button"
            disabled={!canPublish || loading}
            onClick={handlePublish}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Publishing..." : "Publish Course"}
          </button>
        </div>
      </div>

      <div className="flex justify-between pt-1">
        <button type="button" onClick={onBack} className="text-sm font-medium text-gray-600 hover:underline cursor-pointer">
          ← Back to Pricing
        </button>
      </div>
    </div>
  )
}

export default StepPublish