import { createAsyncThunk } from "@reduxjs/toolkit";
import { plansAPI } from "../../api/api";

/* category */

export const getPlansCategories = createAsyncThunk(
  "plans/getPlansCategories",
  async () => {
    try {
      const { data } = await plansAPI.getPlansCategories();
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

export const createPlanCategory = createAsyncThunk(
  "plans/createPlanCategory",
  async (payload: { name: string }) => {
    try {
      const { data } = await plansAPI.createPlanCategory(payload);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

export const updatePlanCategory = createAsyncThunk(
  "plans/updatePlanCategory",
  async (payload: { name: string; id: number }) => {
    try {
      const { data } = await plansAPI.updatePlanCategory(payload);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

export const deletePlanCategory = createAsyncThunk(
  "plans/deletePlanCategory",
  async (id: number) => {
    try {
      const { data } = await plansAPI.deletePlanCategory(id);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

/* plans */

export const createPlan = createAsyncThunk(
  "plans/createPlan",
  async (payload: { name: string; categoryId: number }) => {
    try {
      const { data } = await plansAPI.createPlan(payload);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

export const updatePlan = createAsyncThunk(
  "plans/updatePlan",
  async (payload: { name: string; id: number }) => {
    try {
      const { data } = await plansAPI.updatePlan(payload);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);

export const deletePlan = createAsyncThunk(
  "plans/deletePlan",
  async (id: number) => {
    try {
      const { data } = await plansAPI.deletePlan(id);
      return data;
    } catch (error) {
      return await Promise.reject((error as any).response.data.message);
    }
  }
);
