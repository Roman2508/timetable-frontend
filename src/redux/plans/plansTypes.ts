import { LoadingStatusTypes } from "../appTypes";

export type PlansInitialState = {
  plansCategories: PlansCategoriesType[] | null;
  loadingStatus: LoadingStatusTypes;
};

export type PlansCategoriesType = {
  id: number;
  name: string;
  plans: PlansType[];
};

export type PlansType = {
  id: number;
  name: string;
};
