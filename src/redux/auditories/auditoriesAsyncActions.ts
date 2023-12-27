import { createAsyncThunk } from '@reduxjs/toolkit'
import { auditoriesAPI } from '../../api/api'

export const getAuditoryCategories = createAsyncThunk('auditory-categories/getAuditoryCategories', async () => {
  const { data } = await auditoriesAPI.getAuditoryCategories()
  return data
})

export const createAuditoryCategory = createAsyncThunk(
  'auditory-categories/createAuditoryCategory',
  async (name: string) => {
    const { data } = await auditoriesAPI.createAuditoryCategory(name)
    return data
  }
)
