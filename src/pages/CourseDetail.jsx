import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  RiStarFill,
  RiStarHalfFill,
  RiGroupLine,
  RiTimeLine,
  RiDownloadLine,
  RiInfinityLine,
  RiAwardLine,
  RiPlayCircleLine,
  RiCheckboxCircleLine,
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiShareLine,
  RiGiftLine,
  RiThumbUpLine,
  RiFlag2Line,
  RiLockLine,
  RiVideoLine,
  RiFileListLine,
} from "react-icons/ri"

const courseData = {
  title: "Mastering Web Performance",
  subtitle: "Optimize your web applications for speed, core web vitals, and user experience with industry-standard patterns and modern auditing tools.",
  instructor: "Sarah Chen",
  instructorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
  rating: 4.9,
  totalRatings: "19,442",
  totalStudents: "19,442",
  lastUpdated: "10/2023",
  price: 89,
  originalPrice: 149,
  discount: "40% OFF",
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format",
  includes: [
    { icon: RiVideoLine,      label: "12 hours on-demand video"    },
    { icon: RiDownloadLine,   label: "45 downloadable resources"   },
    { icon: RiInfinityLine,   label: "Full lifetime access"        },
    { icon: RiAwardLine,      label: "Certificate of completion"   },
  ],
  curriculum: [
    {
      id: 1,
      section: "Section 1: Performance Fundamentals",
      lectures: 4,
      duration: "24m",
      open: true,
      lessons: [
        { id: 1, title: "Welcome & Course Overview",    duration: "05:12", type: "video",   free: true  },
        { id: 2, title: "Measuring Performance Metrics", duration: "12:45", type: "video",  free: false },
        { id: 3, title: "Knowledge Check: Basics",       duration: "5 questions", type: "quiz", free: false },
      ],
    },
    {
      id: 2,
      section: "Section 2: The Critical Rendering Path",
      lectures: 6,
      duration: "52m",
      open: false,
      lessons: [
        { id: 4, title: "How Browsers Render Pages",    duration: "08:30", type: "video",   free: false },
        { id: 5, title: "DOM & CSSOM Construction",     duration: "10:15", type: "video",   free: false },
        { id: 6, title: "Render Blocking Resources",    duration: "12:00", type: "video",   free: false },
      ],
    },
    {
      id: 3,
      section: "Section 3: Optimizing Assets & Media",
      lectures: 8,
      duration: "1h 15m",
      open: false,
      lessons: [
        { id: 7, title: "Image Optimization Strategies", duration: "14:20", type: "video",  free: false },
        { id: 8, title: "Modern Image Formats",          duration: "10:55", type: "video",  free: false },
      ],
    },
  ],
  tabs: ["Overview", "Curriculum", "Instructor", "Reviews"],
  reviews: [
    {
      name: "Michael T.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      date: "2 weeks ago",
      rating: 5,
      text: "This course transformed how I build React apps. Sarah's explanation of Core Web Vitals and how to optimize them using DevTools is the best I've seen. Truly high authority content.",
      helpful: 12,
    },
    {
      name: "Priya S.",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
      date: "1 month ago",
      rating: 5,
      text: "Absolutely brilliant course. Went from knowing nothing about web performance to confidently auditing production apps. The exercises are incredibly well designed.",
      helpful: 8,
    },
  ],
  ratingBreakdown: [
    { stars: 5, pct: 85 },
    { stars: 4, pct: 10 },
    { stars: 3, pct: 4  },
  ],
}

