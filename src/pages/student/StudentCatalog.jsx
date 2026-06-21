import React, { useEffect, useMemo, useState } from "react"
import { FiSearch, FiStar, FiUser } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { getCourses } from "../../services/course.service"

const categories = ["All Categories", "Design", "Development", "Business", "Marketing", "Photography", "Music", "Data Science"]
const sortOptions = ["Newest", "Most Popular", "Highest Rated", "Price: Low to High", "Price: High to Low"]

const getInstructorName = (course) => {
  if (typeof course.instructor === "string") return course.instructor
  return course.instructor?.name || "LearnFlow Instructor"
}

const getThumbnail = (course) => {
  return course.thumbnail?.url || course.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format"
}

const formatReviews = (reviewsCount = 0) => {
  if (reviewsCount >= 1000) return `${(reviewsCount / 1000).toFixed(1)}k`
  return String(reviewsCount)
}

const StudentCatalog = () => {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("Newest")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let ignore = false

    const loadCourses = async () => {
      setIsLoading(true)
      setError("")

      try {
        const response = await getCourses({
          category: activeCategory,
          search,
          sortBy,
          page: currentPage,
        })

        if (!ignore) {
            setCourses(Array.isArray(response.data) ? response.data : [])
        }
      } catch (err) {
        if (!ignore) {
          setError("Unable to load courses from the server.")
          setCourses([])
        }
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    loadCourses()

    return () => {
      ignore = true
    }
  }, [activeCategory, search, sortBy, currentPage])

  const visibleCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = activeCategory === "All Categories" || course.category === activeCategory
      const value = `${course.title} ${getInstructorName(course)}`.toLowerCase()
      const matchesSearch = value.includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, courses, search])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Explore Courses</h1>
          <p className="text-sm text-gray-400 mt-1">Discover your next skill from world-class courses.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat)
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#3525d7] text-white shadow-md shadow-indigo-200"
                  : "text-gray-500 hover:bg-indigo-50 hover:text-[#3525d7]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
            <FiSearch size={14} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setCurrentPage(1)
              }}
              className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-40"
            />
          </div>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="text-xs font-semibold text-gray-700 border border-gray-200 rounded-xl px-3 py-2 outline-none bg-white cursor-pointer hover:border-[#3525d7] transition"
          >
            {sortOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-xs font-semibold text-yellow-700">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center text-sm text-gray-400">
          Loading courses...
        </div>
      ) : visibleCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center text-sm text-gray-400">
          No courses found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {visibleCourses.map((course) => (
            <div
              key={course._id || course.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={getThumbnail(course)}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-indigo-600 opacity-40" />
              </div>

              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
                  {course.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <FiUser size={11} />
                  <span>{getInstructorName(course)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <FiStar size={11} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-800">{course.averageRating || course.rating || 0}</span>
                  <span className="text-gray-400">({formatReviews(course.reviewsCount || course.reviews || 0)})</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-base font-extrabold text-[#3525d7]">
                    {course.price > 0 ? `$${course.price}` : "Free"}
                  </span>
                  <button
                    onClick={() => navigate(`/studentdashboard/lesson/${course._id || course.id}`)}
                    className="text-xs font-semibold bg-indigo-50 text-[#3525d7] px-3 py-1.5 rounded-xl hover:bg-[#3525d7] hover:text-white transition-all duration-200"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-400">Showing {visibleCourses.length} courses</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            className="w-16 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#3525d7] hover:text-[#3525d7] transition text-xs"
          >
            Prev
          </button>
          <span className="text-xs font-semibold text-gray-500">Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage((page) => page + 1)}
            className="w-16 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#3525d7] hover:text-[#3525d7] transition text-xs"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentCatalog
