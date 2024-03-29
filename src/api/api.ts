import axios from 'axios'

import {
  CreatePlanPayloadType,
  UpdateGroupPayloadType,
  CreateEntityPayloadType,
  CreateSubjectPayloadType,
  CreateTeacherPayloadType,
  UpdateTeacherPayloadType,
  CreateAuditoryPayloadType,
  UpdateAuditoryPayloadType,
  UpdateEntityNamePayloadType,
  UpdateSubjectNamePayloadType,
  UpdateSubjectHoursPayloadType,
  CreateTeacherCategoryPayloadType,
  UpdateTeacherCategoryPayloadType,
  UpdateAuditoryCategoryPayloadType,
} from './apiTypes'
import { TeachersCategoryType } from '../redux/teachers/teachersTypes'
import { PlanType, PlansCategoriesType, PlansType } from '../redux/plans/plansTypes'
import { AuditoriesTypes, AuditoryCategoriesTypes } from '../redux/auditories/auditoriesTypes'
import { GroupCategoriesType, GroupsType } from '../redux/groups/groupsTypes'

const instanse = axios.create({
  baseURL: 'http://localhost:7777/',
  // headers: {
  //   ['Content-Type']: 'application/json',
  //   responseType: 'json',
  // },
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4444/' : 'https://timetable-server.onrender.com/',
})

// Якщо є токен, вшиваю його в конфігурацію axios
// @ts-ignore
instanse.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = String(
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzA2MzQ3Mjc4LCJleHAiOjE3MDg5MzkyNzh9.l_raUUxomtd7HaPYAiMTm96Con5DeEAY8n5eDjgZbQI'
    )
    // config.headers.Authorization = String(globalThis.localStorage.getItem('token'))

    return config
  }
})

export const auditoriesAPI = {
  /* categories */
  getAuditoryCategories() {
    return instanse.get<AuditoryCategoriesTypes[]>('/auditory-categories')
  },
  createAuditoryCategory(name: string) {
    return instanse.post<AuditoryCategoriesTypes>('/auditory-categories', {
      name,
    })
  },
  updateAuditoryCategory(payload: UpdateAuditoryCategoryPayloadType) {
    return instanse.patch<AuditoryCategoriesTypes>(`/auditory-categories/${payload.id}`, {
      name: payload.name,
    })
  },
  async deleteAuditoryCategory(id: number) {
    return instanse.delete<number>(`/auditory-categories/${id}`)
  },

  /* auditories */

  createAuditory(payload: CreateAuditoryPayloadType) {
    return instanse.post<AuditoriesTypes>('/auditories', payload)
  },
  updateAuditory(payload: UpdateAuditoryPayloadType) {
    const { id, ...rest } = payload
    return instanse.patch<AuditoriesTypes>(`/auditories/${id}`, rest)
  },
  deleteAuditory(id: number) {
    return instanse.delete<number>(`/auditories/${id}`)
  },
}

export const teachersAPI = {
  /* categories */
  getTeachersCategories() {
    return instanse.get<TeachersCategoryType[]>('/teacher-categories')
  },
  createTeacherCategory(payload: CreateTeacherCategoryPayloadType) {
    return instanse.post('/teacher-categories/', { name: payload.name })
  },
  updateTeacherCategory(payload: UpdateTeacherCategoryPayloadType) {
    const { id, ...rest } = payload

    return instanse.patch<TeachersCategoryType>(`/teacher-categories/${id}`, rest)
  },
  deleteTeacherCategory(id: number) {
    return instanse.delete<number>(`/teacher-categories/${id}`)
  },

  /* teachers */
  createTeacher(payload: CreateTeacherPayloadType) {
    return instanse.post('/teachers', payload)
  },
  updateTeacher(payload: UpdateTeacherPayloadType) {
    const { id, ...rest } = payload

    return instanse.patch(`/teachers/${id}`, rest)
  },
  deleteTeacher(id: number) {
    return instanse.delete(`/teachers/${id}`)
  },
}

export const plansAPI = {
  /* categories */
  getPlansCategories() {
    return instanse.get<PlansCategoriesType[]>('/plan-categories')
  },
  createPlanCategory(payload: { name: string }) {
    return instanse.post<PlansCategoriesType>('/plan-categories', payload)
  },
  updatePlanCategory(payload: { name: string; id: number }) {
    return instanse.patch<PlansCategoriesType>(`/plan-categories/${payload.id}`, {
      name: payload.name,
    })
  },
  deletePlanCategory(id: number) {
    return instanse.delete<number>(`/plan-categories/${id}`)
  },

  /* plans */
  createPlan(payload: CreatePlanPayloadType) {
    return instanse.post<PlansType>('/plans', payload)
  },
  updatePlan(payload: { name: string; id: number }) {
    return instanse.patch<PlansType>(`/plans/${payload.id}`, {
      name: payload.name,
    })
  },
  deletePlan(id: number) {
    return instanse.delete<number>(`/plans/${id}`)
  },
}

export const planSubjectsAPI = {
  getSubjects(id: number) {
    return instanse.get<PlanType>(`/plans/${id}`)
  },
  createSubject(payload: CreateSubjectPayloadType) {
    return instanse.post<any>('/plan-subject', payload)
  },
  updateSubjectName(payload: UpdateSubjectNamePayloadType) {
    return instanse.patch<{ id: number; name: string }>('/plan-subject/name', payload)
  },
  updateSubjectHours(payload: UpdateSubjectHoursPayloadType) {
    const { id, ...data } = payload
    return instanse.patch<any>(`/plan-subject/hours/${id}`, data)
  },
  deleteSubject(id: number) {
    return instanse.delete<number>(`/plan-subject/${id}`)
  },
}

export const groupsAPI = {
  /* categories */
  getGroupsCategories() {
    return instanse.get<GroupCategoriesType[]>('/group-categories')
  },
  createGroupCategory(payload: string) {
    return instanse.post<GroupCategoriesType>('/group-categories', { name: payload })
  },
  updateGroupCategory(payload: UpdateEntityNamePayloadType) {
    return instanse.patch<GroupCategoriesType>(`/group-categories/${payload.id}`, {
      name: payload.name,
    })
  },
  deleteGroupCategory(id: number) {
    return instanse.delete<number>(`/group-categories/${id}`)
  },

  /* Groups */
  getGroup(id: string) {
    return instanse.get<GroupsType>(`/groups/${id}`)
  },
  createGroup(payload: CreateEntityPayloadType) {
    return instanse.post<GroupsType>('/groups', payload)
  },

  // don`t exist !!!
  // updateGroupName(payload: UpdateEntityNamePayloadType) {
  //   return instanse.patch<GroupsShortType>(`/groups/name/${payload.id}`, {
  //     name: payload.name,
  //   })
  // },
  updateGroup(payload: UpdateGroupPayloadType) {
    const { id, ...rest } = payload
    return instanse.patch<GroupsType>(`/groups/${id}`, rest)
  },
  deleteGroup(id: number) {
    return instanse.delete<number>(`/groups/${id}`)
  },
}
