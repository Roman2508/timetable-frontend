/* Auditories */

import { TeachersType } from "../redux/teachers/teachersTypes";

export type CreateAuditoryPayloadType = {
  name: string;
  seatsNumber: number;
  category: number;
};

export type UpdateAuditoryCategoryPayloadType = {
  id: number;
  name: string;
};

export type UpdateAuditoryPayloadType = {
  id: Number;
} & CreateAuditoryPayloadType;

/* Teachers */

export type CreateTeacherCategoryPayloadType = {
  name: string;
};

export type UpdateTeacherCategoryPayloadType = {
  id: Number;
} & CreateTeacherCategoryPayloadType;

export type CreateTeacherPayloadType = {
  category: number;
} & Omit<TeachersType, "id" | "category">;

export type UpdateTeacherPayloadType = {
  category: number;
} & Omit<TeachersType, "category">;

/* Plans */

export type CreatePlanPayloadType = {
  name: string;
  categoryId: number;
};
