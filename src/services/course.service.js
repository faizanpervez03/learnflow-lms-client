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

  if (category && category !== "All Categories") {
    params.set("category", category)
  }

  if (search?.trim()) {
    params.set("search", search.trim())
  }

  return apiRequest(`/courses?${params.toString()}`)
}

export const getCourseById = async (courseId) => {
  return apiRequest(`/courses/${courseId}`)
}

export const getCourseLessons = async (courseId) => {
  return apiRequest(`/lessons/course/${courseId}`)
}
