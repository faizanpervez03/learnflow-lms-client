import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"
const DEFAULT_TIMEOUT_MS = 10000

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: DEFAULT_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
})


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})



const normalizeErrors = (errors) => {
  if (Array.isArray(errors)) return errors
  if (errors) return [errors]
  return []
}

export class ApiClientError extends Error {
  constructor(message, statusCode, errors = [], cause) {
    super(message)
    this.name = "ApiClientError"
    this.statusCode = statusCode
    this.errors = errors

    if (cause) {
      this.cause = cause
    }
  }
}

export const apiRequest = async (path, options = {}) => {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, headers, ...requestOptions } = options

  try {
    const response = await apiClient.request({
      url: path,
      timeout: timeoutMs,
      headers: {
        ...headers,
      },
      ...requestOptions,
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status ?? 0
      const payload = error.response?.data

      throw new ApiClientError(
        payload?.message || error.message || "Request failed",
        statusCode,
        normalizeErrors(payload?.errors),
        error,
      )
    }

    throw new ApiClientError(
      error?.message || "Request failed",
      0,
      [],
      error,
    )
  }
}