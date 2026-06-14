import React, { useState } from "react"
import { FiSearch, FiStar, FiUser } from "react-icons/fi"

const categories = ["All Categories", "Design", "Development", "Business", "Marketing", "Photography", "Music"]

const courses = [
  {
    id: 1,
    title: "Mastering Advanced UI/UX Design",
    instructor: "Marcus Holloway",
    rating: 4.8,
    reviews: "1.2k",
    price: 49,
    badge: "BESTSELLER",
    badgeColor: "bg-yellow-400 text-yellow-900",
    category: "Design",
    image: "https://images.unsplash.com/photo-1610018556010-6a11691bc905?w=400&auto=format",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Full-Stack Web Dev with Next.js 14",
    instructor: "Jordan Jenkins",
    rating: 4.7,
    reviews: "984",
    price: 64,
    badge: "NEW",
    badgeColor: "bg-green-400 text-green-900",
    category: "Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Growth Strategies for Modern SaaS",
    instructor: "Paula Chen",
    rating: 4.7,
    reviews: "741",
    price: null,
    badge: null,
    category: "Business",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format",
    color: "from-teal-400 to-cyan-500",
  },
  {
    id: 4,
    title: "Digital Marketing & Social Media 2024",
    instructor: "Trevor Rodriguez",
    rating: 4.6,
    reviews: "1.8k",
    price: 39,
    badge: "BESTSELLER",
    badgeColor: "bg-yellow-400 text-yellow-900",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&auto=format",
    color: "from-orange-400 to-red-500",
  },
  {
    id: 5,
    title: "Cybersecurity Fundamentals & Ethical Hacking",
    instructor: "Julian Salazar",
    rating: 4.9,
    reviews: "2.1k",
    price: 55,
    badge: "HOT",
    badgeColor: "bg-red-400 text-white",
    category: "Development",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&auto=format",
    color: "from-gray-700 to-gray-900",
  },
  {
    id: 6,
    title: "Brand Identity & Logo Design Masterclass",
    instructor: "Sofia Martins",
    rating: 4.8,
    reviews: "653",
    price: 44,
    badge: null,
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&auto=format",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: 7,
    title: "Python for Data Science & Machine Learning",
    instructor: "Alex Kim",
    rating: 4.9,
    reviews: "3.4k",
    price: 79,
    badge: "BESTSELLER",
    badgeColor: "bg-yellow-400 text-yellow-900",
    category: "Development",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&auto=format",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 8,
    title: "Photography Masterclass: Zero to Hero",
    instructor: "Nina Patel",
    rating: 4.7,
    reviews: "891",
    price: 34,
    badge: "NEW",
    badgeColor: "bg-green-400 text-green-900",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format",
    color: "from-amber-400 to-orange-500",
  },
]

const sortOptions = ["Newest", "Most Popular", "Highest Rated", "Price: Low to High", "Price: High to Low"]

const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("Newest")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = courses.filter(c => {
    const matchCategory = activeCategory === "All Categories" || c.category === activeCategory
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="min-h-screen bg-white">

      {/* Page header */}
      <div className="border-b border-gray-100 px-6 md:px-16 py-8 bg-white">
        <h1 className="text-2xl font-extrabold text-gray-900">Explore Courses</h1>
        <p className="text-sm text-gray-400 mt-1">
          Discover your next skill from 1,000+ world-class courses.
        </p>
      </div>

      <div className="px-6 md:px-16 py-8">

        {/* Filters row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">

          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200
                  ${activeCategory === cat
                    ? "bg-[#3525d7] text-white shadow-md shadow-indigo-200"
                    : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-[#3525d7]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort + Search */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <FiSearch size={14} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-40"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 hidden md:block">Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-xs font-semibold text-gray-700 border border-gray-200 rounded-xl px-3 py-2 outline-none bg-white cursor-pointer hover:border-[#3525d7] transition"
              >
                {sortOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Course grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">
            No courses found. Try a different search or category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(course => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-50`} />
                  {course.badge && (
                    <span className={`absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <FiUser size={11} />
                    <span>{course.instructor}</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs">
                    <FiStar size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-800">{course.rating}</span>
                    <span className="text-gray-400">({course.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <span className="text-base font-extrabold text-[#3525d7]">
                      {course.price ? `$${course.price}` : "Free"}
                    </span>
                    <button className="text-xs font-semibold bg-indigo-50 text-[#3525d7] px-3 py-1.5 rounded-xl hover:bg-[#3525d7] hover:text-white transition-all duration-200">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer row */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-10 gap-4">
          <p className="text-xs text-gray-400">
            Showing 1 to {filtered.length} of 1,000+ results
          </p>

          {/* Pagination */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#3525d7] hover:text-[#3525d7] transition text-xs"
            >
              ‹
            </button>
            {[1, 2, 3, "...", 10].map((p, i) => (
              <button
                key={i}
                onClick={() => typeof p === "number" && setCurrentPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition
                  ${currentPage === p
                    ? "bg-[#3525d7] text-white"
                    : "border border-gray-200 text-gray-500 hover:border-[#3525d7] hover:text-[#3525d7]"
                  }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#3525d7] hover:text-[#3525d7] transition text-xs"
            >
              ›
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Catalog