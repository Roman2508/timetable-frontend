import { createAsyncThunk } from "@reduxjs/toolkit";
import { auditoriesAPI } from "../../api/api";
import {
  CreateAuditoryPayloadType,
  UpdateAuditoryCategoryPayloadType,
  UpdateAuditoryPayloadType,
} from "../../api/apiTypes";

/* categories */
export const getAuditoryCategories = createAsyncThunk(
  "auditory-categories/getAuditoryCategories",
  async () => {
    try {
      const { data } = await auditoriesAPI.getAuditoryCategories();
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

export const createAuditoryCategory = createAsyncThunk(
  "auditory-categories/createAuditoryCategory",
  async (name: string) => {
    try {
      const { data } = await auditoriesAPI.createAuditoryCategory(name);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

export const updateAuditoryCategory = createAsyncThunk(
  "auditory-categories/updateAuditoryCategory",
  async (payload: UpdateAuditoryCategoryPayloadType) => {
    try {
      const { data } = await auditoriesAPI.updateAuditoryCategory(payload);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

export const deleteAuditoryCategory = createAsyncThunk(
  "auditory-categories/deleteAuditoryCategory",
  async (id: number) => {
    try {
      const { data } = await auditoriesAPI.deleteAuditoryCategory(id);
      return data;
    } catch (error) {
      // console.log('async action: ', (error as any).response)
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

/* auditories */

export const createAuditory = createAsyncThunk(
  "auditory-categories/createAuditory",
  async (payload: CreateAuditoryPayloadType) => {
    try {
      const { data } = await auditoriesAPI.createAuditory(payload);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

export const updateAuditory = createAsyncThunk(
  "auditory-categories/updateAuditory",
  async (payload: UpdateAuditoryPayloadType) => {
    try {
      const { data } = await auditoriesAPI.updateAuditory(payload);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

export const deleteAuditory = createAsyncThunk(
  "auditory-categories/deleteAuditory",
  async (id: number) => {
    try {
      const { data } = await auditoriesAPI.deleteAuditory(id);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);
