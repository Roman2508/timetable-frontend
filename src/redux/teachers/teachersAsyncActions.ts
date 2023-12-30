import { createAsyncThunk } from "@reduxjs/toolkit";
import { teachersAPI } from "../../api/api";
import {
  CreateTeacherCategoryPayloadType,
  CreateTeacherPayloadType,
  UpdateTeacherCategoryPayloadType,
  UpdateTeacherPayloadType,
} from "../../api/apiTypes";

/* categories */

export const getTeachersCategories = createAsyncThunk(
  "auditory-categories/getTeachersCategories",
  async () => {
    try {
      const { data } = await teachersAPI.getTeachersCategories();
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

export const createTeacherCategory = createAsyncThunk(
  "auditory-categories/createTeacherCategory",
  async (payload: CreateTeacherCategoryPayloadType) => {
    try {
      const { data } = await teachersAPI.createTeacherCategory(payload);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

export const updateTeacherCategory = createAsyncThunk(
  "auditory-categories/updateTeacherCategory",
  async (payload: UpdateTeacherCategoryPayloadType) => {
    try {
      const { data } = await teachersAPI.updateTeacherCategory(payload);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

export const deleteTeacherCategory = createAsyncThunk(
  "auditory-categories/deleteTeacherCategory",
  async (id: number) => {
    try {
      const { data } = await teachersAPI.deleteTeacherCategory(id);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

/* teachers */

export const createTeacher = createAsyncThunk(
  "auditory-categories/createTeacher",
  async (payload: CreateTeacherPayloadType) => {
    try {
      const { data } = await teachersAPI.createTeacher(payload);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

export const updateTeacher = createAsyncThunk(
  "auditory-categories/updateTeacher",
  async (payload: UpdateTeacherPayloadType) => {
    try {
      const { data } = await teachersAPI.updateTeacher(payload);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  "auditory-categories/deleteTeacher",
  async (id: number) => {
    try {
      const { data } = await teachersAPI.deleteTeacher(id);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);
