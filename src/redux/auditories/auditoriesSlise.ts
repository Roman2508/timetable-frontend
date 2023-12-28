import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuditoryCategoriesTypes, AuditoriesInitialState, AuditoriesTypes } from './auditoriesTypes'
import { LoadingStatusTypes } from '../appTypes'
import {
  createAuditory,
  createAuditoryCategory,
  deleteAuditoryCategory,
  getAuditoryCategories,
  updateAuditoryCategory,
} from './auditoriesAsyncActions'
import { RootState } from '../store'
import { toast } from 'react-toastify'

const auditoriesInitialState: AuditoriesInitialState = {
  auditoriCategories: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const onPending = (state: AuditoriesInitialState) => {
  state.loadingStatus = LoadingStatusTypes.LOADING
  toast.info('Завантаження...', { autoClose: 1000 })
}

const auditoriesSlice = createSlice({
  name: 'auditories',
  initialState: auditoriesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    /* --- categories --- */

    /* getAuditoryCategories */
    builder.addCase(getAuditoryCategories.pending, (state) => {
      state.loadingStatus = LoadingStatusTypes.LOADING
    })
    builder.addCase(getAuditoryCategories.rejected, (state) => {
      state.loadingStatus = LoadingStatusTypes.ERROR
      toast.error('Помилка при завантаженні аудиторій')
    })
    builder.addCase(getAuditoryCategories.fulfilled, (state, action: PayloadAction<AuditoryCategoriesTypes[]>) => {
      state.auditoriCategories = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
      toast.success('Аудиторії завантажено')
    })

    /* createAuditoryCategory */
    builder.addCase(createAuditoryCategory.pending, (state) => {
      onPending(state)
    })
    builder.addCase(createAuditoryCategory.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR
      toast.error(action.error.message)
    })
    builder.addCase(createAuditoryCategory.fulfilled, (state, action: PayloadAction<AuditoryCategoriesTypes>) => {
      state.auditoriCategories?.push(action.payload)
      state.loadingStatus = LoadingStatusTypes.SUCCESS
      toast.success('Категорію створено')
    })

    /* updateAuditoryCategory */
    builder.addCase(updateAuditoryCategory.pending, (state) => {
      onPending(state)
    })
    builder.addCase(updateAuditoryCategory.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR
      toast.error(action.error.message)
    })
    builder.addCase(updateAuditoryCategory.fulfilled, (state, action: PayloadAction<AuditoryCategoriesTypes>) => {
      if (!state.auditoriCategories) return

      const newAuditories = state.auditoriCategories.map((el) => {
        if (el.id === action.payload.id) {
          return { ...action.payload }
        }

        return el
      })

      state.auditoriCategories = newAuditories
      state.loadingStatus = LoadingStatusTypes.SUCCESS
      toast.success('Категорію оновлено')
    })

    /* deleteAuditoryCategory */
    builder.addCase(deleteAuditoryCategory.pending, (state) => {
      onPending(state)
    })
    builder.addCase(deleteAuditoryCategory.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR
      toast.error(action.error.message)
    })
    builder.addCase(deleteAuditoryCategory.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.auditoriCategories) return

      const newCategories = state.auditoriCategories.filter((el) => el.id !== action.payload)

      state.auditoriCategories = newCategories
      state.loadingStatus = LoadingStatusTypes.SUCCESS
      toast.success('Категорію видалено')
    })

    /* --- auditories --- */

    /* createAuditory */
    builder.addCase(createAuditory.pending, (state) => {
      onPending(state)
    })
    builder.addCase(createAuditory.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR
      toast.error(action.error.message)
    })
    builder.addCase(createAuditory.fulfilled, (state, action: PayloadAction<AuditoriesTypes>) => {
      if (!state.auditoriCategories) return

      const newAuditories = state.auditoriCategories.map((el) => {
        if (el.id === action.payload.category.id) {
          return { ...el, auditories: [...el.auditories, action.payload] }
        }

        return el
      })

      state.auditoriCategories = newAuditories
      state.loadingStatus = LoadingStatusTypes.SUCCESS
      toast.success('Аудиторію створено')
    })
  },
})

export const auditoriesSelector = (state: RootState) => state.auditories

export default auditoriesSlice.reducer

// export const {} = auditoriesSlice.actions
