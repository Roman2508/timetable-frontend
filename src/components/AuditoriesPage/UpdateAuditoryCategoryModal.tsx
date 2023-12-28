import React from 'react'

import Modal from '../ui/Modal/Modal'
import Input from '../ui/Input/Input'
import Button from '../ui/Button/Button'
import styles from './AuditoriesPage.module.scss'
import SelectComponent from '../ui/Select/Select'
import { AuditoryCategoriesTypes } from '../../redux/auditories/auditoriesTypes'
import { Id, Theme, toast } from 'react-toastify'
import { ThemeContext } from '../../App'
import { useAppDispatch } from '../../redux/store'
import { deleteAuditoryCategory } from '../../redux/auditories/auditoriesAsyncActions'

interface IUpdateAuditoryCategoryModalProps {
  auditoriCategories: AuditoryCategoriesTypes[] | null
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  ref: any
}

const UpdateAuditoryCategoryModal = React.forwardRef<HTMLDivElement, IUpdateAuditoryCategoryModalProps>(
  ({ auditoriCategories, setIsShow, isShow }, ref) => {
    const dispatch = useAppDispatch()

    const onRemoveCategory = async (id: number) => {
      await dispatch(deleteAuditoryCategory(id))
      setIsShow(false)
    }

    return (
      <Modal isShow={isShow} setIsShow={setIsShow} modalTitle="Редагувати категорію" ref={ref}>
        <form style={{ marginTop: '40px' }}>
          <SelectComponent
            label="Категорія"
            labelBgColor="dark"
            customClassNames={styles['auditories-select']}
            options={auditoriCategories ? auditoriCategories.map((el) => ({ value: el.name, label: el.name })) : []}
          />

          <Input
            setValue={() => {}}
            label="Назва"
            labelBackColor="dark"
            width="100%"
            wrapperSx={{ margin: '20px 0' }}
          />

          <div className={styles['update-category-modal-actions']}>
            <Button variant="outlined">Зберегти</Button>

            <Button variant="outlined" color="red" type="button" onClick={() => onRemoveCategory(3)}>
              Видалити
            </Button>
          </div>
        </form>
      </Modal>
    )
  }
)

export default UpdateAuditoryCategoryModal
