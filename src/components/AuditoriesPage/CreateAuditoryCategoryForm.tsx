import { SubmitHandler, useForm } from 'react-hook-form'

import Input from '../ui/Input/Input'
import Button from '../ui/Button/Button'
import styles from './AuditoriesPage.module.scss'
import { useAppDispatch } from '../../redux/store'
import { LoadingStatusTypes } from '../../redux/appTypes'
import { createAuditoryCategory } from '../../redux/auditories/auditoriesAsyncActions'

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
    register,
    resetField,
    clearErrors,
    formState: { errors },
    handleSubmit,
  } = useForm<{ name: string }>({
    mode: 'onSubmit',
  })

  const onSubmit: SubmitHandler<{ name: string }> = (data) => {
    try {
      console.log(data)
      dispatch(createAuditoryCategory(data.name))
    } catch (err) {
      alert(err)
    } finally {
      resetField('name')
    }
  }

  const onClearFields = () => {
    resetField('name')
    clearErrors()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['categories-form']}>
        <Input
          setValue={() => {}}
          label="Назва"
          labelBackColor="dark"
          width="100%"
          {...register('name', { required: "Ім'я обов'язкове" })}
          isError={!!errors.name}
          errorMessage={errors.name?.message}
        />
      </div>

      <div className={styles['categories-controls']}>
        <Button
          variant="outlined"
          disabled={loadingStatus === LoadingStatusTypes.LOADING}
          type="button"
          onClick={() => setUpdateCategoryModalVisible(true)}
        >
          Редагувати
        </Button>

        <div>
          <Button
            type="submit"
            variant="outlined"
            sx={{ marginRight: '20px' }}
            disabled={loadingStatus === LoadingStatusTypes.LOADING}
          >
            Зберегти
          </Button>

          <Button
            type="button"
            variant="outlined"
            color="gray"
            disabled={loadingStatus === LoadingStatusTypes.LOADING}
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
