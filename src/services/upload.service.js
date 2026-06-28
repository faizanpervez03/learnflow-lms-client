import { apiRequest } from "./api"

export const uploadFile = async (file, folder = "lesson", onProgress) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("folder", folder)

  const response = await apiRequest("/uploads", {
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeoutMs: 5 * 60 * 1000, // 5 min — lesson videos can be large, default 10s timeout will kill big uploads
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        onProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
      }
    },
  })

  return response.data
}