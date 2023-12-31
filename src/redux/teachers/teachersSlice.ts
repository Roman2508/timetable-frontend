import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  createTeacher,
  createTeacherCategory,
  deleteTeacher,
  deleteTeacherCategory,
  getTeachersCategories,
  updateTeacher,
  updateTeacherCategory,
} from "./teachersAsyncActions";
import {
  TeachersCategoryType,
  TeachersInitialState,
  TeachersType,
} from "./teachersTypes";
import { LoadingStatusTypes } from "../appTypes";
import { toast } from "react-toastify";

const teachersInitialState: TeachersInitialState = {
  teachersCategories: null,
  loadingStatus: LoadingStatusTypes.NEVER,
};

const onPending = (state: TeachersInitialState) => {
  state.loadingStatus = LoadingStatusTypes.LOADING;
  toast.info("Завантаження...", { autoClose: 1000 });
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState: teachersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    /* --- categories --- */

    /* getAuditoryCategories */
    builder.addCase(getTeachersCategories.pending, (state) => {
      state.loadingStatus = LoadingStatusTypes.LOADING;
    });
    builder.addCase(getTeachersCategories.rejected, (state) => {
      state.loadingStatus = LoadingStatusTypes.ERROR;
      toast.error("Помилка при завантаженні аудиторій");
    });
    builder.addCase(
      getTeachersCategories.fulfilled,
      (state, action: PayloadAction<TeachersCategoryType[]>) => {
        state.teachersCategories = action.payload;
        state.loadingStatus = LoadingStatusTypes.SUCCESS;
        toast.success("Викладачi завантаженi");
      }
    );

    /* createTeacherCategory */
    builder.addCase(createTeacherCategory.pending, (state) => {
      onPending(state);
    });
    builder.addCase(createTeacherCategory.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR;
      toast.error(action.error.message);
    });
    builder.addCase(
      createTeacherCategory.fulfilled,
      (state, action: PayloadAction<TeachersCategoryType>) => {
        if (!state.teachersCategories) return;

        state.teachersCategories = [
          ...state.teachersCategories,
          action.payload,
        ];

        state.loadingStatus = LoadingStatusTypes.SUCCESS;
        toast.success("Категорiю створено");
      }
    );

    /* updateTeacherCategory */
    builder.addCase(updateTeacherCategory.pending, (state) => {
      onPending(state);
    });
    builder.addCase(updateTeacherCategory.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR;
      toast.error(action.error.message);
    });
    builder.addCase(
      updateTeacherCategory.fulfilled,
      (state, action: PayloadAction<TeachersCategoryType>) => {
        if (!state.teachersCategories) return;

        console.log(action.payload);

        const newCategories = state.teachersCategories.map((el) => {
          if (el.id === action.payload.id) {
            return { ...action.payload };
          }

          return el;
        });

        state.teachersCategories = newCategories;
        state.loadingStatus = LoadingStatusTypes.SUCCESS;
        toast.success("Категорію оновлено");
      }
    );

    /* deleteTeacherCategory */
    builder.addCase(deleteTeacherCategory.pending, (state) => {
      onPending(state);
    });
    builder.addCase(deleteTeacherCategory.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR;
      toast.error(action.error.message);
    });
    builder.addCase(
      deleteTeacherCategory.fulfilled,
      (state, action: PayloadAction<number>) => {
        if (!state.teachersCategories) return;

        const newCategories = state.teachersCategories.filter(
          (el) => el.id !== action.payload
        );

        state.teachersCategories = newCategories;
        state.loadingStatus = LoadingStatusTypes.SUCCESS;
        toast.success("Категорію видалено");
      }
    );

    /* --- teachers --- */

    /* createTeacher */
    builder.addCase(createTeacher.pending, (state) => {
      onPending(state);
    });
    builder.addCase(createTeacher.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR;
      toast.error(action.error.message);
    });
    builder.addCase(
      createTeacher.fulfilled,
      (state, action: PayloadAction<TeachersType>) => {
        if (!state.teachersCategories) return;

        const newTeacherCategories = state.teachersCategories.map((el) => {
          if (el.id === action.payload.category.id) {
            return { ...el, teachers: [...el.teachers, action.payload] };
          }

          return el;
        });

        state.teachersCategories = newTeacherCategories;
        state.loadingStatus = LoadingStatusTypes.SUCCESS;
        toast.success("Викладача створено");
      }
    );

    /* updateTeacher */
    builder.addCase(updateTeacher.pending, (state) => {
      onPending(state);
    });
    builder.addCase(updateTeacher.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR;
      toast.error(action.error.message);
    });
    builder.addCase(
      updateTeacher.fulfilled,
      (state, action: PayloadAction<TeachersType>) => {
        if (!state.teachersCategories) return;

        const newTeachersCategories = state.teachersCategories.map((el) => {
          if (el.id === action.payload.category.id) {
            const newTeachers = el.teachers.map((teacher) => {
              if (teacher.id === action.payload.id) {
                return action.payload;
              }

              return teacher;
            });

            return { ...el, teachers: newTeachers };
          }

          return el;
        });

        state.teachersCategories = newTeachersCategories;
        state.loadingStatus = LoadingStatusTypes.SUCCESS;
        toast.success("Аудиторію оновлено");
      }
    );

    /* deleteTeacher */
    builder.addCase(deleteTeacher.pending, (state) => {
      onPending(state);
    });
    builder.addCase(deleteTeacher.rejected, (state, action) => {
      state.loadingStatus = LoadingStatusTypes.ERROR;
      toast.error(action.error.message);
    });
    builder.addCase(
      deleteTeacher.fulfilled,
      (state, action: PayloadAction<number>) => {
        if (!state.teachersCategories) return;

        const updatedCategories = state.teachersCategories.map((el) => {
          const newTeachers = el.teachers.filter(
            (teacher) => teacher.id !== action.payload
          );

          return { ...el, teachers: newTeachers };
        });

        state.teachersCategories = updatedCategories;
        state.loadingStatus = LoadingStatusTypes.SUCCESS;
        toast.success("Викладача видалено");
      }
    );
  },
});

export default teachersSlice.reducer;

export const teachersSelector = (state: RootState) => state.teachers;
