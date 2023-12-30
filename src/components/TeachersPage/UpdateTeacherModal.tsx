import React from "react";

import Modal from "../ui/Modal/Modal";
import Input from "../ui/Input/Input";
import Select from "../ui/Select/Select";
import Button from "../ui/Button/Button";
import styles from "./TeachersPage.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/store";
import { TeacherFieldsType } from "./CreateTeacherForm";
import {
  deleteTeacher,
  updateTeacher,
} from "../../redux/teachers/teachersAsyncActions";
import {
  TeachersCategoryType,
  TeachersType,
} from "../../redux/teachers/teachersTypes";

interface IUpdateTeacherModalProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  teachersCategories: TeachersCategoryType[] | null;
  selectedTeacher: TeachersType | null;
  setSelectedTeacher: React.Dispatch<React.SetStateAction<TeachersType | null>>;
}

const UpdateTeacherModal = React.forwardRef<
  HTMLDivElement,
  IUpdateTeacherModalProps
>(
  (
    {
      isShow,
      setIsShow,
      selectedTeacher,
      teachersCategories,
      setSelectedTeacher,
    },
    ref
  ) => {
    const dispatch = useAppDispatch();

    const {
      watch,
      control,
      register,
      setValue,
      resetField,
      formState: { errors },
      handleSubmit,
    } = useForm<TeacherFieldsType>({
      mode: "onChange",
    });

    const onSubmit: SubmitHandler<TeacherFieldsType> = async (data) => {
      if (!selectedTeacher) return;

      const updatedTeacher = {
        id: selectedTeacher.id,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        category: Number(data.category.value),
      };

      setIsShow(false);
      await dispatch(updateTeacher(updatedTeacher));
      //   onClearFields();
    };

    // const onClearFields = () => {
    //   resetField("firstName");
    //   resetField("lastName");
    //   resetField("middleName");
    //   resetField("category");
    // };

    const onDeleteTeacher = async () => {
      if (!selectedTeacher) return;
      if (window.confirm("Ви дійсно хочете видалити викладача?")) {
        setIsShow(false);
        await dispatch(deleteTeacher(selectedTeacher.id));
        setSelectedTeacher(null);
      }
    };

    React.useEffect(() => {
      if (!selectedTeacher) return;

      setValue("firstName", selectedTeacher.firstName);
      setValue("lastName", selectedTeacher.lastName);
      setValue("middleName", selectedTeacher.middleName);
      setValue("category", {
        value: String(selectedTeacher.category.id),
        label: selectedTeacher.category.name,
      });
    }, [selectedTeacher]);

    return (
      <Modal
        ref={ref}
        isShow={isShow}
        setIsShow={setIsShow}
        modalTitle="Редагувати викладача"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["teachers-form"]}>
            <Input
              width="100%"
              label="Прiзвище"
              value={watch("lastName")}
              labelBackColor="dark"
              isError={!!errors.lastName}
              wrapperSx={{ marginTop: "10px" }}
              errorMessage={errors.lastName?.message}
              {...register("lastName", { required: true })}
            />

            <Input
              width="100%"
              label="По батьковi"
              value={watch("middleName")}
              labelBackColor="dark"
              isError={!!errors.middleName}
              wrapperSx={{ marginTop: "10px" }}
              errorMessage={errors.middleName?.message}
              {...register("middleName", { required: true })}
            />

            <Input
              width="100%"
              label="Iм'я"
              value={watch("firstName")}
              labelBackColor="dark"
              isError={!!errors.firstName}
              wrapperSx={{ margin: "10px 0" }}
              errorMessage={errors.firstName?.message}
              {...register("firstName", { required: true })}
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
          </div>

          <div className={styles["update-category-modal-actions"]}>
            <Button
              variant="outlined"
              color="red"
              type="button"
              onClick={onDeleteTeacher}
            >
              Видалити
            </Button>

            <Button variant="outlined">Зберегти</Button>
          </div>
        </form>
      </Modal>
    );
  }
);

export default UpdateTeacherModal;
