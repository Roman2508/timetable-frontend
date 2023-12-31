import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Modal from "../ui/Modal/Modal";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import styles from "./PlansPage.module.scss";
import { useAppDispatch } from "../../redux/store";
import Select from "../ui/Select/Select";
import { PlansCategoriesType } from "../../redux/plans/plansTypes";
import {
  createPlan,
  createPlanCategory,
  deletePlan,
  deletePlanCategory,
  updatePlan,
  updatePlanCategory,
} from "../../redux/plans/plansAsyncActions";

type FieldsType = {
  name: string;
  category?: { value: string; label: string };
};

export type PlanModalsType =
  | "add-category"
  | "update-category"
  | "add-plan"
  | "update-plan";

interface IPlanModalsProps {
  isShow: boolean;
  modalType: PlanModalsType;
  selectedPlanId: number | null;
  selectedPlanCategory: { id: number; name: string } | null;
  plansCategories: PlansCategoriesType[] | null;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlanModals = React.forwardRef<HTMLDivElement, IPlanModalsProps>(
  (
    {
      isShow,
      modalType,
      setIsShow,
      selectedPlanId,
      plansCategories,
      selectedPlanCategory,
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
      formState: { errors, isSubmitting },
      handleSubmit,
    } = useForm<FieldsType>({
      mode: "onChange",
    });

    const onSubmit: SubmitHandler<FieldsType> = async (data) => {
      const payload = { name: data.name };
      setIsShow(false);

      if (modalType === "add-category") {
        await dispatch(createPlanCategory(payload));
        //
      } else if (modalType === "update-category" && selectedPlanCategory) {
        await dispatch(
          updatePlanCategory({ ...payload, id: selectedPlanCategory.id })
        );
        //
      } else if (modalType === "add-plan" && selectedPlanCategory) {
        await dispatch(
          createPlan({ ...payload, categoryId: selectedPlanCategory.id })
        );
      } else if (modalType === "update-plan" && selectedPlanCategory) {
        await dispatch(updatePlan({ ...payload, id: selectedPlanCategory.id }));
        //
      }
      resetField("name");
      resetField("category");
    };

    const onDeleteCategory = async () => {
      if (!selectedPlanCategory) {
        alert("Виберiть категорoю");
        return;
      }

      if (modalType === "update-category" && selectedPlanCategory) {
        if (!window.confirm("Ви дійсно хочете видалити категорію?")) return;

        setIsShow(false);

        await dispatch(deletePlanCategory(selectedPlanCategory.id));

        resetField("name");
        resetField("category");
        return;
      }

      if (modalType === "update-plan" && selectedPlanId) {
        if (!window.confirm("Ви дійсно хочете видалити план?")) return;

        setIsShow(false);

        await dispatch(deletePlan(selectedPlanId));

        resetField("name");
        resetField("category");
      }
    };

    React.useEffect(() => {
      if (!selectedPlanCategory) return;
      setValue("name", String(selectedPlanCategory.name));
    }, [selectedPlanCategory]);

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

          {modalType === "update-plan" && (
            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                const options = plansCategories
                  ? plansCategories.map((el) => ({
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
          )}

          <div className={styles["update-category-modal-actions"]}>
            {modalType === "add-category" || modalType === "add-plan" ? (
              <div></div>
            ) : (
              <Button
                variant="outlined"
                color="red"
                type="button"
                onClick={onDeleteCategory}
                disabled={isSubmitting}
              >
                Видалити
              </Button>
            )}

            <Button
              variant="outlined"
              disabled={!watch("name") || isSubmitting}
            >
              Зберегти
            </Button>
          </div>
        </form>
      </Modal>
    );
  }
);

export default PlanModals;
