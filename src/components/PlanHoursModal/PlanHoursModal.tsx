import React from 'react'
import styles from './PlanHoursModal.module.scss'
import Modal from '../ui/Modal/Modal'
import Input from '../ui/Input/Input'
import Text from '../ui/Text/Text'
import Button from '../ui/Button/Button'

interface IPlanHoursModalProps {
  isOpenModal: boolean
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const PlanHoursModal: React.FC<IPlanHoursModalProps> = ({ isOpenModal, setIsOpenModal }) => {
  return (
    <Modal isShow={isOpenModal} setIsShow={setIsOpenModal} modalTitle="Менеджмент">
      <div>Факт 60 / План 60</div>
      <div className={styles.wrapper}>
        <div className={styles['left-col']}>
          <Text classNames={styles.text}>Лекції</Text>
          <Text classNames={styles.text}>Практичні</Text>
          <Text classNames={styles.text}>Лабораторні</Text>
          <Text classNames={styles.text}>Семінари</Text>
          <Text classNames={styles.text}>Екзамени</Text>
          <Text classNames={styles.text}>Консультація перед екзаменом</Text>
          <Text classNames={styles.text}>Методичне керівництво</Text>
          <Text classNames={styles.text}>Самостійна робота</Text>
          <Text classNames={styles.text}>Загальна кількість годин</Text>
        </div>

        <div className={styles['right-col']}>
          <Input setValue={() => {}} width="100px" sx={{ marginBottom: '12px' }} htmlType="number" />
          <Input setValue={() => {}} width="100px" sx={{ marginBottom: '12px' }} htmlType="number" />
          <Input setValue={() => {}} width="100px" sx={{ marginBottom: '12px' }} htmlType="number" />
          <Input setValue={() => {}} width="100px" sx={{ marginBottom: '12px' }} htmlType="number" />
          <Input setValue={() => {}} width="100px" sx={{ marginBottom: '12px' }} htmlType="number" />
          <Input setValue={() => {}} width="100px" sx={{ marginBottom: '12px' }} htmlType="number" />
          <Input setValue={() => {}} width="100px" sx={{ marginBottom: '12px' }} htmlType="number" />
          <Input setValue={() => {}} width="100px" sx={{ marginBottom: '12px' }} htmlType="number" />
          <Input setValue={() => {}} width="100px" sx={{ marginBottom: '12px' }} htmlType="number" />

          {/* Додати інпут з вибором номеру семестра????? */}
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="outlined" color="red">
          Видалити
        </Button>
        <div>
          <Button variant="outlined" color="gray" onClick={() => setIsOpenModal(false)}>
            Закрити
          </Button>
          <Button sx={{ marginLeft: '20px' }}>Зберегти</Button>
        </div>
      </div>
    </Modal>
  )
}

export default PlanHoursModal
