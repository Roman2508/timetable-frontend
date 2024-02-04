import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { LoadingStatusTypes } from "../appTypes"
import { GroupCategoriesType, GroupsInitialState, GroupsType } from "./groupsTypes"
import {
  createGroup,
  createGroupCategory,
  deleteGroup,
  deleteGroupCategory,
  getGroupCategories,
  updateGroup,
  updateGroupCategory,
} from "./groupsAsyncActions"

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
  extraReducers: (builder) => {
    /* getGroupCategories */
    builder.addCase(
      getGroupCategories.fulfilled,
      (state, action: PayloadAction<GroupCategoriesType[]>) => {
        state.groupCategories = action.payload
      }
    )

    /* createGroupCategory */
    builder.addCase(
      createGroupCategory.fulfilled,
      (state, action: PayloadAction<GroupCategoriesType>) => {
        state.groupCategories?.push(action.payload)
      }
    )

    /* updateGroupCategory */
    builder.addCase(
      updateGroupCategory.fulfilled,
      (state, action: PayloadAction<GroupCategoriesType>) => {
        if (!state.groupCategories) return

        const newCategories = state.groupCategories.map((el) => {
          if (el.id === action.payload.id) {
            return { ...el, ...action.payload }
          }

          return el
        })

        state.groupCategories = newCategories
      }
    )

    /* deleteGroupCategory */
    builder.addCase(deleteGroupCategory.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.groupCategories) return

      const newCategories = state.groupCategories.filter((el) => el.id !== action.payload)

      state.groupCategories = newCategories
    })

    /* --- groups --- */

    /* createAuditory */
    builder.addCase(createGroup.fulfilled, (state, action: PayloadAction<GroupsType>) => {
      if (!state.groupCategories) return

      const newGroups = state.groupCategories.map((el) => {
        if (el.id === action.payload.category.id) {
          return { ...el, auditories: [...el.groups, action.payload] }
        }

        return el
      })

      state.groupCategories = newGroups
    })

    /* updateGroup */
    builder.addCase(updateGroup.fulfilled, (state, action: PayloadAction<GroupsType>) => {
      if (!state.groupCategories) return

      const newGroups = state.groupCategories.map((el) => {
        if (el.id === action.payload.category.id) {
          const newGroups = el.groups.map((group) => {
            if (group.id === action.payload.id) {
              return action.payload
            }

            return group
          })

          return { ...el, auditories: newGroups }
        }

        return el
      })

      state.groupCategories = newGroups
    })

    /* deleteGroup */
    builder.addCase(deleteGroup.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.groupCategories) return

      const updatedCategories = state.groupCategories.map((el) => {
        const newGroups = el.groups.filter((group) => group.id !== action.payload)

        return { ...el, auditories: newGroups }
      })

      state.groupCategories = updatedCategories
    })
  },
})

export const groupsSelector = (state: RootState) => state.groups

export const { setLoadingStatus } = groupsSlice.actions

export default groupsSlice.reducer
