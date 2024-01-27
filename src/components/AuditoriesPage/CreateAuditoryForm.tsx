import React from "react"
import { Theme, toast } from "react-toastify"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import Input from "../ui/Input/Input"
import Select from "../ui/Select/Select"
import Button from "../ui/Button/Button"
import styles from "./AuditoriesPage.module.scss"
import { AuditoryCategoriesTypes } from "../../redux/auditories/auditoriesTypes"
import { useAppDispatch } from "../../redux/store"
import { createAuditory } from "../../redux/auditories/auditoriesAsyncActions"
import { LoadingStatusTypes } from "../../redux/appTypes"
import { ThemeContext } from "../../App"

export type AuditoryFieldsType = {
  name: string
  seatsNumber: number
  category: { value: string; label: string }
}

interface ICreateAuditoryFormProps {
  auditoriCategories: AuditoryCategoriesTypes[] | null
  loadingStatus: LoadingStatusTypes
}

const CreateAuditoryForm: React.FC<ICreateAuditoryFormProps> = ({
  loadingStatus,
  auditoriCategories,
}) => {
  const dispatch = useAppDispatch()

  const {
    watch,
    control,
    register,
    resetField,
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<AuditoryFieldsType>({
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<AuditoryFieldsType> = async (data) => {
    const newAuditory = {
      name: data.name,
      seatsNumber: Number(data.seatsNumber),
      category: Number(data.category.value),
    }
    await dispatch(createAuditory(newAuditory))
    onClearFields()
  }

  const onClearFields = () => {
    resetField("name")
    resetField("seatsNumber")
    resetField("category")
    clearErrors()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["auditories-form"]}>
        <Input
          width="245px"
          label="Назва"
          value={watch("name")}
          labelBackColor="dark"
          isError={!!errors.name}
          errorMessage={errors.name?.message}
          {...register("name", { required: true })}
        />

        <Input
          width="245px"
          htmlType="number"
          value={watch("seatsNumber")}
          labelBackColor="dark"
          label="Кількість місць"
          isError={!!errors.seatsNumber}
          errorMessage={errors.seatsNumber?.message}
          {...register("seatsNumber", { required: true })}
        />

        <Controller
          name="category"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            const options = auditoriCategories
              ? auditoriCategories.map((el) => ({ value: String(el.id), label: el.name }))
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
      </div>

      <div className={styles["auditories-controls"]}>
        <Button sx={{ marginRight: "20px" }} variant="outlined" disabled={isSubmitting}>
          Зберегти
        </Button>

        <Button
          variant="outlined"
          color="gray"
          type="button"
          onClick={onClearFields}
          disabled={isSubmitting}
        >
          Очистити
        </Button>
      </div>
    </form>
  )
}

export default CreateAuditoryForm
