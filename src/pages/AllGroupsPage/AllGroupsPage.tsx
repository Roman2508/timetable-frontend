import React from "react"
import { NavLink } from "react-router-dom"
import { MdDeleteOutline as DeleteIcon } from "react-icons/md"
import { MdDriveFileRenameOutline as RenameIcon } from "react-icons/md"

import styles from "./AllGroupsPage.module.scss"
import Title from "../../components/ui/Title/Title"
import Table from "../../components/ui/Table/Table"
import ListItem from "../../components/ui/List/ListItem"
import TableRow from "../../components/ui/Table/TableRow"
import TableBody from "../../components/ui/Table/TableBody"
import TableHead from "../../components/ui/Table/TableHead"
import ListWrapper from "../../components/ui/List/ListWrapper"
import IconButton from "../../components/ui/IconButton/IconButton"
import TableHeadCell from "../../components/ui/Table/TableHeadCell"
import TableBodyCell from "../../components/ui/Table/TableBodyCell"

const data = [
  { name: "Фармація, промислова фармація", count: "4" },
  { name: "Лабораторна діагностика", count: "6" },
  { name: "Заочна форма навчання", count: "2" },
  { name: "Фармація, промислова фармація. Фаховий молодший бакалавр", count: "7" },
  { name: "Фармація, промислова фармація. Перший (бакалаврський рівень)", count: "44" },
  {
    name: "Фармація, промислова фармація. Перший (бакалаврський рівень) ",
    count: "12",
  },
]

const groups = [
  { name: "PH-23-1", count: "4" },
  { name: "PH-23-2", count: "6" },
  { name: "PH-23-3", count: "2" },
  { name: "LD-21-1", count: "7" },
  { name: "LD-22-1", count: "44" },
  { name: "PHe-23-1", count: "12" },
]

const Groups: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles["col-left"]}>
        <Title Variant="h5" classNames={styles["col-left-title"]}>
          Структурні підрозділи
        </Title>

        <ListWrapper sx={{ maxWidth: "100%" }}>
          {data.map((el) => (
            <ListItem key={el.name}>
              <div className={styles.subdiv}>
                <div className={styles["subdiv-name"]}>{el.name}</div>
                <div className={styles["subdiv-groups-count"]}>Кількість груп: {el.count}</div>
              </div>
            </ListItem>
          ))}
        </ListWrapper>
      </div>

      <div className={styles["col-right"]}>
        <div className={styles["col-right-controls"]}>
          <Title Variant="h5">Групи</Title>

          <div className={styles["selected-group"]}>
            <Title
              Variant="h6"
              sx={{
                marginRight: "10px",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: "450px",
              }}
            >
              Фармація, промислова фармація промислова фармація
            </Title>

            <IconButton
              sx={{
                marginRight: "10px",
              }}
            >
              <RenameIcon size={20} />
            </IconButton>

            <IconButton>
              <DeleteIcon size={20} />
            </IconButton>
          </div>
        </div>

        <Table>
          <TableHead>
            <TableHeadCell>Назва</TableHeadCell>
            <TableHeadCell>Курс</TableHeadCell>
            <TableHeadCell>Cтудентів</TableHeadCell>
            <TableHeadCell>Дії</TableHeadCell>
          </TableHead>

          <TableBody>
            {groups.map((el) => (
              <TableRow key={el.name}>
                <TableBodyCell
                  align="left"
                  sx={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    // width: "55%",
                  }}
                >
                  <NavLink to="/group/1" className={styles.groupName}>
                    {el.name}
                  </NavLink>
                </TableBodyCell>

                <TableBodyCell>2</TableBodyCell>

                <TableBodyCell>3</TableBodyCell>

                <TableBodyCell>
                  <IconButton>
                    <RenameIcon size={20} />
                  </IconButton>

                  <IconButton>
                    <DeleteIcon size={20} />
                  </IconButton>
                </TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Groups
