import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import StepIndicator from "../../components/instructorDashboardComponents/courseCreation/StepIndicator"
import StepBasicInfo from "../../components/instructorDashboardComponents/courseCreation/StepBasicInfo"
import StepCurriculum from "../../components/instructorDashboardComponents/courseCreation/StepCurriculum"
import StepPricing from "../../components/instructorDashboardComponents/courseCreation/StepPricing"
import StepPublish from "../../components/instructorDashboardComponents/courseCreation/StepPublish"
import { getCourseById } from "../../services/course.service"

const STEPS = ["Basic Info", "Curriculum", "Pricing", "Publish"]
const DRAFT_KEY = "learnflow_course_draft"

const CreateCourse = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [course, setCourse] = useState(null) // populated once draft is created in Step 1
  const [restoring, setRestoring] = useState(true)

  // On mount: check if there's a draft saved from before a refresh
  useEffect(() => {
    const restoreDraft = async () => {
      const saved = localStorage.getItem(DRAFT_KEY)
      if (!saved) {
        setRestoring(false)
        return
      }

      try {
        const { courseId, step: savedStep } = JSON.parse(saved)
        if (!courseId) {
          setRestoring(false)
          return
        }

        const res = await getCourseById(courseId)
        setCourse(res.data)
        setStep(savedStep || 1)
      } catch {
        // draft course no longer exists or fetch failed — clear stale pointer and start fresh
        localStorage.removeItem(DRAFT_KEY)
      } finally {
        setRestoring(false)
      }
    }

    restoreDraft()
  }, [])

  // Persist courseId + step any time either changes, so a refresh can resume
  useEffect(() => {
    if (course?._id) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ courseId: course._id, step }))
    }
  }, [course, step])

  const goNext = (updatedCourse) => {
    if (updatedCourse) setCourse(updatedCourse)
    setStep((s) => Math.min(s + 1, STEPS.length))
  }
  const goBack = () => setStep((s) => Math.max(s - 1, 1))

  const goToDashboard = () => {
    localStorage.removeItem(DRAFT_KEY) // course is published, no need to resume anymore
    navigate("/instructordashboard/courses")
  }

  if (restoring) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-gray-400">Restoring your draft...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto px-4 sm:px-0">
      <StepIndicator steps={STEPS} currentStep={step} />

      {step === 1 && <StepBasicInfo course={course} onNext={goNext} />}

      {step === 2 && course && (
        <StepCurriculum course={course} onNext={goNext} onBack={goBack} />
      )}

      {step === 3 && course && (
        <StepPricing course={course} onNext={goNext} onBack={goBack} />
      )}

      {step === 4 && course && (    
        <StepPublish course={course} onBack={goBack} onPublished={goToDashboard} />
      )}
    </div>
  )
}

export default CreateCourse