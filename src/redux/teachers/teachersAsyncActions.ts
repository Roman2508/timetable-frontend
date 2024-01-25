import { createAsyncThunk } from "@reduxjs/toolkit"
import { teachersAPI } from "../../api/api"
import {
  CreateTeacherCategoryPayloadType,
  CreateTeacherPayloadType,
  UpdateTeacherCategoryPayloadType,
  UpdateTeacherPayloadType,
} from "../../api/apiTypes"
import { setAppAlert } from "../appStatus/appStatusSlice"

/* categories */

export const getTeachersCategories = createAsyncThunk(
  "teachers-categories/getTeachersCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await teachersAPI.getTeachersCategories()
      thunkAPI.dispatch(setAppAlert({ message: "Викладачів завантажено", status: "success" }))
      return data
    } catch (error) {
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
      // return await Promise.reject((error as any).response.data.message)
    }
  }
)

export const createTeacherCategory = createAsyncThunk(
  "teachers-categories/createTeacherCategory",
  async (payload: CreateTeacherCategoryPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teachersAPI.createTeacherCategory(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Категорію створено", status: "success" }))
      return data
    } catch (error) {
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

export const updateTeacherCategory = createAsyncThunk(
  "teachers-categories/updateTeacherCategory",
  async (payload: UpdateTeacherCategoryPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teachersAPI.updateTeacherCategory(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Категорію оновлено", status: "success" }))
      return data
    } catch (error) {
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

export const deleteTeacherCategory = createAsyncThunk(
  "teachers-categories/deleteTeacherCategory",
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teachersAPI.deleteTeacherCategory(id)
      thunkAPI.dispatch(setAppAlert({ message: "Категорію видалено", status: "success" }))
      return data
    } catch (error) {
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

/* teachers */

export const createTeacher = createAsyncThunk(
  "teachers/createTeacher",
  async (payload: CreateTeacherPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teachersAPI.createTeacher(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Викладача створено", status: "success" }))
      return data
    } catch (error) {
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

export const updateTeacher = createAsyncThunk(
  "teachers/updateTeacher",
  async (payload: UpdateTeacherPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teachersAPI.updateTeacher(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Викладача оновлено", status: "success" }))
      return data
    } catch (error) {
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

export const deleteTeacher = createAsyncThunk(
  "teachers/deleteTeacher",
  async (id: number, thunkAPI) => {
    try {
      const { data } = await teachersAPI.deleteTeacher(id)
      thunkAPI.dispatch(setAppAlert({ message: "Викладача видалено", status: "success" }))
      return data
    } catch (error) {
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)
