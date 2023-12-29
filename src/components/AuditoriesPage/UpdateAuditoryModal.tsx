import React from 'react'

import Modal from '../ui/Modal/Modal'
import styles from './AuditoriesPage.module.scss'
import { AuditoriesTypes, AuditoryCategoriesTypes } from '../../redux/auditories/auditoriesTypes'
import Button from '../ui/Button/Button'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { AuditoryFieldsType } from './CreateAuditoryForm'
import Input from '../ui/Input/Input'
import Select from '../ui/Select/Select'
import { useAppDispatch } from '../../redux/store'
import { deleteAuditory, updateAuditory } from '../../redux/auditories/auditoriesAsyncActions'

interface IUpdateAuditoryModalProps {
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  auditoriCategories: AuditoryCategoriesTypes[] | null
  selectedAuditory: AuditoriesTypes | null
  setSelectedAuditory: React.Dispatch<React.SetStateAction<AuditoriesTypes | null>>
}

const UpdateAuditoryModal = React.forwardRef<HTMLDivElement, IUpdateAuditoryModalProps>(
  ({ isShow, setIsShow, selectedAuditory, auditoriCategories, setSelectedAuditory }, ref) => {
    const dispatch = useAppDispatch()

    const {
      watch,
      control,
      register,
      setValue,
      resetField,
      formState: { errors },
      handleSubmit,
    } = useForm<AuditoryFieldsType>({
      mode: 'onChange',
    })

    const onSubmit: SubmitHandler<AuditoryFieldsType> = async (data) => {
      if (!selectedAuditory) return

      const updatedAuditory = {
        id: selectedAuditory.id,
        name: data.name,
        seatsNumber: Number(data.seatsNumber),
        category: Number(data.category.value),
      }

      setIsShow(false)
      await dispatch(updateAuditory(updatedAuditory))
      onClearFields()
    }

    const onClearFields = () => {
      resetField('name')
      resetField('seatsNumber')
      resetField('category')
    }

    const onDeleteAuditory = async () => {
      if (!selectedAuditory) return
      if (window.confirm('Ви дійсно хочете видалити аудиторію?')) {
        setIsShow(false)
        await dispatch(deleteAuditory(selectedAuditory.id))
        setSelectedAuditory(null)
      }
    }

    React.useEffect(() => {
      if (!selectedAuditory) return

      setValue('name', selectedAuditory.name)
      setValue('seatsNumber', selectedAuditory.seatsNumber)
      setValue('category', {
        value: String(selectedAuditory.category.id),
        label: selectedAuditory.category.name,
      })
    }, [selectedAuditory])

    return (
      <Modal isShow={isShow} setIsShow={setIsShow} modalTitle="Редагувати аудиторію" ref={ref}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['auditories-form']}>
            <Input
              width="100%"
              label="Назва"
              value={watch('name')}
              labelBackColor="dark"
              isError={!!errors.name}
              wrapperSx={{ marginTop: '20px' }}
              errorMessage={errors.name?.message}
              {...register('name', { required: true })}
            />

            <Input
              width="100%"
              htmlType="number"
              value={watch('seatsNumber')}
              labelBackColor="dark"
              label="Кількість місць"
              isError={!!errors.seatsNumber}
              errorMessage={errors.seatsNumber?.message}
              {...register('seatsNumber', { required: true })}
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

          <div className={styles['update-category-modal-actions']}>
            <Button variant="outlined" color="red" type="button" onClick={onDeleteAuditory}>
              Видалити
            </Button>

            <Button variant="outlined">Зберегти</Button>
          </div>
        </form>
      </Modal>
    )
  }
)

export default UpdateAuditoryModal
