import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import {
  createTeacher,
  createTeacherCategory,
  deleteTeacher,
  deleteTeacherCategory,
  getTeachersCategories,
  updateTeacher,
  updateTeacherCategory,
} from "./teachersAsyncActions"
import { TeachersCategoryType, TeachersInitialState, TeachersType } from "./teachersTypes"
import { LoadingStatusTypes } from "../appTypes"

const teachersInitialState: TeachersInitialState = {
  teachersCategories: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const teachersSlice = createSlice({
  name: "teachers",
  initialState: teachersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    /* --- categories --- */
    builder.addCase(
      getTeachersCategories.fulfilled,
      (state, action: PayloadAction<TeachersCategoryType[]>) => {
        state.teachersCategories = action.payload
        state.loadingStatus = LoadingStatusTypes.SUCCESS
        // toast.success("Викладачi завантаженi")
      }
    )

    /* createTeacherCategory */
    builder.addCase(
      createTeacherCategory.fulfilled,
      (state, action: PayloadAction<TeachersCategoryType>) => {
        if (!state.teachersCategories) return

        state.teachersCategories = [...state.teachersCategories, action.payload]
      }
    )

    /* updateTeacherCategory */
    builder.addCase(
      updateTeacherCategory.fulfilled,
      (state, action: PayloadAction<TeachersCategoryType>) => {
        if (!state.teachersCategories) return

        const newCategories = state.teachersCategories.map((el) => {
          if (el.id === action.payload.id) {
            return { ...action.payload }
          }

          return el
        })

        state.teachersCategories = newCategories
      }
    )

    /* deleteTeacherCategory */
    builder.addCase(deleteTeacherCategory.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.teachersCategories) return

      const newCategories = state.teachersCategories.filter((el) => el.id !== action.payload)

      state.teachersCategories = newCategories
    })

    /* --- teachers --- */

    /* createTeacher */
    builder.addCase(createTeacher.fulfilled, (state, action: PayloadAction<TeachersType>) => {
      if (!state.teachersCategories) return

      const newTeacherCategories = state.teachersCategories.map((el) => {
        if (el.id === action.payload.category.id) {
          return { ...el, teachers: [...el.teachers, action.payload] }
        }

        return el
      })

      state.teachersCategories = newTeacherCategories
    })

    /* updateTeacher */
    builder.addCase(updateTeacher.fulfilled, (state, action: PayloadAction<TeachersType>) => {
      if (!state.teachersCategories) return
      alert("Не змінюється категорія викладача при оновленні в redux")
      const newTeachersCategories = state.teachersCategories.map((el) => {
        if (el.id === action.payload.category.id) {
          const newTeachers = el.teachers.map((teacher) => {
            if (teacher.id === action.payload.id) {
              return action.payload
            }

            return teacher
          })

          return { ...el, teachers: newTeachers }
        }

        return el
      })

      state.teachersCategories = newTeachersCategories
    })

    /* deleteTeacher */
    builder.addCase(deleteTeacher.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.teachersCategories) return

      const updatedCategories = state.teachersCategories.map((el) => {
        const newTeachers = el.teachers.filter((teacher) => teacher.id !== action.payload)

        return { ...el, teachers: newTeachers }
      })

      state.teachersCategories = updatedCategories
    })
  },
})

export default teachersSlice.reducer

export const teachersSelector = (state: RootState) => state.teachers
