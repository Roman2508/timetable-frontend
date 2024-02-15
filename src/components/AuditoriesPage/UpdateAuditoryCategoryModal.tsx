import React from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import Modal from "../ui/Modal/Modal"
import Input from "../ui/Input/Input"
import Select from "../ui/Select/Select"
import Button from "../ui/Button/Button"
import styles from "./AuditoriesPage.module.scss"
import { useAppDispatch } from "../../redux/store"
import { AuditoryCategoriesTypes } from "../../redux/auditories/auditoriesTypes"
import {
  deleteAuditoryCategory,
  updateAuditoryCategory,
} from "../../redux/auditories/auditoriesAsyncActions"

type FieldsType = {
  name: string
  category: { value: string; label: string }
}

interface IUpdateAuditoryCategoryModalProps {
  auditoriCategories: AuditoryCategoriesTypes[] | null
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  isShow: boolean
}

const UpdateAuditoryCategoryModal = React.forwardRef<
  HTMLDivElement,
  IUpdateAuditoryCategoryModalProps
>(({ auditoriCategories, setIsShow, isShow }, ref) => {
  const dispatch = useAppDispatch()

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
  })

  const watchedFieldValue = watch("category")

  const onSubmit: SubmitHandler<FieldsType> = async (data) => {
    const payload = { name: data.name, id: Number(data.category.value) }
    setIsShow(false)
    await dispatch(updateAuditoryCategory(payload))
    resetField("category")
    resetField("name")
  }

  const onDeleteCategory = async () => {
    const deletedCategoryId = watch("category.value")
    if (!deletedCategoryId) alert("Виберіть категорію")
    if (window.confirm("Ви дійсно хочете видалити категорію?")) {
      setIsShow(false)

      await dispatch(deleteAuditoryCategory(Number(deletedCategoryId)))

      resetField("category")
      resetField("name")
    }
  }

  // console.log(setFocus)

  React.useEffect(() => {
    if (!watchedFieldValue) return
    setValue("name", String(watchedFieldValue?.label))
  }, [watchedFieldValue])

  return (
    <Modal isShow={isShow} setIsShow={setIsShow} modalTitle="Редагувати категорію" ref={ref}>
      <form style={{ marginTop: "40px" }} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="category"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            const options = auditoriCategories
              ? auditoriCategories.map((el) => ({
                  value: String(el.id),
                  label: el.name,
                }))
              : []

            return (
              <Select
                label="Категорія"
                options={options}
                labelBgColor="dark"
                wrapperWidth="100%"
                selectValue={value}
                isError={!!errors.category}
                errorMessage={errors.category?.message}
                onChange={(val: { value: string; label: string }) => onChange(val)}
              />
            )
          }}
        />

        <Input
          label="Назва"
          width="100%"
          labelBackColor="dark"
          value={watch("name")}
          wrapperSx={{ margin: "20px 0" }}
          {...register("name", { required: true })}
        />

        <div className={styles["update-category-modal-actions"]}>
          <Button variant="outlined" color="red" type="button" onClick={onDeleteCategory}>
            Видалити
          </Button>

          <Button variant="outlined">Зберегти</Button>
        </div>
      </form>
    </Modal>
  )
})

export default UpdateAuditoryCategoryModal
