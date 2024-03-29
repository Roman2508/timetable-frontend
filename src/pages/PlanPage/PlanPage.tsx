import React from 'react'

import styles from './PlanPage.module.scss'
import Title from '../../components/ui/Title/Title'
import Input from '../../components/ui/Input/Input'
import Table from '../../components/ui/Table/Table'
import Button from '../../components/ui/Button/Button'
import TableRow from '../../components/ui/Table/TableRow'
import TableHead from '../../components/ui/Table/TableHead'
import TableBody from '../../components/ui/Table/TableBody'
import SelectComponent from '../../components/ui/Select/Select'
import TableHeadCell from '../../components/ui/Table/TableHeadCell'
import TableBodyCell from '../../components/ui/Table/TableBodyCell'
import PlanHoursModal from '../../components/PlanHoursModal/PlanHoursModal'
import AddSubjectModal from '../../components/PlanPage/AddSubjectModal'
import { useSelector } from 'react-redux'
import { plansSelector } from '../../redux/plans/plansSlice'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../redux/store'
import { getPlanSubjects } from '../../redux/plans/plansAsyncActions'

const PlanPage = () => {
  const { id } = useParams()

  const dispatch = useAppDispatch()

  const [isOpenSubjectsModal, setIsOpenSubjectsModal] = React.useState(false)
  const [isOpenAddSubjectModal, setIsOpenAddSubjectModal] = React.useState(false)

  const { plan } = useSelector(plansSelector)

  const [selectedSemesters, setSelectedSemesters] = React.useState([
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
  ])

  React.useEffect(() => {
    if (id) {
      dispatch(getPlanSubjects(Number(id)))
    }
  }, [id])

  /* add func: calculateTotalHours !!!!!!! */
  /* add func: calculateTotalHours !!!!!!! */
  /* add func: calculateTotalHours !!!!!!! */

  return (
    <>
      <PlanHoursModal isOpenModal={isOpenSubjectsModal} setIsOpenModal={setIsOpenSubjectsModal} />

      <AddSubjectModal isShow={isOpenAddSubjectModal} setIsShow={setIsOpenAddSubjectModal} />

      <div className={styles.container}>
        <div className={styles['plan-top']}>
          <Title
            Variant="h5"
            sx={{
              margin: '20px 0',
              whiteSpace: 'nowrap',
              maxWidth: '400px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
            classNames={styles['plan-name']}
          >
            Менеджмент 2023. Магістр Менеджмент 2023. Магістр Менеджмент 2023. Магістр
          </Title>

          <Button variant="outlined" onClick={() => setIsOpenAddSubjectModal(true)}>
            Додати дисципліну
          </Button>

          <Input htmlType="search" setValue={() => {}} label="Пошук" width="250px" />

          <SelectComponent
            label="Вибрані семестри"
            width="350px"
            selectValue={selectedSemesters}
            onChange={(selectedItem: { value: string; label: string }[]) => {
              console.log(selectedItem)
              setSelectedSemesters([...selectedItem])
            }}
            multi
            options={[
              { value: '1', label: '1' },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: '4', label: '4' },
              { value: '5', label: '5' },
              { value: '6', label: '6' },
            ]}
          />

          {/* <div className={styles['plan-filter']}>
            {Array(6)
              .fill(null)
              .map((el, index) => (
                <label>
                  <Checkbox color="black" />
                  <span>Сем. {index + 1}</span>
                </label>
              ))}
          </div> */}
        </div>

        <Table>
          <TableHead>
            <TableRow variant="head">
              <TableHeadCell>Назва дисципліни</TableHeadCell>
              <TableHeadCell>Загальна кількість годин</TableHeadCell>
              <TableHeadCell>1 сем.</TableHeadCell>
              <TableHeadCell>2 сем.</TableHeadCell>
              <TableHeadCell>3 сем.</TableHeadCell>
              <TableHeadCell>4 сем.</TableHeadCell>
              <TableHeadCell>5 сем.</TableHeadCell>
              <TableHeadCell>6 сем.</TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!plan ? (
              <h2>Loading...</h2>
            ) : (
              plan.subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableBodyCell isHover align="left">
                    {subject.name}
                  </TableBodyCell>
                  <TableBodyCell>{subject.totalHours}</TableBodyCell>
                  <TableBodyCell isHover onClick={() => setIsOpenSubjectsModal(true)}>
                    {subject.semesterNumber === 1 ? subject.totalHours : ''}
                  </TableBodyCell>
                  <TableBodyCell isHover onClick={() => setIsOpenSubjectsModal(true)}>
                    {subject.semesterNumber === 2 ? subject.totalHours : ''}
                  </TableBodyCell>
                  <TableBodyCell isHover onClick={() => setIsOpenSubjectsModal(true)}>
                    {subject.semesterNumber === 3 ? subject.totalHours : ''}
                  </TableBodyCell>
                  <TableBodyCell isHover onClick={() => setIsOpenSubjectsModal(true)}>
                    {subject.semesterNumber === 4 ? subject.totalHours : ''}
                  </TableBodyCell>
                  <TableBodyCell isHover onClick={() => setIsOpenSubjectsModal(true)}>
                    {subject.semesterNumber === 5 ? subject.totalHours : ''}
                  </TableBodyCell>
                  <TableBodyCell isHover onClick={() => setIsOpenSubjectsModal(true)}>
                    {subject.semesterNumber === 6 ? subject.totalHours : ''}
                  </TableBodyCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default PlanPage
