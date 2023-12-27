import React from 'react'
import { useForm } from 'react-hook-form'

import styles from './AuditoriesPage.module.scss'
import Input from '../ui/Input/Input'
import SelectComponent from '../ui/Select/Select'
import { AuditoryCategoriesTypes } from '../../redux/auditories/auditoriesTypes'
import Button from '../ui/Button/Button'

type NewAuditoryFieldsType = {
  name: string
  seatsNumber: number
  category: { value: string; label: string }
}

interface ICreateAuditoryFormProps {
  auditoriCategories: AuditoryCategoriesTypes[] | null
}

const CreateAuditoryForm: React.FC<ICreateAuditoryFormProps> = ({ auditoriCategories }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<NewAuditoryFieldsType>({
    mode: 'onChange',
  })

  const onSubmit = () => {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['auditories-form']}>
        <Input
          width="245px"
          label="Назва"
          setValue={() => {}}
          labelBackColor="dark"
          {...register('name', { required: true })}
        />
        <Input
          width="245px"
          htmlType="number"
          setValue={() => {}}
          labelBackColor="dark"
          label="Кількість місць"
          {...register('seatsNumber', { required: true })}
        />
        {/* <Input setValue={() => {}} label="Категорія" labelBackColor="dark" width="100%" /> */}
        <SelectComponent
          label="Категорія"
          labelBgColor="dark"
          customClassNames={styles['auditories-select']}
          {...register('category', { required: true })}
          options={auditoriCategories ? auditoriCategories.map((el) => ({ value: String(el.id), label: el.name })) : []}
        />
        {/* <Input setValue={() => {}} label="label" labelBackColor="dark" width="245px" /> */}
      </div>

      <div className={styles['auditories-controls']}>
        <Button sx={{ marginRight: '20px' }} variant="outlined">
          Зберегти
        </Button>

        <Button variant="outlined" color="gray">
          Очистити
        </Button>
      </div>
    </form>
  )
}

export default CreateAuditoryForm
