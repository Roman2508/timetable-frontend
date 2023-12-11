import React from "react"
import cn from "classnames"
import { IoFilter } from "react-icons/io5"

import { ThemeContext } from "../../App"
import Text from "../../components/ui/Text/Text"
import Table from "../../components/ui/Table/Table"
import Input from "../../components/ui/Input/Input"
import styles from "./DistributionPage.module.scss"
import Paper from "../../components/ui/Paper/Paper"
import Title from "../../components/ui/Title/Title"
import ListItem from "../../components/ui/List/ListItem"
import TableRow from "../../components/ui/Table/TableRow"
import TableBody from "../../components/ui/Table/TableBody"
import TableHead from "../../components/ui/Table/TableHead"
import EmptyDark from "../../assets/images/empty-dark.png"
import EmptyLight from "../../assets/images/empty-light.png"
import ListWrapper from "../../components/ui/List/ListWrapper"
import { Accordion } from "../../components/ui/Accordion/Accordion"
import IconButton from "../../components/ui/IconButton/IconButton"
import TableHeadCell from "../../components/ui/Table/TableHeadCell"
import TableBodyCell from "../../components/ui/Table/TableBodyCell"

import { GrClear as ClearAllIcon } from "react-icons/gr"
import { AiOutlineClear as ClearIcon } from "react-icons/ai"
import { GiConfirmed as ConfirmIcon } from "react-icons/gi"

import { MdOutlineArrowCircleLeft as ArrowIcon } from "react-icons/md"
import { MdKeyboardDoubleArrowLeft as DoubleArrowIcon } from "react-icons/md"

const lessons = [
  "Лекції",
  "Практичні",
  "Лабораторні",
  "Семінари",
  "Екзамени",
  "Консультація перед екзаменом",
  "Методичне керівництво",
]

const DistributionPage = () => {
  const { colorMode } = React.useContext(ThemeContext)

  const [isEmpty, setIsEmpty] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <div className={styles.container}>
      <Paper classNames={cn(styles.col, styles["left-col"])}>
        <Title Variant="h6">Розподіл навантаження</Title>

        <div className={styles["filter-icon"]}>
          <IconButton>
            <IoFilter size={24} />
          </IconButton>
        </div>

        {isEmpty ? (
          <div className={styles["empty-box"]}>
            <img
              className={styles["empty-image"]}
              src={colorMode === "light" ? EmptyLight : EmptyDark}
              //   src="src/assets/images/empty-image.png"
              alt="empty image"
            />
            <p>Пусто</p>
          </div>
        ) : (
          <Table sx={{ padding: "20px 10px" }}>
            <TableHead>
              <TableRow variant="head">
                <TableHeadCell align="left">Назва дисципліни</TableHeadCell>
                <TableHeadCell sx={{ maxWidth: "20px" }}>Семестр</TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableBodyCell align="left">Інформаційні технології в фармації</TableBodyCell>
                <TableBodyCell sx={{ maxWidth: "20px" }}>1</TableBodyCell>
              </TableRow>
              <TableRow>
                <TableBodyCell align="left">Інформаційні технології в фармації</TableBodyCell>
                <TableBodyCell sx={{ maxWidth: "20px" }}>2</TableBodyCell>
              </TableRow>
              <TableRow>
                <TableBodyCell align="left">Інформаційні технології в фармації</TableBodyCell>
                <TableBodyCell sx={{ maxWidth: "20px" }}>3</TableBodyCell>
              </TableRow>
              <TableRow>
                <TableBodyCell align="left">Менеджмент</TableBodyCell>
                <TableBodyCell sx={{ maxWidth: "20px" }}>4</TableBodyCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Paper>

      <div className={styles.col}>
        <Paper sx={{ marginBottom: "20px" }}>
          <Title Variant="h6">Виберіть дисципліну</Title>

          <div style={{ margin: "10px 0" }}>
            <hr />
          </div>

          <div className={styles["distributed-actions"]}>
            <IconButton>
              <ClearIcon size={24} />
            </IconButton>

            <IconButton>
              <ClearAllIcon size={24} />
            </IconButton>

            <IconButton>
              <DoubleArrowIcon size={24} />
            </IconButton>
          </div>

          <div style={{ margin: "10px 0" }}>
            <hr />
          </div>

          {lessons.map((el) => (
            <div key={el} className={styles["subject-row"]}>
              <p style={{ width: "220px", flexGrow: "1" }}>{el}</p>

              <Input setValue={() => {}} width="180px" />

              <IconButton>
                <ArrowIcon size={24} />
              </IconButton>
            </div>
          ))}
        </Paper>

        <Paper sx={{ marginBottom: "40px" }}>
          <Title Variant="h6">Кількість студентів</Title>

          {lessons.map((el) => (
            <div key={el} className={styles["subject-row"]}>
              <p style={{ width: "220px", flexGrow: "1" }}>{el}</p>

              <Input setValue={() => {}} width="180px" />

              <IconButton>
                <ConfirmIcon size={20} />
              </IconButton>
            </div>
          ))}
        </Paper>
      </div>

      <div className={styles.col}>
        <Paper sx={{ marginBottom: "20px" }}>
          <Title Variant="h6">Викладачі</Title>
        </Paper>

        <Accordion sx={{ marginBottom: "20px" }} title="ЦК Гуманітарних дисциплін">
          <ListWrapper sx={{ maxWidth: "100%" }}>
            <ListItem>Стельмах Ірина Миколаївна</ListItem>
            <ListItem>Луцак Ірина Василівна</ListItem>
          </ListWrapper>
        </Accordion>

        <Accordion sx={{ marginBottom: "20px" }} title="ЦК Загальноосвітніх дисциплін">
          <ListWrapper sx={{ maxWidth: "100%" }}>
            <ListItem>Стельмах Ірина Миколаївна</ListItem>
            <ListItem>Луцак Ірина Василівна</ListItem>
          </ListWrapper>
        </Accordion>

        <Accordion sx={{ marginBottom: "20px" }} title="ЦК Фрамацевтичних дисциплін дисциплін">
          <ListWrapper sx={{ maxWidth: "100%" }}>
            <ListItem>Стельмах Ірина Миколаївна</ListItem>
            <ListItem>Луцак Ірина Василівна</ListItem>
          </ListWrapper>
        </Accordion>

        <Accordion sx={{ marginBottom: "20px" }} title="ЦК Медико-біологічних дисциплін">
          <ListWrapper sx={{ maxWidth: "100%" }}>
            <ListItem>Стельмах Ірина Миколаївна</ListItem>
            <ListItem>Луцак Ірина Василівна</ListItem>
          </ListWrapper>
        </Accordion>

        <Accordion sx={{ marginBottom: "20px" }} title="ЦК Хімічних дисциплін">
          <ListWrapper sx={{ maxWidth: "100%" }}>
            <ListItem>Стельмах Ірина Миколаївна</ListItem>
            <ListItem>Луцак Ірина Василівна</ListItem>
          </ListWrapper>
        </Accordion>
      </div>
    </div>
  )
}

export default DistributionPage
