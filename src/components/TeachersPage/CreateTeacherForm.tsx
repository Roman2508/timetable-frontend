import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Input from "../ui/Input/Input";
import Select from "../ui/Select/Select";
import Button from "../ui/Button/Button";
import styles from "./TeachersPage.module.scss";
import { useAppDispatch } from "../../redux/store";
import { LoadingStatusTypes } from "../../redux/appTypes";
import { TeachersCategoryType } from "../../redux/teachers/teachersTypes";
import { createTeacher } from "../../redux/teachers/teachersAsyncActions";

export type TeacherFieldsType = {
  firstName: string;
  middleName: string;
  lastName: string;
  category: { value: string; label: string };
};

interface ICreateTeacherFormProps {
  teachersCategories: TeachersCategoryType[] | null;
  loadingStatus: LoadingStatusTypes;
}

const CreateTeacherForm: React.FC<ICreateTeacherFormProps> = ({
  loadingStatus,
  teachersCategories,
}) => {
  const dispatch = useAppDispatch();

  const {
    watch,
    control,
    register,
    resetField,
    clearErrors,
    formState: { errors },
    handleSubmit,
  } = useForm<TeacherFieldsType>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<TeacherFieldsType> = async (data) => {
    const newTeacher = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      category: Number(data.category.value),
    };
    await dispatch(createTeacher(newTeacher));
    onClearFields();
  };

  const onClearFields = () => {
    resetField("firstName");
    resetField("middleName");
    resetField("lastName");
    resetField("category");
    clearErrors();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["teachers-form"]}>
        <Input
          width="245px"
          label="Прiзвище"
          labelBackColor="dark"
          value={watch("lastName")}
          isError={!!errors.lastName}
          errorMessage={errors.lastName?.message}
          {...register("lastName", { required: true })}
        />

        <Input
          label="Iм'я"
          width="245px"
          labelBackColor="dark"
          value={watch("firstName")}
          isError={!!errors.firstName}
          errorMessage={errors.firstName?.message}
          {...register("firstName", { required: true })}
        />

        <Input
          width="245px"
          label="По батьковi"
          labelBackColor="dark"
          value={watch("middleName")}
          isError={!!errors.middleName}
          errorMessage={errors.middleName?.message}
          {...register("middleName", { required: true })}
        />

        <Controller
          name="category"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            const options = teachersCategories
              ? teachersCategories.map((el) => ({
                  value: String(el.id),
                  label: el.name,
                }))
              : [];

            return (
              <Select
                label="Категорія"
                options={options}
                labelBgColor="dark"
                wrapperWidth="245px"
                selectValue={value}
                isError={!!errors.category}
                errorMessage={errors.category?.message}
                onChange={(val: { value: string; label: string }) =>
                  onChange(val)
                }
              />
            );
          }}
        />
      </div>

      <div className={styles["teachers-controls"]}>
        <Button
          sx={{ marginRight: "20px" }}
          variant="outlined"
          disabled={loadingStatus === LoadingStatusTypes.LOADING}
        >
          Зберегти
        </Button>

        <Button
          variant="outlined"
          color="gray"
          type="button"
          onClick={onClearFields}
          disabled={loadingStatus === LoadingStatusTypes.LOADING}
        >
          Очистити
        </Button>
      </div>
    </form>
  );
};

export default CreateTeacherForm;
