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
  "teachers-categories/getTeachersCategories",
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
  "teachers-categories/createTeacherCategory",
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
  "teachers-categories/updateTeacherCategory",
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
  "teachers-categories/deleteTeacherCategory",
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
  "teachers/createTeacher",
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
  "teachers/updateTeacher",
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
  "teachers/deleteTeacher",
  async (id: number) => {
    try {
      const { data } = await teachersAPI.deleteTeacher(id);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);
