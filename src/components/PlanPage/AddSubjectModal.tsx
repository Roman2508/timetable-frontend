import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Modal from '../ui/Modal/Modal'
import Input from '../ui/Input/Input'
import Button from '../ui/Button/Button'
import styles from './PlanPage.module.scss'
import { useAppDispatch } from '../../redux/store'
import { deleteAuditoryCategory, updateAuditoryCategory } from '../../redux/auditories/auditoriesAsyncActions'
import { useParams } from 'react-router-dom'
import { createPlanSubjects } from '../../redux/plans/plansAsyncActions'

type FieldsType = {
  name: string
}

interface IAddSubjectModalProps {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  isShow: boolean
}

const AddSubjectModal = React.forwardRef<HTMLDivElement, IAddSubjectModalProps>(({ setIsShow, isShow }, ref) => {
  const dispatch = useAppDispatch()

  const params = useParams()

  const {
    watch,
    control,
    register,
    setValue,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldsType>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<FieldsType> = async (data) => {
    if (!params.id) return

    const payload = { name: data.name, planId: Number(params.id) }
    setIsShow(false)
    await dispatch(createPlanSubjects(payload))
    resetField('name')
  }

  //   const onDeleteCategory = async () => {
  //     const deletedCategoryId = watch('category.value')
  //     if (!deletedCategoryId) alert('Виберіть категорію')
  //     if (window.confirm('Ви дійсно хочете видалити категорію?')) {
  //       setIsShow(false)

  //       await dispatch(deleteAuditoryCategory(Number(deletedCategoryId)))

  //       resetField('name')
  //     }
  //   }

  // console.log(setFocus)

  React.useEffect(() => {
    if (!isShow) {
      resetField('name')
    }
  }, [isShow])

  return (
    <Modal isShow={isShow} setIsShow={setIsShow} modalTitle="Додати дисципліну" ref={ref}>
      <form style={{ marginTop: '40px' }} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Назва"
          width="100%"
          labelBackColor="dark"
          value={watch('name')}
          wrapperSx={{ marginBottom: '20px' }}
          {...register('name', { required: true })}
        />

        <div className={styles['update-category-modal-actions']}>
          <Button variant="outlined">Зберегти</Button>
        </div>
      </form>
    </Modal>
  )
})

export default AddSubjectModal