const CourseDetail = () => {
  const navigate                        = useNavigate()
  const { id }                          = useParams()
  const [activeTab, setActiveTab]       = useState("Curriculum")
  const [openSections, setOpenSections] = useState({ 1: true })

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }

  const goToLesson = () => navigate(`/lesson/${id || 1}`)

  return (
    <div className="min-h-screen bg-white">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100 px-6 md:px-16 py-3 bg-gray-50">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <span className="cursor-pointer hover:text-[#3525d7] transition" onClick={() => navigate("/catalog")}>Catalog</span>
          <RiArrowRightSLine size={14} />
          <span className="cursor-pointer hover:text-[#3525d7] transition" onClick={() => navigate("/catalog")}>Development</span>
          <RiArrowRightSLine size={14} />
          <span className="text-gray-600 font-semibold">Web Performance</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-8">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── LEFT column ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">

            {/* Course header */}
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
                {courseData.title}
              </h1>
              <p className="text-gray-500 text-base leading-relaxed">{courseData.subtitle}</p>

              {/* Instructor + meta */}
              <div className="flex items-center gap-3 flex-wrap">
                <img src={courseData.instructorAvatar} alt={courseData.instructor}
                  className="w-8 h-8 rounded-full object-cover" />
                <span className="text-sm text-gray-500">By <span className="font-semibold text-gray-800">{courseData.instructor}</span></span>
                <span className="text-gray-300">·</span>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <RiStarFill key={i} size={13} className="text-yellow-400" />
                  ))}
                  <span className="text-sm font-bold text-gray-800 ml-1">{courseData.rating}</span>
                  <span className="text-sm text-gray-400 ml-1">({courseData.totalRatings} students)</span>
                </div>
                <span className="text-gray-300">·</span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <RiTimeLine size={13} /> Last updated {courseData.lastUpdated}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-100">
              <div className="flex items-center gap-6">
                {courseData.tabs.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`cursor-pointer pb-3 text-sm font-semibold border-b-2 transition-all duration-200
                      ${activeTab === tab
                        ? "text-[#3525d7] border-[#3525d7]"
                        : "text-gray-400 border-transparent hover:text-gray-700"}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Overview tab ── */}
            {activeTab === "Overview" && (
              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-bold text-gray-900">What you'll learn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Audit and fix Core Web Vitals (LCP, FID, CLS)",
                    "Optimize images, fonts, and third-party scripts",
                    "Use Chrome DevTools and Lighthouse effectively",
                    "Implement lazy loading and code splitting",
                    "Measure real-user performance with analytics",
                    "Deploy performance budgets in CI/CD pipelines",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <RiCheckboxCircleLine size={16} className="text-[#3525d7] mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Curriculum tab ── */}
            {activeTab === "Curriculum" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Course Content</h2>
                  <span className="text-xs text-gray-400">
                    12 sections · 145 lectures · 12h 45m total length
                  </span>
                </div>

                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                  {courseData.curriculum.map(section => (
                    <div key={section.id} className="border-b border-gray-100 last:border-0">

                      {/* Section header */}
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="cursor-pointer w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-indigo-50 transition text-left"
                      >
                        <div className="flex items-center gap-3">
                          <RiArrowDownSLine
                            size={18}
                            className={`text-gray-400 transition-transform duration-200 ${openSections[section.id] ? "rotate-0" : "-rotate-90"}`}
                          />
                          <span className="text-sm font-bold text-gray-900">{section.section}</span>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0">
                          {section.lectures} lectures · {section.duration}
                        </span>
                      </button>

                      {/* Lessons */}
                      {openSections[section.id] && (
                        <div className="divide-y divide-gray-50">
                          {section.lessons.map(lesson => (
                            <div
                              key={lesson.id}
                              onClick={() => lesson.free && goToLesson()}
                              className={`flex items-center gap-3 px-5 py-3.5 transition
                                ${lesson.free ? "cursor-pointer hover:bg-indigo-50" : "cursor-default"}`}
                            >
                              {lesson.type === "quiz"
                                ? <RiFileListLine size={15} className="text-yellow-500 shrink-0" />
                                : lesson.free
                                  ? <RiPlayCircleLine size={15} className="text-[#3525d7] shrink-0" />
                                  : <RiLockLine size={15} className="text-gray-300 shrink-0" />
                              }
                              <span className={`text-sm flex-1 ${lesson.free ? "text-[#3525d7] font-semibold" : "text-gray-600"}`}>
                                {lesson.title}
                              </span>
                              {lesson.free && (
                                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                  Preview
                                </span>
                              )}
                              <span className="text-xs text-gray-400 shrink-0">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Show more */}
                  <button className="cursor-pointer w-full py-4 text-sm font-semibold text-[#3525d7] hover:bg-indigo-50 transition border-t border-gray-100">
                    Show 9 more sections
                  </button>
                </div>
              </div>
            )}

            {/* ── Instructor tab ── */}
            {activeTab === "Instructor" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <img src={courseData.instructorAvatar} alt={courseData.instructor}
                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100" />
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{courseData.instructor}</h3>
                    <p className="text-sm text-gray-400">Senior UX Designer & Web Performance Expert</p>
                    <div className="flex items-center gap-1 mt-1">
                      <RiStarFill size={13} className="text-yellow-400" />
                      <span className="text-xs font-bold text-gray-700">{courseData.rating} Instructor Rating</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Sarah Chen is a performance engineer with 10+ years of experience building fast, scalable web applications for Fortune 500 companies. She has spoken at Google I/O, JSConf, and CSSconf. Her courses have helped over 80,000 developers worldwide build faster, more user-friendly applications.
                </p>
              </div>
            )}

            {/* ── Reviews tab ── */}
            {activeTab === "Reviews" && (
              <div className="flex flex-col gap-6">
                <h2 className="text-lg font-bold text-gray-900">Student Feedback</h2>

                {/* Rating summary */}
                <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-2xl">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-5xl font-extrabold text-gray-900">{courseData.rating}</span>
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(i => <RiStarFill key={i} size={16} className="text-yellow-400" />)}
                    </div>
                    <span className="text-xs text-gray-400 font-semibold">Course Rating</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    {courseData.ratingBreakdown.map((r, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${r.pct}%` }} />
                        </div>
                        <div className="flex items-center gap-0.5 shrink-0">
                          {[1,2,3,4,5].slice(0, r.stars).map(s => <RiStarFill key={s} size={11} className="text-yellow-400" />)}
                        </div>
                        <span className="text-xs text-gray-400 w-8 text-right">{r.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review cards */}
                <div className="flex flex-col gap-5">
                  {courseData.reviews.map((review, i) => (
                    <div key={i} className="flex gap-4 pb-5 border-b border-gray-100 last:border-0">
                      <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-gray-900">{review.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              {[...Array(review.rating)].map((_, s) => <RiStarFill key={s} size={11} className="text-yellow-400" />)}
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400">Helpful?</span>
                          <button className="cursor-pointer flex items-center gap-1 text-xs text-gray-500 hover:text-[#3525d7] transition">
                            <RiThumbUpLine size={13} /> {review.helpful}
                          </button>
                          <button className="cursor-pointer flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition">
                            <RiFlag2Line size={13} /> Report
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT column: Sticky purchase card ── */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="sticky top-6 border border-gray-100 rounded-2xl shadow-lg overflow-hidden">

              {/* Video preview */}
              <div
                className="relative h-44 bg-gray-900 cursor-pointer group"
                onClick={goToLesson}
              >
                <img src={courseData.image} alt={courseData.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-60 transition" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
                    <RiPlayCircleLine size={28} className="text-[#3525d7]" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="text-white text-xs font-bold bg-black/40 px-3 py-1 rounded-full">
                    Preview this course
                  </span>
                </div>
              </div>

              {/* Price + actions */}
              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-extrabold text-gray-900">${courseData.price}</span>
                  <span className="text-base text-gray-400 line-through">${courseData.originalPrice}</span>
                  <span className="text-xs font-extrabold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                    {courseData.discount}
                  </span>
                </div>

                <button
                  onClick={goToLesson}
                  className="cursor-pointer w-full bg-[#3525d7] hover:bg-[#2a1fb0] transition text-white font-bold py-3.5 rounded-xl shadow-md shadow-indigo-200 text-sm"
                >
                  Enroll Now
                </button>

                <button className="cursor-pointer w-full border border-gray-200 hover:border-[#3525d7] hover:text-[#3525d7] text-gray-700 font-semibold py-3.5 rounded-xl transition text-sm">
                  Add to Cart
                </button>

                {/* Includes */}
                <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                  <p className="text-xs font-extrabold text-gray-900 uppercase tracking-wide">This course includes:</p>
                  {courseData.includes.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-gray-500">
                        <Icon size={14} className="text-[#3525d7] shrink-0" />
                        {item.label}
                      </div>
                    )
                  })}
                </div>

                {/* Share / Gift */}
                <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                  <button className="cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#3525d7] transition">
                    <RiShareLine size={14} /> Share
                  </button>
                  <button className="cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#3525d7] transition">
                    <RiGiftLine size={14} /> Gift this course
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CourseDetail