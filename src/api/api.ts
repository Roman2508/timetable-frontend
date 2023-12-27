import axios from 'axios'
import { AuditoryCategoriesTypes } from '../redux/auditories/auditoriesTypes'

const instanse = axios.create({
  baseURL: 'http://localhost:7777/',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4444/' : 'https://timetable-server.onrender.com/',
})

// Якщо є токен, вшиваю його в конфігурацію axios
// @ts-ignore
instanse.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = String(
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzAzNjgwMjI5LCJleHAiOjE3MDYyNzIyMjl9.Qmd-W74a1o08Ft5KicmoCfuai6D2XUPSmlfFv29aPOg'
    )
    // config.headers.Authorization = String(globalThis.localStorage.getItem('token'))

    return config
  }
})

export const auditoriesAPI = {
  getAuditoryCategories() {
    return instanse.get<AuditoryCategoriesTypes[]>('/auditory-categories')
  },

  createAuditoryCategory(name: string) {
    return instanse.post<AuditoryCategoriesTypes>('/auditory-categories', { name })
  },
}
