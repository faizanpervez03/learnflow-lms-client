import { apiRequest } from "./api"

export const registerUser = (data) =>
  apiRequest("/auth/register", {
    method: "POST",
    data,
  })

export const loginUser = (data) =>
  apiRequest("/auth/login", {
    method: "POST",
    data,
  })

const authService = {
  registerUser,
  loginUser,
}

export default authService