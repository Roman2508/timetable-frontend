import React from 'react'
import styles from './PlanPage.module.scss'
import Table from '../../components/ui/Table/Table'
import TableHead from '../../components/ui/Table/TableHead'
import TableHeadCell from '../../components/ui/Table/TableHeadCell'
import TableBody from '../../components/ui/Table/TableBody'
import TableBodyCell from '../../components/ui/Table/TableBodyCell'
import TableRow from '../../components/ui/Table/TableRow'
import Title from '../../components/ui/Title/Title'
// import Checkbox from '../../components/ui/Checkbox/Checkbox'
// import IconButton from '../../components/ui/IconButton/IconButton'
import Input from '../../components/ui/Input/Input'
import SelectComponent from '../../components/ui/Select/Select'

const PlanPage = () => {
  const [selectedSemesters, setSelectedSemesters] = React.useState([
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
  ])

  return (
    <div className={styles.container}>
      <div className={styles['plan-top']}>
        <Title Variant="h5" sx={{ margin: '20px 0' }}>
          Менеджмент 2023. Магістр
        </Title>

        <Input htmlType="search" setValue={() => {}} label="Пошук" width="350px" />

        <SelectComponent
          label="Вибрані семестри"
          width="350px"
          selectValue={selectedSemesters}
          onChange={(selectedItem) => {
            setSelectedSemesters((prev) => {
              return [...selectedItem]
            })
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
          {Array(17)
            .fill(null)
            .map((el) => (
              <TableRow>
                <TableBodyCell isHover>Менеджмент</TableBodyCell>
                <TableBodyCell isHover>60</TableBodyCell>
                <TableBodyCell isHover>3</TableBodyCell>
                <TableBodyCell isHover>4</TableBodyCell>
                <TableBodyCell isHover>5</TableBodyCell>
                <TableBodyCell isHover>6</TableBodyCell>
                <TableBodyCell isHover>7</TableBodyCell>
                <TableBodyCell isHover>8</TableBodyCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default PlanPage
