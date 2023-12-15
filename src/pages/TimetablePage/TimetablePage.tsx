import React from "react"
import cn from "classnames"

import styles from "./TimetablePage.module.scss"
import Paper from "../../components/ui/Paper/Paper"
import SelectComponent from "../../components/ui/Select/Select"
import ToggleButtonWrapper from "../../components/ui/ToggleButton/ToggleButtonWrapper"
import ToggleButtonItem from "../../components/ui/ToggleButton/ToggleButtonItem"
import { ThemeContext } from "../../App"
import Table from "../../components/ui/Table/Table"
import TableHead from "../../components/ui/Table/TableHead"
import TableRow from "../../components/ui/Table/TableRow"
import TableHeadCell from "../../components/ui/Table/TableHeadCell"
import TableBody from "../../components/ui/Table/TableBody"
import TableBodyCell from "../../components/ui/Table/TableBodyCell"

const TimetablePage = () => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <div className={styles.container}>
      <div className={styles["row-center"]}>
        <div className={styles["filter-wrapper"]}>
          <SelectComponent setValue={() => {}} label="Структурний підрозділ" width="350px" />

          <SelectComponent setValue={() => {}} label="Група" width="200px" />

          <SelectComponent
            setValue={() => {}}
            label="Тиждень"
            width="130px"
            options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
            ]}
          />
        </div>

        <ToggleButtonWrapper>
          <ToggleButtonItem buttonIndex={0} setActiveButton={() => {}}>
            Група
          </ToggleButtonItem>
          <ToggleButtonItem buttonIndex={1} setActiveButton={() => {}}>
            Викладач
          </ToggleButtonItem>
          <ToggleButtonItem buttonIndex={2} setActiveButton={() => {}}>
            Аудиторія
          </ToggleButtonItem>
        </ToggleButtonWrapper>
      </div>

      <div className={styles["row-start"]}>
        <Paper classNames={styles["left-col"]}>
          <Table sx={{ padding: 0 }}>
            <TableHead>
              <TableRow variant="head">
                <TableHeadCell classNames={styles["table-cell"]}>Назва</TableHeadCell>
                <TableHeadCell classNames={styles["table-cell"]}>Викладач</TableHeadCell>
                <TableHeadCell classNames={styles["table-cell"]}>Примітка</TableHeadCell>
                <TableHeadCell classNames={styles["table-cell"]}>План</TableHeadCell>
                <TableHeadCell classNames={styles["table-cell"]}>Факт</TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Array(12)
                .fill(null)
                .map((el) => (
                  <TableRow>
                    <TableBodyCell
                      classNames={styles["table-cell"]}
                      align="left"
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "100%",
                      }}
                    >
                      Інформаційні технології у фармації
                    </TableBodyCell>
                    <TableBodyCell
                      classNames={styles["table-cell"]}
                      sx={{
                        maxWidth: "30%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Пташник Р.В.
                    </TableBodyCell>
                    <TableBodyCell classNames={styles["table-cell"]} sx={{ width: "20%" }}>
                      -
                    </TableBodyCell>
                    <TableBodyCell classNames={styles["table-cell"]} sx={{ width: "10%" }}>
                      60
                    </TableBodyCell>
                    <TableBodyCell classNames={styles["table-cell"]} sx={{ width: "10%" }}>
                      30
                    </TableBodyCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>

        <Paper
          classNames={styles["right-col"]}
          sx={colorMode === "light" ? { background: "#eff0f0" } : { backgroundColor: "#3f4655" }}
        >
          <div className={styles["day-name-row"]}>
            {["", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"].map(
              (el) => (
                <div
                  className={cn(styles["day-name"], { [styles.dark]: colorMode === "dark" })}
                  key={el}
                >
                  {el}
                </div>
              )
            )}
          </div>

          <div className={styles["day-name-row"]}>
            <div className={styles["subject-number-col"]}>
              {[1, 2, 3, 4, 5, 6, 7].map((el) => (
                <div
                  className={cn(styles["subject-number"], { [styles.dark]: colorMode === "dark" })}
                  key={el}
                >
                  {el}
                </div>
              ))}
            </div>

            {Array(7)
              .fill(null)
              .map((el) => (
                <div className={styles.day}>
                  {Array(7)
                    .fill(null)
                    .map((el) => (
                      <div className={cn(styles.lesson, { [styles.dark]: colorMode === "dark" })}>
                        <p>Інформаційні (ПЗ)</p>
                        <p>217 ауд.</p>
                        <p>PHe-21-2</p>
                        <p>Пташник Р.В.</p>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default TimetablePage
