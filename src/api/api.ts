import {
  CreateAuditoryPayloadType,
  UpdateAuditoryCategoryPayloadType,
  UpdateAuditoryPayloadType,
  CreateTeacherCategoryPayloadType,
  UpdateTeacherCategoryPayloadType,
  CreateTeacherPayloadType,
  UpdateTeacherPayloadType,
} from "./apiTypes";
import axios from "axios";
import {
  AuditoriesTypes,
  AuditoryCategoriesTypes,
} from "../redux/auditories/auditoriesTypes";
import { TeachersCategoryType } from "../redux/teachers/teachersTypes";

const instanse = axios.create({
  baseURL: "http://localhost:7777/",
  // headers: {
  //   ['Content-Type']: 'application/json',
  //   responseType: 'json',
  // },
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4444/' : 'https://timetable-server.onrender.com/',
});

// Якщо є токен, вшиваю його в конфігурацію axios
// @ts-ignore
instanse.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = String(
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzAzNjgwMjI5LCJleHAiOjE3MDYyNzIyMjl9.Qmd-W74a1o08Ft5KicmoCfuai6D2XUPSmlfFv29aPOg"
    );
    // config.headers.Authorization = String(globalThis.localStorage.getItem('token'))

    return config;
  }
});

export const auditoriesAPI = {
  /* categories */
  getAuditoryCategories() {
    return instanse.get<AuditoryCategoriesTypes[]>("/auditory-categories");
  },

  createAuditoryCategory(name: string) {
    return instanse.post<AuditoryCategoriesTypes>("/auditory-categories", {
      name,
    });
  },

  updateAuditoryCategory(payload: UpdateAuditoryCategoryPayloadType) {
    return instanse.patch<AuditoryCategoriesTypes>(
      `/auditory-categories/${payload.id}`,
      { name: payload.name }
    );
  },

  async deleteAuditoryCategory(id: number) {
    return instanse.delete<number>(`/auditory-categories/${id}`);
  },

  /* auditories */

  createAuditory(payload: CreateAuditoryPayloadType) {
    return instanse.post<AuditoriesTypes>("/auditories", payload);
  },

  updateAuditory(payload: UpdateAuditoryPayloadType) {
    const { id, ...rest } = payload;
    return instanse.patch<AuditoriesTypes>(`/auditories/${id}`, rest);
  },

  deleteAuditory(id: number) {
    return instanse.delete<number>(`/auditories/${id}`);
  },
};

export const teachersAPI = {
  /* categories */
  getTeachersCategories() {
    return instanse.get<TeachersCategoryType[]>("/teacher-categories");
  },

  createTeacherCategory(payload: CreateTeacherCategoryPayloadType) {
    return instanse.post("/teacher-categories/", { name: payload.name });
  },

  updateTeacherCategory(payload: UpdateTeacherCategoryPayloadType) {
    const { id, ...rest } = payload;

    return instanse.patch<TeachersCategoryType>(
      `/teacher-categories/${id}`,
      rest
    );
  },

  deleteTeacherCategory(id: number) {
    return instanse.delete<number>(`/teacher-categories/${id}`);
  },

  /* teachers */
  createTeacher(payload: CreateTeacherPayloadType) {
    return instanse.post("/teachers", payload);
  },

  updateTeacher(payload: UpdateTeacherPayloadType) {
    const { id, ...rest } = payload;

    return instanse.patch(`/teachers/${id}`, rest);
  },

  deleteTeacher(id: number) {
    return instanse.delete(`/teachers/${id}`);
  },
};
