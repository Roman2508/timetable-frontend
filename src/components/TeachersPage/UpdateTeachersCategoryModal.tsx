import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Modal from "../ui/Modal/Modal";
import Input from "../ui/Input/Input";
import Select from "../ui/Select/Select";
import Button from "../ui/Button/Button";
import styles from "./TeachersPage.module.scss";
import { useAppDispatch } from "../../redux/store";
import { TeachersCategoryType } from "../../redux/teachers/teachersTypes";
import {
  deleteTeacherCategory,
  updateTeacherCategory,
} from "../../redux/teachers/teachersAsyncActions";

type FieldsType = {
  name: string;
  category: { value: string; label: string };
};

interface IUpdateTeachersCategoriesModalProps {
  teachersCategories: TeachersCategoryType[] | null;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  isShow: boolean;
}

const UpdateTeachersCategoriesModal = React.forwardRef<
  HTMLDivElement,
  IUpdateTeachersCategoriesModalProps
>(({ teachersCategories, setIsShow, isShow }, ref) => {
  const dispatch = useAppDispatch();

  const {
    watch,
    control,
    register,
    setValue,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldsType>({
    mode: "onChange",
  });

  const watchedFieldValue = watch("category");

  const onSubmit: SubmitHandler<FieldsType> = async (data) => {
    const payload = { name: data.name, id: Number(data.category.value) };
    setIsShow(false);
    await dispatch(updateTeacherCategory(payload));
    resetField("category");
    resetField("name");
  };

  const onDeleteCategory = async () => {
    const deletedCategoryId = watch("category.value");
    if (!deletedCategoryId) alert("Виберіть категорію");
    if (window.confirm("Ви дійсно хочете видалити категорію?")) {
      setIsShow(false);

      await dispatch(deleteTeacherCategory(Number(deletedCategoryId)));

      resetField("category");
      resetField("name");
    }
  };

  React.useEffect(() => {
    if (!watchedFieldValue) return;
    setValue("name", String(watchedFieldValue?.label));
  }, [watchedFieldValue]);

  return (
    <Modal
      isShow={isShow}
      setIsShow={setIsShow}
      modalTitle="Редагувати категорію"
      ref={ref}
    >
      <form style={{ marginTop: "40px" }} onSubmit={handleSubmit(onSubmit)}>
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
                wrapperWidth="100%"
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

        <Input
          label="Назва"
          width="100%"
          labelBackColor="dark"
          value={watch("name")}
          disabled={!watchedFieldValue}
          wrapperSx={{ margin: "20px 0" }}
          {...register("name", { required: true })}
        />

        <div className={styles["update-category-modal-actions"]}>
          <Button
            variant="outlined"
            color="red"
            type="button"
            onClick={onDeleteCategory}
          >
            Видалити
          </Button>

          <Button variant="outlined">Зберегти</Button>
        </div>
      </form>
    </Modal>
  );
});

export default UpdateTeachersCategoriesModal;
