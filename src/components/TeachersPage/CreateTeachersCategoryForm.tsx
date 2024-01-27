import { SubmitHandler, useForm } from "react-hook-form"

import Input from "../ui/Input/Input"
import Button from "../ui/Button/Button"
import styles from "./TeachersPage.module.scss"
import { useAppDispatch } from "../../redux/store"
import { LoadingStatusTypes } from "../../redux/appTypes"
import { createTeacherCategory } from "../../redux/teachers/teachersAsyncActions"

interface ICreateTeachersCategoryFormProps {
  setUpdateCategoryModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateTeachersCategoryForm: React.FC<ICreateTeachersCategoryFormProps> = ({
  setUpdateCategoryModalVisible,
}) => {
  const dispatch = useAppDispatch()

  const {
    watch,
    register,
    // getValues,
    resetField,
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<{ name: string }>({
    mode: "onSubmit",
  })

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    await dispatch(createTeacherCategory({ name: data.name }))
    onClearFeild()
  }

  const onClearFeild = () => {
    resetField("name")
    clearErrors()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["teachers-form"]}>
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
          type="button"
          disabled={isSubmitting}
          onClick={() => setUpdateCategoryModalVisible(true)}
        >
          Редагувати
        </Button>

        <div>
          <Button
            sx={{ marginRight: "20px" }}
            variant="outlined"
            type="submit"
            disabled={isSubmitting}
          >
            Зберегти
          </Button>

          <Button
            variant="outlined"
            color="gray"
            type="button"
            onClick={onClearFeild}
            disabled={isSubmitting}
          >
            Очистити
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CreateTeachersCategoryForm
