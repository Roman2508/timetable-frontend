import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import auditoriesSlise from "./auditories/auditoriesSlise";
import teachersSlice from "./teachers/teachersSlice";

export const store = configureStore({
  reducer: {
    auditories: auditoriesSlise,
    teachers: teachersSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
