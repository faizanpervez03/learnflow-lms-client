import React, { useState } from 'react'
import {
  RiSearchLine,
  RiDownloadLine,
  RiBookmarkLine,
  RiBookmarkFill,
  RiSparklingLine,
  RiPaletteLine,
  RiBarChartBoxLine,
  RiCodeSSlashLine,
  RiFileTextLine,
  RiRefreshLine,
} from 'react-icons/ri'

const categories = ['All Resources', 'E-books', 'Design Templates', 'Cheat Sheets', 'Case Studies']

const sortOptions = ['Newest First', 'Oldest First', 'Most Downloaded', 'Smallest Size']

const resources = [
  {
    id: 1,
    title: 'Career Path Blueprint 2024',
    desc: 'Our most requested resource pack for aspiring tech leads. Includes 5 E-books, salary benchmarks, and interview templates used by top-tier hiring managers.',
    tags: ['Interview Ready', 'Salary Guide', 'Portfolio Kit'],
    type: null,
    icon: RiSparklingLine,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-[#3525d7]',
    date: 'Updated May 2024',
    size: '142.5 MB',
    files: '12 Files',
    featured: true,
    category: 'E-books',
  },
  {
    id: 2,
    title: 'Mastering UI Architecture',
    desc: 'Comprehensive guide on building scalable design systems and maintaining structural discipline in React-based web applications.',
    type: 'PDF',
    typeBg: 'bg-orange-500',
    icon: RiBookmarkLine,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    date: 'JAN 12, 2024',
    size: '12.4 MB',
    featured: false,
    category: 'E-books',
  },
  {
    id: 3,
    title: 'Design System Tokens',
    desc: 'Standardized Figma variables for colors, typography, and spacing tailored for professional SaaS product environments.',
    type: 'FIG',
    typeBg: 'bg-purple-500',
    icon: RiPaletteLine,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    date: 'FEB 05, 2024',
    size: '4.8 MB',
    featured: false,
    category: 'Design Templates',
  },
  {
    id: 4,
    title: 'EdTech Growth Case Study',
    desc: 'Deep dive into onboarding flow optimizations that led to a 40% increase in activation for a major LMS provider.',
    type: 'ZIP',
    typeBg: 'bg-green-500',
    icon: RiBarChartBoxLine,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    date: 'MAR 10, 2024',
    size: '28.0 MB',
    featured: false,
    category: 'Case Studies',
  },
  {
    id: 5,
    title: 'Tailwind CSS v3 Cheat Sheet',
    desc: 'Quick-access reference for layout, grid, and typography utilities. Optimized for developers transitioning to v3.x.',
    type: 'PDF',
    typeBg: 'bg-orange-500',
    icon: RiCodeSSlashLine,
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    date: 'MAR 15, 2024',
    size: '2.1 MB',
    featured: false,
    category: 'Cheat Sheets',
  },
  {
    id: 6,
    title: 'Ideation Workshop Framework',
    desc: 'Step-by-step facilitation guide for running remote design thinking workshops using Miro and FigJam tools.',
    type: 'PDF',
    typeBg: 'bg-orange-500',
    icon: RiSparklingLine,
    iconBg: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    date: 'APR 02, 2024',
    size: '5.2 MB',
    featured: false,
    category: 'Design Templates',
  },
  {
    id: 7,
    title: 'Freelance Project Proposal',
    desc: 'A professional template for high-value client proposals, including scope of work, timeline, and pricing structures.',
    type: 'DOCX',
    typeBg: 'bg-blue-500',
    icon: RiFileTextLine,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    date: 'APR 18, 2024',
    size: '1.4 MB',
    featured: false,
    category: 'Design Templates',
  },
]

// ── Fix: start with 3 so Load More is always visible on first render ──
const INITIAL_VISIBLE = 3
const LOAD_MORE_STEP  = 3

const Resources = () => {

  const [activeCategory, setActiveCategory] = useState('All Resources')
  const [sortBy,         setSortBy]         = useState('Newest First')
  const [search,         setSearch]         = useState('')
  const [bookmarked,     setBookmarked]     = useState({})
  const [visibleCount,   setVisibleCount]   = useState(INITIAL_VISIBLE)

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filtered = resources.filter((r) => {
    const matchCat    = activeCategory === 'All Resources' || r.category === activeCategory
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const visible      = filtered.slice(0, visibleCount)
  const featuredList = visible.filter((r) => r.featured)
  const regularList  = visible.filter((r) => !r.featured)
  const hasMore      = visibleCount < filtered.length

  const handleLoadMore = () => setVisibleCount((c) => c + LOAD_MORE_STEP)

  // Reset visible count when category or search changes
  const handleCategoryChange = (cat) => { setActiveCategory(cat); setVisibleCount(INITIAL_VISIBLE) }
  const handleSearchChange   = (e)   => { setSearch(e.target.value); setVisibleCount(INITIAL_VISIBLE) }

  return (
    <div className='min-h-screen bg-white'>

      {/* ── Hero header ── */}
      <section className='bg-[#f0effa] px-6 md:px-16 pt-16 pb-12'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-4'>
            Learning Resources
          </h1>
          <p className='text-gray-500 text-base max-w-lg leading-relaxed mb-8'>
            A curated collection of professional educational materials, industry templates, and in-depth case studies designed to bridge the gap between learning and practice.
          </p>

          {/* Search */}
          <div className='flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 border border-gray-200 shadow-sm max-w-xl'>
            <RiSearchLine size={18} className='text-gray-400 shrink-0' />
            <input
              type='text'
              placeholder='Search resources, topics, or file types...'
              value={search}
              onChange={handleSearchChange}
              className='flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent'
            />
          </div>

          {/* Category pills */}
          <div className='flex items-center gap-2 flex-wrap mt-6'>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`cursor-pointer px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeCategory === cat ? 'bg-[#3525d7] text-white shadow-md shadow-indigo-200' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#3525d7] hover:text-[#3525d7]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resources section ── */}
      <section className='px-6 md:px-16 py-10'>
        <div className='max-w-7xl mx-auto'>

          {/* Count + Sort row */}
          <div className='flex items-center justify-between mb-8'>
            <p className='text-sm text-gray-500'>
              Showing <span className='font-bold text-gray-900'>{filtered.length}</span> available resources
            </p>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-gray-400'>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='cursor-pointer text-sm font-semibold text-[#3525d7] border-0 outline-none bg-transparent'
              >
                {sortOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className='text-center py-20 text-gray-400 text-sm'>
              No resources found. Try a different search or category.
            </div>
          )}

          {/* Featured card */}
          {featuredList.map((r) => {
            const Icon = r.icon
            return (
              <div key={r.id} className='border border-gray-200 rounded-2xl p-6 mb-6 hover:shadow-md transition-shadow duration-300'>
                <div className='flex flex-col md:flex-row gap-6'>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${r.iconBg}`}>
                    <Icon size={26} className={r.iconColor} />
                  </div>
                  <div className='flex-1 flex flex-col gap-3'>
                    <h3 className='text-lg font-extrabold text-gray-900'>{r.title}</h3>
                    <p className='text-sm text-gray-500 leading-relaxed max-w-lg'>{r.desc}</p>
                    <div className='flex items-center gap-2 flex-wrap'>
                      {r.tags?.map((tag, i) => (
                        <span key={i} className='text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full'>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2 pt-4 border-t border-gray-100'>
                      <div className='flex flex-col gap-1'>
                        <span className='text-[10px] font-bold text-[#3525d7] uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-full w-fit'>
                          Featured Resource
                        </span>
                        <p className='text-xs text-gray-400 mt-1'>{r.date} · {r.size} · {r.files}</p>
                      </div>
                      <div className='flex items-center gap-3'>
                        <button className='cursor-pointer flex items-center gap-2 bg-[#3525d7] hover:bg-[#2a1fb0] transition text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md shadow-indigo-200'>
                          <RiDownloadLine size={16} /> Get Complete Bundle
                        </button>
                        <button
                          onClick={() => toggleBookmark(r.id)}
                          className='cursor-pointer w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#3525d7] hover:border-[#3525d7] transition'
                        >
                          {bookmarked[r.id] ? <RiBookmarkFill size={16} className='text-[#3525d7]' /> : <RiBookmarkLine size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Regular cards grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {regularList.map((r) => {
              const Icon = r.icon
              return (
                <div key={r.id} className='border border-gray-200 rounded-2xl p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300'>
                  <div className='flex items-start justify-between'>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${r.iconBg}`}>
                      <Icon size={20} className={r.iconColor} />
                    </div>
                    {r.type && (
                      <span className={`text-[10px] font-extrabold text-white px-2.5 py-1 rounded-full ${r.typeBg}`}>
                        {r.type}
                      </span>
                    )}
                  </div>
                  <div className='flex flex-col gap-2 flex-1'>
                    <h3 className='text-sm font-extrabold text-gray-900 leading-snug'>{r.title}</h3>
                    <p className='text-xs text-gray-500 leading-relaxed'>{r.desc}</p>
                  </div>
                  <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                    <div>
                      <p className='text-[10px] text-gray-400 uppercase tracking-wide font-semibold'>{r.date}</p>
                      <p className='text-xs text-gray-500 font-medium mt-0.5'>{r.size}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => toggleBookmark(r.id)}
                        className='cursor-pointer w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#3525d7] transition'
                      >
                        {bookmarked[r.id] ? <RiBookmarkFill size={15} className='text-[#3525d7]' /> : <RiBookmarkLine size={15} />}
                      </button>
                      <button className='cursor-pointer flex items-center gap-1.5 bg-gray-900 hover:bg-gray-700 transition text-white text-xs font-bold px-4 py-2 rounded-xl'>
                        <RiDownloadLine size={13} /> Get
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Load More button ── always visible when hasMore is true ── */}
          {hasMore && (
            <div className='flex flex-col items-center gap-3 mt-12'>
              <button
                onClick={handleLoadMore}
                className='cursor-pointer flex items-center gap-2 border border-gray-200 hover:border-[#3525d7] hover:text-[#3525d7] text-gray-600 text-sm font-semibold px-8 py-3.5 rounded-full transition'
              >
                <RiRefreshLine size={16} /> Load More Resources
              </button>
              <p className='text-xs text-[#3525d7] font-semibold italic'>
                Updated weekly with new materials
              </p>
            </div>
          )}

        </div>
      </section>

    </div>
  )
}

export default Resources