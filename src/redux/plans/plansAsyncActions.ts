import { createAsyncThunk } from "@reduxjs/toolkit";
import { plansAPI } from "../../api/api";

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
