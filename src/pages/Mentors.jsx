import React, { useState } from "react"
import {
  RiSearchLine,
  RiStarFill,
  RiFilterLine,
  RiMapPinLine,
  RiTimeLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "react-icons/ri"

const expertiseOptions = ["All Expertise", "UI/UX Design", "Development", "Data Science", "Marketing", "Product", "DevOps"]
const sortOptions = ["Recommended", "Highest Rated", "Most Sessions", "Newest"]

const mentors = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior UX Designer at Google",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    sessions: 241,
    location: "San Francisco, USA",
    tags: ["Design", "UX Research", "Figma"],
    expertise: "UI/UX Design",
    available: true,
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Principal Engineer at Adobe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    sessions: 183,
    location: "New York, USA",
    tags: ["React", "Node.js", "AWS"],
    expertise: "Development",
    available: true,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Head of Product at Notion",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.9,
    sessions: 312,
    location: "London, UK",
    tags: ["Product", "Strategy", "Growth"],
    expertise: "Product",
    available: false,
  },
  {
    id: 4,
    name: "David Park",
    role: "Data Lead at Stripe",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 4.7,
    sessions: 156,
    location: "Seoul, South Korea",
    tags: ["Python", "ML", "Analytics"],
    expertise: "Data Science",
    available: true,
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Marketing Director at Hubspot",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 4.7,
    sessions: 98,
    location: "Boston, USA",
    tags: ["SEO", "Content", "Branding"],
    expertise: "Marketing",
    available: true,
  },
  {
    id: 6,
    name: "Priya Sharma",
    role: "Senior iOS Dev at Apple",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    rating: 4.8,
    sessions: 207,
    location: "Bangalore, India",
    tags: ["Swift", "iOS", "Mobile"],
    expertise: "Development",
    available: true,
  },
  {
    id: 7,
    name: "Ethan Thompson",
    role: "Cloud Architect at Amazon",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    rating: 4.6,
    sessions: 134,
    location: "Seattle, USA",
    tags: ["AWS", "Docker", "Kubernetes"],
    expertise: "DevOps",
    available: false,
  },
  {
    id: 8,
    name: "Sarah Jenkins",
    role: "Product Designer at Figma",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    rating: 4.9,
    sessions: 289,
    location: "Amsterdam, NL",
    tags: ["Figma", "Design Systems", "UI"],
    expertise: "UI/UX Design",
    available: true,
  },
  {
    id: 9,
    name: "Daniel Miller",
    role: "Engineering Manager at Uber",
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
    rating: 4.7,
    sessions: 171,
    location: "Chicago, USA",
    tags: ["Leadership", "Backend", "Go"],
    expertise: "Development",
    available: true,
  },
  {
    id: 10,
    name: "Lisa Wang",
    role: "UX Researcher at Microsoft",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
    rating: 4.8,
    sessions: 145,
    location: "Toronto, Canada",
    tags: ["Research", "Testing", "UX"],
    expertise: "UI/UX Design",
    available: true,
  },
  {
    id: 11,
    name: "Robert Chen",
    role: "Data Scientist at Netflix",
    avatar: "https://randomuser.me/api/portraits/men/88.jpg",
    rating: 4.6,
    sessions: 119,
    location: "Los Angeles, USA",
    tags: ["Python", "NLP", "TensorFlow"],
    expertise: "Data Science",
    available: false,
  },
  {
    id: 12,
    name: "Michelle Lee",
    role: "Growth Manager at Airbnb",
    avatar: "https://randomuser.me/api/portraits/women/38.jpg",
    rating: 4.9,
    sessions: 263,
    location: "Singapore",
    tags: ["Growth", "Analytics", "A/B Test"],
    expertise: "Marketing",
    available: true,
  },
]

const CARDS_PER_PAGE = 8

