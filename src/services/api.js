  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"
  const DEFAULT_TIMEOUT_MS = 900

  export class ApiClientError extends Error {
    constructor(message, statusCode, errors = []) {
      super(message)
      this.statusCode = statusCode
      this.errors = errors
    }
  }

  export const apiRequest = async (path, options = {}) => {
    const { timeoutMs = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs)

    try {
      const response = await fetch(`${API_URL}${path}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...fetchOptions.headers,
        },
        ...fetchOptions,
        signal: fetchOptions.signal || controller.signal,
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        throw new ApiClientError(
          payload?.message || "Request failed",
          response.status,
          payload?.errors || [],
        )
      }

      return payload
    } finally {
      window.clearTimeout(timeoutId)
    }
  }
