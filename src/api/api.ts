import axios from 'axios'
import { AuditoryCategoriesTypes } from '../redux/auditories/auditoriesTypes'

const instanse = axios.create({
  baseURL: 'http://localhost:7777/',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4444/' : 'https://timetable-server.onrender.com/',
})

// Якщо є токен, вшиваю його в конфігурацію axios
// instanse.interceptors.request.use((config) => {
//   if (config.headers) {
//     config.headers.Authorization = String(globalThis.localStorage.getItem('token'))

//     return config
//   }
// })

export const auditoriesAPI = {
  getAllCategories(id: number) {
    return instanse.get<AuditoryCategoriesTypes[]>(`/auditory-categories/${id}`)
  },
}
