export const baseURL =
  import.meta.env.MODE === "development" ? `${import.meta.env.VITE_API_BASE_URL}/api` : "/api";
