import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  RiPlayCircleLine,
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiBellLine,
  RiMenuLine,
  RiTimeLine,
  RiFileTextLine,
  RiGroupLine,
  RiLockLine,
  RiQuestionLine,
  RiBookmarkLine,
  RiShareLine,
} from "react-icons/ri"

const curriculum = [
  {
    section: "SECTION 1: FOUNDATIONS",
    lessons: [
      { id: 1, title: "1.1 What is Web Performance?",         duration: "06:05",       completed: true,  locked: false              },
      { id: 2, title: "1.2 Intro to Performance Metrics",     duration: "12:20",       completed: false, locked: false, active: true },
      { id: 3, title: "1.3 Understanding Lighthouse Reports", duration: "10:10",       completed: false, locked: false              },
    ],
  },
  {
    section: "SECTION 2: ASSET OPTIMIZATION",
    lessons: [
      { id: 4, title: "2.1 Optimizing Image Assets",          duration: "15:30",       completed: false, locked: false              },
      { id: 5, title: "2.2 Modern Image Formats (WebP/AVIF)", duration: "10:55",       completed: false, locked: true               },
      { id: 6, title: "2.3 Video Encoding Best Practices",    duration: "14:20",       completed: false, locked: true               },
      { id: 7, title: "2.4 Final Section Quiz",               duration: "5 questions", completed: false, locked: true,  isQuiz: true },
    ],
  },
]

const tabs = ["Overview", "Resources (3)", "Transcript"]