const Mentors = () => {
  const [search, setSearch] = useState("")
  const [expertise, setExpertise] = useState("All Expertise")
  const [sort, setSort] = useState("Recommended")
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = mentors.filter(m => {
    const matchExpertise = expertise === "All Expertise" || m.expertise === expertise
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchExpertise && matchSearch
  })

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE)

  const handleSearch = (val) => { setSearch(val); setPage(1) }
  const handleExpertise = (val) => { setExpertise(val); setPage(1) }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="bg-[#f0effa] px-6 md:px-16 pt-16 pb-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Find Your Mentor
          </h1>
          <p className="text-gray-500 text-base max-w-lg leading-relaxed mb-8">
            Connect with top industry experts for 1-on-1 career guidance and technical deep-dives to accelerate your professional growth.
          </p>

          {/* Search + filters row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

            {/* Search */}
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-gray-200 shadow-sm flex-1 max-w-md">
              <RiSearchLine size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by name, title, or category..."
                value={search}
                onChange={e => handleSearch(e.target.value)}
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
            </div>

            {/* Expertise filter */}
            <select
              value={expertise}
              onChange={e => handleExpertise(e.target.value)}
              className="cursor-pointer text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none hover:border-[#3525d7] transition shadow-sm"
            >
              {expertiseOptions.map(o => <option key={o}>{o}</option>)}
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="cursor-pointer text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none hover:border-[#3525d7] transition shadow-sm"
            >
              {sortOptions.map(o => <option key={o}>{o}</option>)}
            </select>

            {/* Filter button */}
            <button
              onClick={() => setFiltersOpen(o => !o)}
              className="cursor-pointer flex items-center gap-2 bg-white border border-gray-200 hover:border-[#3525d7] hover:text-[#3525d7] text-gray-600 text-sm font-semibold px-4 py-3 rounded-xl transition shadow-sm"
            >
              <RiFilterLine size={16} /> Filters
            </button>

          </div>
        </div>
      </section>

      {/* ── Mentors grid ── */}
      <section className="px-6 md:px-16 py-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">

          {/* Results count */}
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900">{filtered.length}</span> of{" "}
            <span className="font-bold text-gray-900">{mentors.length}</span> expert mentors
          </p>

          {/* Empty state */}
          {paginated.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-sm">
              No mentors found. Try a different search or filter.
            </div>
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginated.map(mentor => (
              <div
                key={mentor.id}
                className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Avatar + rating */}
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white
                      ${mentor.available ? "bg-green-500" : "bg-gray-300"}`}
                    />
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <RiStarFill size={12} className="text-yellow-400" />
                    <span className="text-xs font-extrabold text-gray-800">{mentor.rating}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-extrabold text-gray-900">{mentor.name}</h3>
                  <p className="text-xs text-gray-400 leading-snug">{mentor.role}</p>
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <RiMapPinLine size={12} className="shrink-0" />
                    <span>{mentor.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <RiTimeLine size={12} className="shrink-0" />
                    <span>{mentor.sessions} sessions completed</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {mentor.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-semibold bg-indigo-50 text-[#3525d7] px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 mt-auto">
                  <button
                    disabled={!mentor.available}
                    className={`cursor-pointer w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200
                      ${mentor.available
                        ? "bg-[#3525d7] hover:bg-[#2a1fb0] text-white shadow-md shadow-indigo-200"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    {mentor.available ? "Book a Session" : "Unavailable"}
                  </button>
                  <button className="cursor-pointer w-full py-2 rounded-xl text-xs font-bold text-[#3525d7] hover:bg-indigo-50 transition">
                    View Profile
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Showing {(page - 1) * CARDS_PER_PAGE + 1}–{Math.min(page * CARDS_PER_PAGE, filtered.length)} of {filtered.length} mentors
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="cursor-pointer w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#3525d7] hover:text-[#3525d7] transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <RiArrowLeftLine size={15} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`cursor-pointer w-9 h-9 rounded-xl text-xs font-bold transition-all duration-200
                      ${page === p
                        ? "bg-[#3525d7] text-white shadow-md shadow-indigo-200"
                        : "border border-gray-200 text-gray-500 hover:border-[#3525d7] hover:text-[#3525d7]"
                      }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="cursor-pointer w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#3525d7] hover:text-[#3525d7] transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <RiArrowRightLine size={15} />
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  )
}

export default Mentors