import { createAsyncThunk } from '@reduxjs/toolkit'
import { auditoriesAPI } from '../../api/api'

export const getAuditoryCategories = createAsyncThunk(
  'auditory-categories/getAuditoryCategories',
  async (id: number) => {
    const { data } = await auditoriesAPI.getAllCategories(id)
    return data
  }
)
