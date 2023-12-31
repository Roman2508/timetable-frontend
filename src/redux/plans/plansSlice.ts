import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlansCategoriesType, PlansInitialState } from "./plansTypes";
import { LoadingStatusTypes } from "../appTypes";
import { getPlansCategories } from "./plansAsyncActions";
import { toast } from "react-toastify";
import { RootState } from "../store";

const plansInitialState: PlansInitialState = {
  plansCategories: null,
  loadingStatus: LoadingStatusTypes.NEVER,
};

const onPending = (state: PlansInitialState) => {
  state.loadingStatus = LoadingStatusTypes.LOADING;
  toast.info("Завантаження...", { autoClose: 1000 });
};

const plansSlice = createSlice({
  name: "plans",
  initialState: plansInitialState,

  reducers: {},
  extraReducers: (builder) => {
    /* --- categories --- */

    /* getPlansCategories */
    builder.addCase(getPlansCategories.pending, (state) => {
      state.loadingStatus = LoadingStatusTypes.LOADING;
    });
    builder.addCase(getPlansCategories.rejected, (state) => {
      state.loadingStatus = LoadingStatusTypes.ERROR;
      toast.error("Помилка при завантаженні планiв");
    });
    builder.addCase(
      getPlansCategories.fulfilled,
      (state, action: PayloadAction<PlansCategoriesType[]>) => {
        state.plansCategories = action.payload;
        state.loadingStatus = LoadingStatusTypes.SUCCESS;
        toast.success("Викладачi завантаженi");
      }
    );
  },
});

export default plansSlice.reducer;

export const plansSelector = (state: RootState) => state.plans;
