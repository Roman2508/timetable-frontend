import { SubmitHandler, useForm } from "react-hook-form"

import Input from "../ui/Input/Input"
import Button from "../ui/Button/Button"
import styles from "./AuditoriesPage.module.scss"
import { useAppDispatch } from "../../redux/store"
import { LoadingStatusTypes } from "../../redux/appTypes"
import { createAuditoryCategory } from "../../redux/auditories/auditoriesAsyncActions"

interface ICreateAuditoryCategoryFormProps {
  loadingStatus: LoadingStatusTypes
  setUpdateCategoryModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateAuditoryCategoryForm: React.FC<ICreateAuditoryCategoryFormProps> = ({
  loadingStatus,
  setUpdateCategoryModalVisible,
}) => {
  const dispatch = useAppDispatch()

  const {
    watch,
    register,
    getValues,
    resetField,
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<{ name: string }>({
    mode: "onSubmit",
  })

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    await dispatch(createAuditoryCategory(data.name))

    onClearFields()
  }

  const onClearFields = () => {
    resetField("name")
    clearErrors()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["categories-form"]}>
        <Input
          label="Назва"
          width="100%"
          labelBackColor="dark"
          value={watch("name")}
          isError={!!errors.name}
          errorMessage={errors.name?.message}
          {...register("name", { required: "Ім'я обов'язкове" })}
        />
      </div>

      <div className={styles["categories-controls"]}>
        <Button
          variant="outlined"
          disabled={isSubmitting}
          type="button"
          onClick={() => setUpdateCategoryModalVisible(true)}
        >
          Редагувати
        </Button>

        <div>
          <Button
            type="submit"
            variant="outlined"
            sx={{ marginRight: "20px" }}
            disabled={isSubmitting}
          >
            Зберегти
          </Button>

          <Button
            type="button"
            variant="outlined"
            color="gray"
            disabled={isSubmitting}
            onClick={onClearFields}
          >
            Очистити
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CreateAuditoryCategoryForm
