import API from "@/lib/axios-client"

export const joinSessionApiFn = async (sessionId:string) => {
  const response = await API.post(`/session/join/${sessionId}`)
  return response.data
}