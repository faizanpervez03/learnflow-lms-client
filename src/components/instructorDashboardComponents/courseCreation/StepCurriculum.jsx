import React, { useState } from "react"
import { FiChevronDown, FiChevronUp, FiFileText, FiPlus, FiTrash2, FiUploadCloud, FiVideo } from "react-icons/fi"
import { updateCurriculum } from "../../../services/course.service"
import { uploadFile } from "../../../services/upload.service"

const emptyLesson = () => ({ title: "", type: "video", duration: "", contentUrl: "", order: 0 })

const StepCurriculum = ({ course, onNext, onBack }) => {
  const [sections, setSections] = useState(
    course.curriculum?.length
      ? course.curriculum
      : [{ title: "Section 1", order: 0, lessons: [] }],
  )
  const [openSection, setOpenSection] = useState(0)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [uploadingKey, setUploadingKey] = useState(null) // `${sectionIdx}-${lessonIdx}`
  const [uploadProgress, setUploadProgress] = useState(0)

  const addSection = () => {
    setSections([...sections, { title: `Section ${sections.length + 1}`, order: sections.length, lessons: [] }])
    setOpenSection(sections.length)
  }

  const removeSection = (idx) => setSections(sections.filter((_, i) => i !== idx))

  const updateSectionTitle = (idx, title) => {
    const updated = [...sections]
    updated[idx].title = title
    setSections(updated)
  }

  const addLesson = (sectionIdx) => {
    const updated = [...sections]
    updated[sectionIdx].lessons.push(emptyLesson())
    setSections(updated)
  }

  const removeLesson = (sectionIdx, lessonIdx) => {
    const updated = [...sections]
    updated[sectionIdx].lessons = updated[sectionIdx].lessons.filter((_, i) => i !== lessonIdx)
    setSections(updated)
  }

  const updateLesson = (sectionIdx, lessonIdx, field, value) => {
    const updated = [...sections]
    updated[sectionIdx].lessons[lessonIdx][field] = value
    setSections(updated)
  }

  const handleLessonFileUpload = async (sectionIdx, lessonIdx, file) => {
    const key = `${sectionIdx}-${lessonIdx}`
    setUploadingKey(key)
    setUploadProgress(0)
    setError("")
    try {
      const result = await uploadFile(file, "lesson", setUploadProgress)
      const updated = [...sections]
      updated[sectionIdx].lessons[lessonIdx].contentUrl = result.url
      if (result.duration) {
        const mins = Math.floor(result.duration / 60)
        const secs = result.duration % 60
        updated[sectionIdx].lessons[lessonIdx].duration = `${mins}:${String(secs).padStart(2, "0")}`
      }
      setSections(updated)
    } catch (err) {
      setError(err.message || "File upload failed")
    } finally {
      setUploadingKey(null)
    }
  }

  const saveStep = async ({ advance }) => {
    setError("")
    if (!sections.length || sections.every((s) => s.lessons.length === 0)) {
      setError("Add at least one section with at least one lesson")
      return
    }
    setLoading(true)
    try {
      const res = await updateCurriculum(course._id, sections)
      if (advance) onNext(res.data)
    } catch (err) {
      setError(err.message || "Failed to save curriculum")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Course Curriculum</h2>
        <p className="text-sm text-gray-400 mt-0.5">Organize your course content into sections and lessons.</p>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</div>
      )}

      <div className="flex flex-col gap-3">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xs font-semibold text-gray-400 uppercase shrink-0">Section {sIdx + 1}</span>
                <input
                  value={section.title}
                  onChange={(e) => updateSectionTitle(sIdx, e.target.value)}
                  className="flex-1 min-w-0 bg-transparent text-sm font-semibold text-indigo-600 focus:outline-none truncate"
                />
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-2">
                <button type="button" onClick={() => removeSection(sIdx)} className="text-gray-400 hover:text-red-500 cursor-pointer">
                  <FiTrash2 size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpenSection(openSection === sIdx ? -1 : sIdx)}
                  className="text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  {openSection === sIdx ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                </button>
              </div>
            </div>

            {openSection === sIdx && (
              <div className="p-4 flex flex-col gap-3">
                {section.lessons.map((lesson, lIdx) => {
                  const key = `${sIdx}-${lIdx}`
                  const isUploading = uploadingKey === key
                  return (
                    <div key={lIdx} className="border border-gray-100 rounded-lg p-3 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        {lesson.type === "video" ? (
                          <FiVideo className="text-indigo-500 shrink-0" size={15} />
                        ) : (
                          <FiFileText className="text-amber-500 shrink-0" size={15} />
                        )}
                        <input
                          value={lesson.title}
                          onChange={(e) => updateLesson(sIdx, lIdx, "title", e.target.value)}
                          placeholder={`Lesson ${lIdx + 1} title`}
                          className="flex-1 text-sm border-b border-transparent focus:border-indigo-300 focus:outline-none py-1"
                        />
                        <button type="button" onClick={() => removeLesson(sIdx, lIdx)} className="text-gray-400 hover:text-red-500 cursor-pointer shrink-0">
                          <FiTrash2 size={14} />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={lesson.type}
                          onChange={(e) => updateLesson(sIdx, lIdx, "type", e.target.value)}
                          className="text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none"
                        >
                          <option value="video">Video</option>
                          <option value="article">Article</option>
                          <option value="quiz">Quiz</option>
                        </select>

                        <input
                          value={lesson.duration}
                          onChange={(e) => updateLesson(sIdx, lIdx, "duration", e.target.value)}
                          placeholder="Duration e.g. 05:20"
                          className="text-xs border border-gray-200 rounded-md px-2 py-1.5 w-32 focus:outline-none"
                        />

                        {lesson.type !== "quiz" && (
                          <label className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 rounded-md px-2 py-1.5 cursor-pointer hover:bg-indigo-50">
                            <FiUploadCloud size={13} />
                            {isUploading ? `Uploading ${uploadProgress}%` : lesson.contentUrl ? "Replace File" : "Upload File"}
                            <input
                              type="file"
                              accept={lesson.type === "video" ? "video/*" : ".pdf,image/*,.doc,.docx"}
                              className="hidden"
                              onChange={(e) => e.target.files?.[0] && handleLessonFileUpload(sIdx, lIdx, e.target.files[0])}
                            />
                          </label>
                        )}

                        {lesson.contentUrl && (
                          <span className="text-xs text-green-600 truncate max-w-[140px]">✓ File attached</span>
                        )}
                      </div>
                    </div>
                  )
                })}

                <button
                  type="button"
                  onClick={() => addLesson(sIdx)}
                  className="flex items-center justify-center gap-1.5 text-sm text-gray-500 border border-dashed border-gray-200 rounded-lg py-2 hover:border-indigo-300 hover:text-indigo-600 transition cursor-pointer"
                >
                  <FiPlus size={14} /> Add Lesson
                </button>
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addSection}
          className="flex items-center gap-1.5 text-sm text-indigo-600 font-medium hover:underline cursor-pointer self-start"
        >
          <FiPlus size={14} /> Add Section
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2 border-t border-gray-100">
        <div className="flex gap-3">
          <button type="button" onClick={onBack} className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:underline cursor-pointer">
            ← Back to Basics
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => saveStep({ advance: false })}
            className="px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-60 cursor-pointer"
          >
            Save Draft
          </button>
        </div>
        <button
          type="button"
          disabled={loading}
          onClick={() => saveStep({ advance: true })}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Saving..." : "Next Step: Pricing →"}
        </button>
      </div>
    </div>
  )
}

export default StepCurriculum