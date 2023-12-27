import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuditoryCategoriesTypes, AuditoriesInitialState } from './auditoriesTypes'
import { LoadingStatusTypes } from '../appTypes'
import { createAuditoryCategory, getAuditoryCategories } from './auditoriesAsyncActions'
import { RootState } from '../store'

const auditoriesInitialState: AuditoriesInitialState = {
  auditoriCategories: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const auditoriesSlice = createSlice({
  name: 'auditories',
  initialState: auditoriesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    /* getAuditoryCategories */
    builder.addCase(getAuditoryCategories.pending, (state) => {
      state.loadingStatus = LoadingStatusTypes.LOADING
    })
    builder.addCase(getAuditoryCategories.rejected, (state) => {
      state.loadingStatus = LoadingStatusTypes.ERROR
    })
    builder.addCase(getAuditoryCategories.fulfilled, (state, action: PayloadAction<AuditoryCategoriesTypes[]>) => {
      state.auditoriCategories = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /*  */
    builder.addCase(createAuditoryCategory.pending, (state) => {
      state.loadingStatus = LoadingStatusTypes.LOADING
    })
    builder.addCase(createAuditoryCategory.rejected, (state) => {
      state.loadingStatus = LoadingStatusTypes.ERROR
    })
    builder.addCase(createAuditoryCategory.fulfilled, (state, action: PayloadAction<AuditoryCategoriesTypes>) => {
      state.auditoriCategories?.push(action.payload)
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })
  },
})

export const auditoriesSelector = (state: RootState) => state.auditories

export default auditoriesSlice.reducer

// export const {} = auditoriesSlice.actions
