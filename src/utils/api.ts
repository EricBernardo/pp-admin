import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const get = async <T>(url: string, params?: object): Promise<T> => {
  const response = await api.get<T>(url, { params })
  return response.data
}

export const post = async <T>(url: string, data: object): Promise<T> => {
  const response = await api.post<T>(url, data)
  return response.data
}

export const put = async <T>(url: string, data: object): Promise<T> => {
  const response = await api.put<T>(url, data)
  return response.data
}

export const del = async <T>(url: string): Promise<T> => {
  const response = await api.delete<T>(url)
  return response.data
}

export default api
