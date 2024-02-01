import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { LoadingStatusTypes } from "../appTypes"
import { GroupsInitialState } from "./groupsTypes"

const groupsInitialState: GroupsInitialState = {
  groupCategories: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const groupsSlice = createSlice({
  name: "groups",
  initialState: groupsInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const groupsSelector = (state: RootState) => state.groups

export const { setLoadingStatus } = groupsSlice.actions

export default groupsSlice.reducer
