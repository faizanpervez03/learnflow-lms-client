import { apiRequest } from "./api"

export const becomeInstructor = () =>
  apiRequest("/users/become-instructor", { method: "POST" })