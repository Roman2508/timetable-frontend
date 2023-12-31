import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  PlansCategoriesType,
  PlansInitialState,
  PlansType,
} from "./plansTypes";
import { LoadingStatusTypes } from "../appTypes";
import {
  createPlan,
  createPlanCategory,
  deletePlan,
  deletePlanCategory,
  getPlansCategories,
  updatePlan,
  updatePlanCategory,
} from "./plansAsyncActions";
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

    /* createPlanCategory */
    builder.addCase(createPlanCategory.pending, (state) => {
      onPending(state);
    });
    builder.addCase(createPlanCategory.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR;
      toast.error(action.error.message);
    });
    builder.addCase(
      createPlanCategory.fulfilled,
      (state, action: PayloadAction<PlansCategoriesType>) => {
        if (!state.plansCategories) return;

        state.plansCategories = [...state.plansCategories, action.payload];

        state.loadingStatus = LoadingStatusTypes.SUCCESS;
        toast.success("Категорiю створено");
      }
    );

    /* updatePlanCategory */
    builder.addCase(updatePlanCategory.pending, (state) => {
      onPending(state);
    });
    builder.addCase(updatePlanCategory.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR;
      toast.error(action.error.message);
    });
    builder.addCase(
      updatePlanCategory.fulfilled,
      (state, action: PayloadAction<PlansCategoriesType>) => {
        if (!state.plansCategories) return;

        const newCategories = state.plansCategories.map((el) => {
          if (el.id === action.payload.id) {
            return { ...action.payload };
          }

          return el;
        });

        state.plansCategories = newCategories;
        state.loadingStatus = LoadingStatusTypes.SUCCESS;
        toast.success("Категорію оновлено");
      }
    );

    /* deletePlanCategory */
    builder.addCase(deletePlanCategory.pending, (state) => {
      onPending(state);
    });
    builder.addCase(deletePlanCategory.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR;
      toast.error(action.error.message);
    });
    builder.addCase(
      deletePlanCategory.fulfilled,
      (state, action: PayloadAction<number>) => {
        if (!state.plansCategories) return;

        const newCategories = state.plansCategories.filter(
          (el) => el.id !== action.payload
        );

        state.plansCategories = newCategories;
        state.loadingStatus = LoadingStatusTypes.SUCCESS;
        toast.success("Категорію видалено");
      }
    );

    /* --- plans --- */

    /* createPlan */
    builder.addCase(createPlan.pending, (state) => {
      onPending(state);
    });
    builder.addCase(createPlan.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR;
      toast.error(action.error.message);
    });
    builder.addCase(
      createPlan.fulfilled,
      (state, action: PayloadAction<PlansType>) => {
        if (!state.plansCategories) return;

        const newPlansCategories = state.plansCategories.map((el) => {
          if (el.id === action.payload.category.id) {
            return { ...el, plans: [...el.plans, action.payload] };
          }

          return el;
        });

        state.plansCategories = newPlansCategories;
        state.loadingStatus = LoadingStatusTypes.SUCCESS;
        toast.success("План створено");
      }
    );

    /* updatePlan */
    builder.addCase(updatePlan.pending, (state) => {
      onPending(state);
    });
    builder.addCase(updatePlan.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR;
      toast.error(action.error.message);
    });
    builder.addCase(
      updatePlan.fulfilled,
      (state, action: PayloadAction<PlansType>) => {
        if (!state.plansCategories) return;

        const newPlansCategories = state.plansCategories.map((el) => {
          if (el.id === action.payload.category.id) {
            const newPlans = el.plans.map((plan) => {
              if (plan.id === action.payload.id) {
                return action.payload;
              }

              return plan;
            });

            return { ...el, plans: newPlans };
          }

          return el;
        });

        state.plansCategories = newPlansCategories;
        state.loadingStatus = LoadingStatusTypes.SUCCESS;
        toast.success("План оновлено");
      }
    );

    /* deletePlan */
    builder.addCase(deletePlan.pending, (state) => {
      onPending(state);
    });
    builder.addCase(deletePlan.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR;
      toast.error(action.error.message);
    });
    builder.addCase(
      deletePlan.fulfilled,
      (state, action: PayloadAction<number>) => {
        if (!state.plansCategories) return;

        const updatedCategories = state.plansCategories.map((el) => {
          const newPlans = el.plans.filter(
            (plan) => plan.id !== action.payload
          );

          return { ...el, plans: newPlans };
        });

        state.plansCategories = updatedCategories;
        state.loadingStatus = LoadingStatusTypes.SUCCESS;
        toast.success("План видалено");
      }
    );
  },
});

export default plansSlice.reducer;

export const plansSelector = (state: RootState) => state.plans;
