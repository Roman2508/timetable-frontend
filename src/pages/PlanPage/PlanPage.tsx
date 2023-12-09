import React from "react"
import styles from "./PlanPage.module.scss"
import Table from "../../components/ui/Table/Table"
import TableHead from "../../components/ui/Table/TableHead"
import TableHeadCell from "../../components/ui/Table/TableHeadCell"
import TableBody from "../../components/ui/Table/TableBody"
import TableBodyCell from "../../components/ui/Table/TableBodyCell"
import TableRow from "../../components/ui/Table/TableRow"
import Title from "../../components/ui/Title/Title"
import Checkbox from "../../components/ui/Checkbox/Checkbox"
import IconButton from "../../components/ui/IconButton/IconButton"
import Input from "../../components/ui/Input/Input"

const PlanPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles["plan-top"]}>
        <Title Variant="h5" sx={{ margin: "20px 0" }}>
          Менеджмент 2023. Магістр
        </Title>

        <Input htmlType="search" setValue={() => {}} label="Пошук" />

        <div className={styles["plan-filter"]}>
          {Array(6)
            .fill(null)
            .map((el, index) => (
              <label>
                <Checkbox color="black" />
                <span>Сем. {index + 1}</span>
              </label>
            ))}
        </div>
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
                <TableBodyCell>Менеджмент</TableBodyCell>
                <TableBodyCell>60</TableBodyCell>
                <TableBodyCell>3</TableBodyCell>
                <TableBodyCell>4</TableBodyCell>
                <TableBodyCell>5</TableBodyCell>
                <TableBodyCell>6</TableBodyCell>
                <TableBodyCell>7</TableBodyCell>
                <TableBodyCell>8</TableBodyCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default PlanPage
