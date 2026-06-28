import React, { useEffect, useState } from "react"
import { FiBookOpen, FiImage, FiPlus, FiUploadCloud, FiX } from "react-icons/fi"
import { createCourse, updateBasicInfo } from "../../../services/course.service"
import { uploadFile } from "../../../services/upload.service"

const UNSAVED_KEY = "learnflow_basic_info_unsaved"

const getInitialState = (course) => {
  if (course) {
    return {
      form: {
        title: course.title || "",
        subtitle: course.subtitle || "",
        description: course.description || "",
        category: course.category || "",
        level: course.level || "beginner",
        thumbnail: course.thumbnail || "",
      },
      outcomes: course.outcomes?.length ? course.outcomes : [""],
      requirements: course.requirements?.length ? course.requirements : [""],
    }
  }

  // No draft on the server yet — check if there's unsaved typing from before a refresh
  const saved = localStorage.getItem(UNSAVED_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      // fall through to blank state
    }
  }

  return {
    form: { title: "", subtitle: "", description: "", category: "", level: "beginner", thumbnail: "" },
    outcomes: [""],
    requirements: [""],
  }
}

const StepBasicInfo = ({ course, onNext }) => {
  const initial = getInitialState(course)
  const [form, setForm] = useState(initial.form)
  const [outcomes, setOutcomes] = useState(initial.outcomes)
  const [requirements, setRequirements] = useState(initial.requirements)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(null)

  // Autosave to localStorage on every change, ONLY while there's no server draft yet
  useEffect(() => {
    if (course?._id) return // already a real draft in the DB, no need for the local fallback
    localStorage.setItem(UNSAVED_KEY, JSON.stringify({ form, outcomes, requirements }))
  }, [form, outcomes, requirements, course])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const updateListItem = (list, setList, index, value) => {
    const updated = [...list]
    updated[index] = value
    setList(updated)
  }
  const addListItem = (list, setList) => setList([...list, ""])
  const removeListItem = (list, setList, index) => setList(list.filter((_, i) => i !== index))

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError("")
    setUploadProgress(0)
    try {
      const result = await uploadFile(file, "thumbnail", setUploadProgress)
      setForm((f) => ({ ...f, thumbnail: result.url }))
    } catch (err) {
      setError(err.message || "Thumbnail upload failed")
    } finally {
      setUploadProgress(null)
    }
  }

  const saveStep = async ({ advance }) => {
    setError("")
    if (!form.title || !form.description || !form.category) {
      setError("Title, description and category are required")
      return
    }
    setLoading(true)
    try {
      const payload = {
        ...form,
        outcomes: outcomes.filter((o) => o.trim() !== ""),
        requirements: requirements.filter((r) => r.trim() !== ""),
      }
      const res = course?._id
        ? await updateBasicInfo(course._id, payload)
        : await createCourse(payload)

      localStorage.removeItem(UNSAVED_KEY) // real draft now exists server-side, drop the local fallback

      if (advance) onNext(res.data)
    } catch (err) {
      setError(err.message || "Failed to save course")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Create New Course</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Your course will be saved as a draft. Publish it once you're ready.
        </p>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</div>
      )}

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Course Thumbnail</label>
        <div className="flex items-center gap-4">
          <div className="w-32 h-20 rounded-lg bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
            {form.thumbnail ? (
              <img src={form.thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
            ) : (
              <FiImage className="text-gray-300" size={22} />
            )}
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-indigo-50 transition">
            <FiUploadCloud size={15} />
            {uploadProgress !== null ? `Uploading ${uploadProgress}%` : "Upload Image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} />
          </label>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Course Title</label>
        <div className="relative">
          <FiBookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Advanced UI Design Principles"
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            minLength={3}
            maxLength={140}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Subtitle</label>
        <input
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
          placeholder="A short one-liner about the course"
          maxLength={240}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="What will students learn in this course?"
          rows={4}
          maxLength={6000}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Design, Development"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Level</label>
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">What students will learn</label>
        {outcomes.map((outcome, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              value={outcome}
              onChange={(e) => updateListItem(outcomes, setOutcomes, i, e.target.value)}
              placeholder={`Outcome ${i + 1}`}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {outcomes.length > 1 && (
              <button type="button" onClick={() => removeListItem(outcomes, setOutcomes, i)} className="text-gray-400 hover:text-red-500 cursor-pointer">
                <FiX size={16} />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addListItem(outcomes, setOutcomes)} className="flex items-center gap-1.5 text-sm text-indigo-600 font-medium hover:underline cursor-pointer">
          <FiPlus size={14} /> Add outcome
        </button>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Requirements</label>
        {requirements.map((req, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              value={req}
              onChange={(e) => updateListItem(requirements, setRequirements, i, e.target.value)}
              placeholder={`Requirement ${i + 1}`}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {requirements.length > 1 && (
              <button type="button" onClick={() => removeListItem(requirements, setRequirements, i)} className="text-gray-400 hover:text-red-500 cursor-pointer">
                <FiX size={16} />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addListItem(requirements, setRequirements)} className="flex items-center gap-1.5 text-sm text-indigo-600 font-medium hover:underline cursor-pointer">
          <FiPlus size={14} /> Add requirement
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2 border-t border-gray-100">
        <button
          type="button"
          disabled={loading}
          onClick={() => saveStep({ advance: false })}
          className="px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-60 cursor-pointer"
        >
          Save Draft
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => saveStep({ advance: true })}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Saving..." : "Next Step: Curriculum →"}
        </button>
      </div>
    </div>
  )
}

export default StepBasicInfo