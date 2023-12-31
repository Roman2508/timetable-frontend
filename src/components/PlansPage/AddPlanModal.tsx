import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Modal from "../ui/Modal/Modal";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import styles from "./PlansPage.module.scss";
import { useAppDispatch } from "../../redux/store";

type FieldsType = {
  name: string;
};

interface IAddPlanModalProps {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  isShow: boolean;
}

const AddPlanModal = React.forwardRef<HTMLDivElement, IAddPlanModalProps>(
  ({ setIsShow, isShow }, ref) => {
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

    const onSubmit: SubmitHandler<FieldsType> = async (data) => {
      const payload = { name: data.name };
      setIsShow(false);
      //   await dispatch(updateAuditoryCategory(payload));
      resetField("name");
    };

    const onDeleteCategory = async () => {
      if (window.confirm("Ви дійсно хочете видалити категорію?")) {
        setIsShow(false);

        // await dispatch(deleteAuditoryCategory(Number(deletedCategoryId)));

        resetField("name");
      }
    };

    // console.log(setFocus)

    // React.useEffect(() => {
    //   if (!watchedFieldValue) return;
    //   setValue("name", String(watchedFieldValue?.label));
    // }, [watchedFieldValue]);

    return (
      <Modal
        isShow={isShow}
        setIsShow={setIsShow}
        classNames={styles["modal-wrapper"]}
        modalTitle="Додати нову категорію"
        ref={ref}
      >
        <form style={{ marginTop: "20px" }} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Назва"
            width="100%"
            labelBackColor="dark"
            value={watch("name")}
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
  }
);

export default AddPlanModal;