const VideoLesson = () => {
  const navigate                          = useNavigate()
  const [activeTab, setActiveTab]         = useState("Overview")
  const [activeLesson, setActiveLesson]   = useState(2)
  const [notes, setNotes]                 = useState("")
  const [sidebarOpen, setSidebarOpen]     = useState(true)

  const allLessons    = curriculum.flatMap(s => s.lessons)
  const currentLesson = allLessons.find(l => l.id === activeLesson) || allLessons[1]
  const currentIndex  = allLessons.findIndex(l => l.id === activeLesson)

  const totalLessons     = allLessons.length
  const completedLessons = allLessons.filter(l => l.completed).length + 1
  const progressPct      = Math.round((completedLessons / totalLessons) * 100)

  const goNext = () => { if (currentIndex < allLessons.length - 1) setActiveLesson(allLessons[currentIndex + 1].id) }
  const goPrev = () => { if (currentIndex > 0) setActiveLesson(allLessons[currentIndex - 1].id) }

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">

      {/* ── Topbar ── */}
      <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-200 shrink-0 z-10">

        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(o => !o)}
            className="cursor-pointer text-gray-500 hover:text-[#3525d7] transition p-1.5 rounded-lg hover:bg-indigo-50">
            <RiMenuLine size={18} />
          </button>
          <span
            onClick={() => navigate(-1)}
            className="cursor-pointer text-[#3525d7] font-extrabold text-base select-none"
          >
            LearnFlow
          </span>
          <span className="text-gray-300 hidden sm:block">/</span>
          <span className="text-gray-500 text-sm hidden sm:block truncate max-w-[220px]">
            {currentLesson.title}
          </span>
        </div>

        {/* Progress */}
        <div className="hidden md:flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Course Progress</span>
          <div className="flex items-center gap-2">
            <div className="w-36 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#3525d7] rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="text-xs font-bold text-gray-600">{completedLessons} / {totalLessons} Lessons</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="cursor-pointer p-2 text-gray-500 hover:text-[#3525d7] transition rounded-lg hover:bg-indigo-50">
            <RiBellLine size={18} />
          </button>
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-xs font-bold text-[#3525d7]">FP</span>
          </div>
        </div>
      </header>

      {/* ── Main area ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: Video + content ── */}
        <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">

          {/* Video player */}
          <div className="relative w-full bg-gray-900" style={{ aspectRatio: "16/9", maxHeight: "55vh" }}>
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format"
              alt="lesson"
              className="w-full h-full object-cover opacity-70"
            />
            {/* Play button */}
            <button onClick={() => {}} className="cursor-pointer absolute inset-0 flex items-center justify-center group">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200">
                <RiPlayCircleLine size={36} className="text-[#3525d7]" />
              </div>
            </button>
            {/* Video progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div className="h-full bg-[#3525d7] w-[35%]" />
            </div>
          </div>

          {/* Lesson nav row */}
          <div className="bg-white px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100">
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold text-gray-900">{currentLesson.title}</h2>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><RiTimeLine size={12} /> {currentLesson.duration}</span>
                <span className="flex items-center gap-1"><RiFileTextLine size={12} /> Technical SEO Path</span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button onClick={goPrev} disabled={currentIndex === 0}
                className="cursor-pointer flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-[#3525d7] transition disabled:opacity-30 disabled:cursor-not-allowed">
                <RiArrowLeftSLine size={16} /> Previous
              </button>
              <button onClick={goNext} disabled={currentIndex === allLessons.length - 1}
                className="cursor-pointer flex items-center gap-1.5 bg-[#3525d7] hover:bg-[#2a1fb0] transition text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-indigo-200 disabled:opacity-30 disabled:cursor-not-allowed">
                Next Lesson <RiArrowRightSLine size={16} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white px-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer py-3 text-sm font-semibold border-b-2 transition-all duration-200
                    ${activeTab === tab
                      ? "text-[#3525d7] border-[#3525d7]"
                      : "text-gray-400 border-transparent hover:text-gray-700"}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="px-6 py-6 flex flex-col lg:flex-row gap-6 bg-white flex-1">

            {activeTab === "Overview" && (
              <>
                <div className="flex-1 flex flex-col gap-5">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">Introduction to Core Web Vitals</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      In this lesson, we break down the three primary Core Web Vitals metrics: Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS). You'll learn how Google uses these as ranking signals and how they directly correlate with user experience quality.
                    </p>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
                    <p className="text-xs font-extrabold text-[#3525d7] uppercase tracking-widest mb-2">Key Takeaway</p>
                    <p className="text-sm text-gray-700 italic leading-relaxed">
                      "Focusing on speed isn't just about SEO; it's about making your site usable for real people on every device."
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="cursor-pointer flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#3525d7] transition border border-gray-200 px-4 py-2 rounded-xl hover:border-[#3525d7]">
                      <RiBookmarkLine size={14} /> Save Lesson
                    </button>
                    <button className="cursor-pointer flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#3525d7] transition border border-gray-200 px-4 py-2 rounded-xl hover:border-[#3525d7]">
                      <RiShareLine size={14} /> Share
                    </button>
                  </div>
                </div>

                {/* Study Notes */}
                <div className="w-full lg:w-64 flex flex-col gap-3 shrink-0">
                  <h4 className="text-sm font-bold text-gray-900">Your Study Notes</h4>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Take notes here..."
                    className="w-full h-36 text-sm text-gray-600 placeholder-gray-300 border border-gray-200 rounded-xl p-3 outline-none resize-none focus:border-[#3525d7] transition"
                  />
                  <button className="cursor-pointer w-full bg-[#3525d7] hover:bg-[#2a1fb0] transition text-white text-xs font-bold py-2.5 rounded-xl">
                    Save Notes
                  </button>
                </div>
              </>
            )}

            {activeTab === "Resources (3)" && (
              <div className="flex flex-col gap-3 w-full">
                {["Core Web Vitals Cheat Sheet.pdf", "LCP Optimization Guide.docx", "Performance Audit Template.xlsx"].map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-[#3525d7] hover:bg-indigo-50 transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <RiFileTextLine size={18} className="text-[#3525d7]" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{file}</span>
                    </div>
                    <span className="text-xs font-bold text-[#3525d7]">Download</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Transcript" && (
              <div className="flex flex-col gap-4 w-full">
                {[
                  { time: "00:00", text: "Welcome to Lesson 1.2 — Introduction to Performance Metrics." },
                  { time: "00:15", text: "Today we'll cover the three Core Web Vitals that Google uses as ranking signals." },
                  { time: "00:42", text: "The first metric is Largest Contentful Paint, or LCP. This measures how long it takes for the largest visible element to load." },
                  { time: "01:20", text: "Next is First Input Delay — FID. This measures the time between a user's first interaction and when the browser responds." },
                  { time: "02:05", text: "Finally, Cumulative Layout Shift measures visual stability — how much the page layout shifts during loading." },
                ].map((line, i) => (
                  <div key={i} className="flex gap-4 text-sm hover:bg-indigo-50 rounded-xl px-3 py-2 transition cursor-pointer">
                    <span className="text-[#3525d7] font-bold shrink-0 w-10">{line.time}</span>
                    <p className="text-gray-600 leading-relaxed">{line.text}</p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* ── Right: Curriculum sidebar ── */}
        {sidebarOpen && (
          <div className="hidden md:flex flex-col w-72 xl:w-80 bg-white border-l border-gray-100 overflow-y-auto shrink-0">

            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
              <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Course Curriculum</p>
              <p className="text-sm font-bold text-gray-900 mt-1">Mastering Web Performance</p>
            </div>

            {/* Sections */}
            {curriculum.map((section, si) => (
              <div key={si}>
                <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-100">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{section.section}</p>
                </div>
                {section.lessons.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => !lesson.locked && setActiveLesson(lesson.id)}
                    disabled={lesson.locked}
                    className={`cursor-pointer w-full flex items-start gap-3 px-5 py-3.5 text-left border-b border-gray-100 transition
                      ${lesson.id === activeLesson
                        ? "bg-indigo-50 border-l-2 border-l-[#3525d7]"
                        : lesson.locked
                          ? "opacity-40 cursor-not-allowed bg-white"
                          : "bg-white hover:bg-gray-50"}`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {lesson.completed
                        ? <RiCheckboxCircleFill size={16} className="text-green-500" />
                        : lesson.locked
                          ? <RiLockLine size={16} className="text-gray-400" />
                          : lesson.isQuiz
                            ? <RiQuestionLine size={16} className="text-yellow-500" />
                            : lesson.id === activeLesson
                              ? <RiPlayCircleLine size={16} className="text-[#3525d7]" />
                              : <RiCheckboxBlankCircleLine size={16} className="text-gray-300" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold leading-snug
                        ${lesson.id === activeLesson ? "text-[#3525d7]" : "text-gray-700"}`}>
                        {lesson.title}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{lesson.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            ))}

            {/* Community Talk */}
            <div className="mt-auto border-t border-gray-100 px-5 py-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RiGroupLine size={15} className="text-gray-400" />
                  <span className="text-xs font-bold text-gray-500">Community Talk</span>
                </div>
                <div className="flex items-center">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white -ml-1 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-[#3525d7]">{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default VideoLesson