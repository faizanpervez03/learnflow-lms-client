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

// --- Auto-refresh on token expiry ---
let isRefreshing = false
let refreshSubscribers = []

const onRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken))
  refreshSubscribers = []
}

const forceLogout = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("user")
  window.location.href = "/login"
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const status = error.response?.status

    if (!status || status !== 401 || originalRequest._retry || originalRequest.url?.includes("/auth/refresh-token")) {
      return Promise.reject(error)
    }

    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken) {
      forceLogout()
      return Promise.reject(error)
    }

    originalRequest._retry = true

    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshSubscribers.push((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          resolve(apiClient(originalRequest))
        })
      })
    }

    isRefreshing = true
    try {
      const { data } = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken })
      const { accessToken, refreshToken: newRefreshToken } = data.data

      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", newRefreshToken)

      onRefreshed(accessToken)
      originalRequest.headers.Authorization = `Bearer ${accessToken}`
      return apiClient(originalRequest)
    } catch (refreshError) {
      forceLogout()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

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

    throw new ApiClientError(error?.message || "Request failed", 0, [], error)
  }
}

export { API_URL }