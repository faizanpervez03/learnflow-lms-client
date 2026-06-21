import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiAwardLine,
  RiCheckboxCircleLine,
  RiDownloadLine,
  RiFileListLine,
  RiFlag2Line,
  RiGiftLine,
  RiInfinityLine,
  RiLockLine,
  RiPlayCircleLine,
  RiShareLine,
  RiStarFill,
  RiThumbUpLine,
  RiTimeLine,
  RiVideoLine,
} from "react-icons/ri"
import { ApiClientError } from "../services/api"
import { getCourseById, getCourseLessons } from "../services/course.service"

const genericCourseImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format"

const formatCount = (value = 0) => {
  const safeValue = Number(value) || 0
  if (safeValue >= 1000) return `${(safeValue / 1000).toFixed(1)}k`
  return String(safeValue)
}

const formatDuration = (seconds = 0) => {
  const safeSeconds = Math.max(0, Number(seconds) || 0)
  if (!safeSeconds) return "0m"

  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }

  return `${minutes}m`
}

const getInstructor = (course) => {
  if (typeof course?.instructor === "string") {
    return {
      name: course.instructor,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      bio: "LearnFlow Instructor",
    }
  }

  return {
    name: course?.instructor?.name || "LearnFlow Instructor",
    avatar: course?.instructor?.avatar || "https://randomuser.me/api/portraits/men/45.jpg",
    bio: course?.instructor?.bio || "LearnFlow Instructor",
  }
}

const groupLessonsBySection = (lessons = []) => {
  const sections = new Map()

  lessons.forEach((lesson, index) => {
    const sectionTitle = lesson.sectionTitle?.trim() || "Course content"

    if (!sections.has(sectionTitle)) {
      sections.set(sectionTitle, [])
    }

    sections.get(sectionTitle).push({
      id: lesson._id || `${sectionTitle}-${index}`,
      lessonId: lesson._id,
      title: lesson.title,
      duration: lesson.video?.durationSeconds ? formatDuration(lesson.video.durationSeconds) : lesson.isPreview ? "Preview" : "Locked",
      type: lesson.video ? "video" : "lesson",
      free: Boolean(lesson.isPreview),
    })
  })

  return Array.from(sections.entries()).map(([section, sectionLessons], index) => ({
    id: section,
    section,
    lectures: sectionLessons.length,
    duration: sectionLessons.reduce((total, lesson) => total + (lesson.duration === "Preview" || lesson.duration === "Locked" ? 0 : 1), 0),
    open: index === 0,
    lessons: sectionLessons,
  }))
}

const CourseDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  const initialCourse = location.state?.course || null
  const [course, setCourse] = useState(initialCourse)
  const [lessons, setLessons] = useState([])
  const [activeTab, setActiveTab] = useState("Curriculum")
  const [openSections, setOpenSections] = useState({})
  const [isLoading, setIsLoading] = useState(Boolean(id && !initialCourse))
  const [error, setError] = useState("")

  useEffect(() => {
    let ignore = false

    const loadCourse = async () => {
      const courseId = id || initialCourse?._id || initialCourse?.id

      if (!courseId) {
        setCourse(null)
        setLessons([])
        setError("Course not available.")
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError("")

      try {
        const [courseResponse, lessonsResponse] = await Promise.allSettled([
          getCourseById(courseId),
          getCourseLessons(courseId),
        ])

        if (ignore) return

        if (courseResponse.status === "fulfilled") {
          setCourse(courseResponse.value.data || null)
        } else if (initialCourse) {
          setCourse(initialCourse)
        } else {
          throw courseResponse.reason
        }

        if (lessonsResponse.status === "fulfilled") {
          setLessons(Array.isArray(lessonsResponse.value.data) ? lessonsResponse.value.data : [])
        } else {
          setLessons([])
        }
      } catch (requestError) {
        if (ignore) return

        const statusCode = requestError instanceof ApiClientError ? requestError.statusCode : 0

        if (statusCode === 404) {
          setError("Course not found.")
        } else if (statusCode === 503) {
          setError("Backend is running without a database connection.")
        } else {
          setError("Unable to load the selected course.")
        }

        setCourse(initialCourse || null)
        setLessons([])
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    loadCourse()

    return () => {
      ignore = true
    }
  }, [id, initialCourse])

  const activeCourse = course || initialCourse
  const instructor = getInstructor(activeCourse)
  const curriculum = useMemo(() => {
    const structuredLessons = groupLessonsBySection(lessons)

    if (structuredLessons.length > 0) return structuredLessons

    return [
      {
        id: "overview",
        section: "Course content",
        lectures: 1,
        duration: 0,
        open: true,
        lessons: [
          {
            id: activeCourse?._id || activeCourse?.id || "preview",
            lessonId: activeCourse?._id || activeCourse?.id || "preview",
            title: activeCourse?.title || "Course preview",
            duration: "Preview",
            type: "video",
            free: true,
          },
        ],
      },
    ]
  }, [activeCourse, lessons])

  const toggleSection = (sectionId) => {
    setOpenSections((current) => ({ ...current, [sectionId]: !current[sectionId] }))
  }

  const goToLesson = (lessonId) => {
    const targetLessonId = lessonId || lessons.find((lesson) => lesson.isPreview)?._id || lessons[0]?._id || activeCourse._id || activeCourse.id || 1
    navigate(`/studentdashboard/lesson/${targetLessonId}`)
  }

  const courseImage = activeCourse?.thumbnail?.url || activeCourse?.image || genericCourseImage
  const rating = Number(activeCourse?.averageRating ?? activeCourse?.rating ?? 0)
  const reviewsCount = activeCourse?.reviewsCount ?? activeCourse?.totalRatings ?? 0
  const studentsCount = activeCourse?.studentsCount ?? activeCourse?.totalStudents ?? 0
  const lastUpdated = activeCourse?.updatedAt || activeCourse?.publishedAt || activeCourse?.lastUpdated || ""
  const description = activeCourse?.description || activeCourse?.subtitle || ""
  const outcomes = Array.isArray(activeCourse?.outcomes) ? activeCourse.outcomes : []
  const requirements = Array.isArray(activeCourse?.requirements) ? activeCourse.requirements : []
  const previewLesson = lessons.find((lesson) => lesson.isPreview) || lessons[0]
  const totalVideoSeconds = lessons.reduce((total, lesson) => total + (lesson.video?.durationSeconds || 0), 0)
  const resourceCount = lessons.reduce((total, lesson) => total + (lesson.resources?.length || 0), 0)
  const includes = [
    { icon: RiVideoLine, label: `${formatDuration(totalVideoSeconds || 12 * 3600)} on-demand video` },
    { icon: RiDownloadLine, label: `${resourceCount || 1} downloadable resource${(resourceCount || 1) === 1 ? "" : "s"}` },
    { icon: RiInfinityLine, label: "Full lifetime access" },
    { icon: RiAwardLine, label: "Certificate of completion" },
  ]

  const reviews = Array.isArray(activeCourse?.reviews) ? activeCourse.reviews : []

  if (!isLoading && !activeCourse) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-lg font-semibold text-gray-900">{error || "Course not available."}</p>
        <button
          onClick={() => navigate("/catalog")}
          className="rounded-xl bg-[#3525d7] px-4 py-2 text-sm font-semibold text-white"
        >
          Back to catalog
        </button>
      </div>
    )
  }

  if (isLoading && !course) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">Loading course details...</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {error && (
        <div className="border-b border-yellow-100 bg-yellow-50 px-6 py-3 text-xs font-semibold text-yellow-700 md:px-16">
          {error}
        </div>
      )}

      <div className="border-b border-gray-100 px-6 py-3 bg-gray-50 md:px-16">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <span className="cursor-pointer hover:text-[#3525d7] transition" onClick={() => navigate("/catalog")}>Catalog</span>
          <RiArrowRightSLine size={14} />
          <span className="cursor-pointer hover:text-[#3525d7] transition" onClick={() => navigate("/catalog")}>{activeCourse?.category || "Development"}</span>
          <RiArrowRightSLine size={14} />
          <span className="text-gray-600 font-semibold">{activeCourse?.title || "Course details"}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
                {activeCourse?.title || "Course details"}
              </h1>
              <p className="text-gray-500 text-base leading-relaxed">{description}</p>

              <div className="flex items-center gap-3 flex-wrap">
                <img src={instructor.avatar} alt={instructor.name}
                  className="w-8 h-8 rounded-full object-cover" />
                <span className="text-sm text-gray-500">By <span className="font-semibold text-gray-800">{instructor.name}</span></span>
                <span className="text-gray-300">·</span>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <RiStarFill key={i} size={13} className="text-yellow-400" />
                  ))}
                  <span className="text-sm font-bold text-gray-800 ml-1">{rating || "0.0"}</span>
                  <span className="text-sm text-gray-400 ml-1">({formatCount(reviewsCount)} ratings)</span>
                </div>
                <span className="text-gray-300">·</span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <RiTimeLine size={13} /> Last updated {lastUpdated ? String(lastUpdated).slice(0, 7) : "N/A"}
                </span>
              </div>
            </div>

            <div className="border-b border-gray-100">
              <div className="flex items-center gap-6">
                {["Overview", "Curriculum", "Instructor", "Reviews"].map((tab) => (
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

            {activeTab === "Overview" && (
              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-bold text-gray-900">What you&apos;ll learn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {outcomes.map((item, index) => (
                    <div key={`${item}-${index}`} className="flex items-start gap-2 text-sm text-gray-600">
                      <RiCheckboxCircleLine size={16} className="text-[#3525d7] mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                  {outcomes.length === 0 && <p className="text-sm text-gray-400">No learning outcomes have been added yet.</p>}
                </div>

                {requirements.length > 0 && (
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <h3 className="text-sm font-bold text-gray-900">Requirements</h3>
                    <ul className="mt-3 space-y-2 text-sm text-gray-600">
                      {requirements.map((requirement, index) => (
                        <li key={`${requirement}-${index}`} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#3525d7]" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "Curriculum" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Course Content</h2>
                  <span className="text-xs text-gray-400">
                    {curriculum.length} section{curriculum.length === 1 ? "" : "s"} · {lessons.length || curriculum.reduce((total, section) => total + section.lectures, 0)} lecture{(lessons.length || curriculum.reduce((total, section) => total + section.lectures, 0)) === 1 ? "" : "s"} · {formatDuration(totalVideoSeconds)} total length
                  </span>
                </div>

                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                  {curriculum.map((section, index) => {
                    const isSectionOpen = openSections[section.id] ?? index === 0

                    return (
                    <div key={section.id} className="border-b border-gray-100 last:border-0">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="cursor-pointer w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-indigo-50 transition text-left"
                      >
                        <div className="flex items-center gap-3">
                          <RiArrowDownSLine
                            size={18}
                            className={`text-gray-400 transition-transform duration-200 ${isSectionOpen ? "rotate-0" : "-rotate-90"}`}
                          />
                          <span className="text-sm font-bold text-gray-900">{section.section}</span>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0">
                          {section.lectures} lectures
                        </span>
                      </button>

                      {isSectionOpen && (
                        <div className="divide-y divide-gray-50">
                          {section.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              onClick={() => lesson.free && goToLesson(lesson.lessonId || lesson.id)}
                              className={`flex items-center gap-3 px-5 py-3.5 transition ${lesson.free ? "cursor-pointer hover:bg-indigo-50" : "cursor-default"}`}
                            >
                              {lesson.type === "lesson"
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
                    )
                  })}
                </div>
              </div>
            )}

            {activeTab === "Instructor" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <img src={instructor.avatar} alt={instructor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100" />
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{instructor.name}</h3>
                    <p className="text-sm text-gray-400">{instructor.bio}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <RiStarFill size={13} className="text-yellow-400" />
                      <span className="text-xs font-bold text-gray-700">{rating || "0.0"} Instructor Rating</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {activeCourse.description || description}
                </p>
              </div>
            )}

            {activeTab === "Reviews" && (
              <div className="flex flex-col gap-6">
                <h2 className="text-lg font-bold text-gray-900">Student Feedback</h2>

                <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-2xl">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-5xl font-extrabold text-gray-900">{rating || "0.0"}</span>
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((i) => <RiStarFill key={i} size={16} className="text-yellow-400" />)}
                    </div>
                    <span className="text-xs text-gray-400 font-semibold">Course Rating</span>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <p className="text-sm text-gray-500">{formatCount(reviewsCount)} ratings from learners.</p>
                    <p className="text-sm text-gray-500">{formatCount(studentsCount)} students enrolled.</p>
                    <p className="text-sm text-gray-500">{resourceCount} resource{resourceCount === 1 ? "" : "s"} attached to published lessons.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  {reviews.length > 0 ? reviews.map((review, index) => (
                    <div key={index} className="flex gap-4 pb-5 border-b border-gray-100 last:border-0">
                      <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-gray-900">{review.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              {[...Array(review.rating)].map((_, star) => <RiStarFill key={star} size={11} className="text-yellow-400" />)}
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
                  )) : (
                    <p className="text-sm text-gray-400">No reviews available yet for this course.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <div className="sticky top-6 border border-gray-100 rounded-2xl shadow-lg overflow-hidden">
              <div
                className="relative h-44 bg-gray-900 cursor-pointer group"
                onClick={() => goToLesson(previewLesson?._id)}
              >
                <img src={courseImage} alt={activeCourse?.title || "Course preview"}
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

              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-extrabold text-gray-900">${Number(activeCourse?.price ?? 0)}</span>
                  <span className="text-base text-gray-400 line-through">
                    ${Math.round((activeCourse?.originalPrice ?? activeCourse?.price ?? 0) || 0)}
                  </span>
                  <span className="text-xs font-extrabold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                    {activeCourse?.discount || "Best value"}
                  </span>
                </div>

                <button
                  onClick={() => goToLesson(previewLesson?._id)}
                  className="cursor-pointer w-full bg-[#3525d7] hover:bg-[#2a1fb0] transition text-white font-bold py-3.5 rounded-xl shadow-md shadow-indigo-200 text-sm"
                >
                  Start Learning
                </button>

                <button className="cursor-pointer w-full border border-gray-200 hover:border-[#3525d7] hover:text-[#3525d7] text-gray-700 font-semibold py-3.5 rounded-xl transition text-sm">
                  Add to Cart
                </button>

                <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                  <p className="text-xs font-extrabold text-gray-900 uppercase tracking-wide">This course includes:</p>
                  {includes.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="flex items-center gap-2.5 text-xs text-gray-500">
                        <Icon size={14} className="text-[#3525d7] shrink-0" />
                        {item.label}
                      </div>
                    )
                  })}
                </div>

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