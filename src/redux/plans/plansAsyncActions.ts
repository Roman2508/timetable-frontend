import { createAsyncThunk } from "@reduxjs/toolkit"
import { plansAPI } from "../../api/api"
import { setLoadingStatus } from "./plansSlice"
import { LoadingStatusTypes } from "../appTypes"
import { setAppAlert } from "../appStatus/appStatusSlice"

/* category */

export const getPlansCategories = createAsyncThunk(
  "plans/getPlansCategories",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await plansAPI.getPlansCategories()
      thunkAPI.dispatch(setAppAlert({ message: "Плани завантажено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

export const createPlanCategory = createAsyncThunk(
  "plans/createPlanCategory",
  async (payload: { name: string }, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await plansAPI.createPlanCategory(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Категорію створено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

export const updatePlanCategory = createAsyncThunk(
  "plans/updatePlanCategory",
  async (payload: { name: string; id: number }, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await plansAPI.updatePlanCategory(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Категорію оновлено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

export const deletePlanCategory = createAsyncThunk(
  "plans/deletePlanCategory",
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await plansAPI.deletePlanCategory(id)
      thunkAPI.dispatch(setAppAlert({ message: "Категорію видалено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

/* plans */

export const createPlan = createAsyncThunk(
  "plans/createPlan",
  async (payload: { name: string; categoryId: number }, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await plansAPI.createPlan(payload)
      thunkAPI.dispatch(setAppAlert({ message: "План створено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

export const updatePlan = createAsyncThunk(
  "plans/updatePlan",
  async (payload: { name: string; id: number }, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await plansAPI.updatePlan(payload)
      thunkAPI.dispatch(setAppAlert({ message: "План оновлено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

export const deletePlan = createAsyncThunk("plans/deletePlan", async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

  try {
    const { data } = await plansAPI.deletePlan(id)
    thunkAPI.dispatch(setAppAlert({ message: "План видалено", status: "success" }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({ message: (error as any).response.data.message, status: "error" })
    )
    throw error
  }
})
