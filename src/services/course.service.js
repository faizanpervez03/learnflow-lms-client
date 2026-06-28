import { apiRequest } from "./api"

const sortMap = {
  Newest: "newest",
  "Highest Rated": "highest-rated",
  "Price: Low to High": "price-low-high",
  "Price: High to Low": "price-high-low",
  "Most Popular": "highest-rated",
}

export const getCourses = async ({ category, search, sortBy, page = 1 }) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: "12",
    sort: sortMap[sortBy] || "newest",
  })
  if (category && category !== "All Categories") params.set("category", category)
  if (search?.trim()) params.set("search", search.trim())
  return apiRequest(`/courses?${params.toString()}`)
}

export const getCourseById = async (courseId) => apiRequest(`/courses/${courseId}`)
export const getCourseLessons = async (courseId) => apiRequest(`/lessons/course/${courseId}`)
export const getInstructorCourses = async () => apiRequest("/courses/my-courses")

export const createCourse = async (data) => apiRequest("/courses", { method: "POST", data })

export const updateBasicInfo = async (courseId, data) =>
  apiRequest(`/courses/${courseId}/basic-info`, { method: "PATCH", data })

export const updateCurriculum = async (courseId, curriculum) =>
  apiRequest(`/courses/${courseId}/curriculum`, { method: "PUT", data: { curriculum } })

export const updatePricing = async (courseId, pricing) =>
  apiRequest(`/courses/${courseId}/pricing`, { method: "PUT", data: { pricing } })

export const publishCourse = async (courseId) =>
  apiRequest(`/courses/${courseId}/publish`, { method: "PATCH" })

export const deleteCourse = async (courseId) =>
  apiRequest(`/courses/${courseId}`, { method: "DELETE" })