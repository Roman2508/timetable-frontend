import React from "react"
import cn from "classnames"

import styles from "./GroupPage.module.scss"
import Title from "../../components/ui/Title/Title"
import Paper from "../../components/ui/Paper/Paper"
import { ThemeContext } from "../../App"
import Button from "../../components/ui/Button/Button"
import Input from "../../components/ui/Input/Input"
import Select from "../../components/ui/Select/Select"

const GroupPage = () => {
  const { colorMode } = React.useContext(ThemeContext)

  const [t, setT] = React.useState(null)

  return (
    <div className={styles.container}>
      <Paper classNames={styles.wrapper}>
        <div
          className={cn(styles.top, {
            [styles.light]: colorMode === "light",
            [styles.dark]: colorMode === "dark",
          })}
        >
          <Title Variant="h6" align="left">
            Група PH-22-1
          </Title>
        </div>

        <div className={styles.controls}>
          <div className={styles["left-col"]}>
            <Input
              setValue={() => {}}
              labelBackColor="dark"
              width="100%"
              wrapperSx={{ marginBottom: "20px" }}
              label="Шифр групи"
            />
            <Input
              setValue={() => {}}
              labelBackColor="dark"
              width="100%"
              wrapperSx={{ marginBottom: "20px" }}
              label="Рік вступу"
              htmlType="number"
            />
            <Input
              setValue={() => {}}
              labelBackColor="dark"
              width="100%"
              wrapperSx={{ marginBottom: "20px" }}
              label="Курс"
              htmlType="number"
            />
            <Input
              setValue={() => {}}
              labelBackColor="dark"
              width="100%"
              wrapperSx={{ marginBottom: "20px" }}
              label="Кількість студентів"
              htmlType="number"
            />
            <Select
              label="Форма навчання"
              labelBgColor="dark"
              options={[
                { value: "full-time", label: "Денна" },
                { value: "part-time", label: "Заочна" },
              ]}
              selectValue={t}
              onChange={(e) => setT(e)}
            />
            {/* <Input
              setValue={() => {}}
              labelBackColor="dark"
              width="100%"
              wrapperSx={{ marginBottom: "20px" }}
              label="Форма навчання"
            /> */}
          </div>
          <div className={styles["right-col"]}>
            <div
              className={cn(styles["info-button"], {
                [styles.light]: colorMode === "light",
                [styles.dark]: colorMode === "dark",
              })}
            >
              НАВЧАЛЬНИЙ ПЛАН:
            </div>
            <div
              className={cn(styles["info-button"], {
                [styles.light]: colorMode === "light",
                [styles.dark]: colorMode === "dark",
              })}
            >
              ПОТОКИ
            </div>
            <div
              className={cn(styles["info-button"], {
                [styles.light]: colorMode === "light",
                [styles.dark]: colorMode === "dark",
              })}
            >
              ПІДГРУПИ
            </div>
            <div
              className={cn(styles["info-button"], {
                [styles.light]: colorMode === "light",
                [styles.dark]: colorMode === "dark",
              })}
            >
              СПЕЦ. ПІДГРУПИ
            </div>
          </div>
        </div>
      </Paper>

      <div className={styles.actions}>
        <Button sx={{ marginRight: "24px" }} variant="text" color="black">
          Відмінити
        </Button>
        <Button sx={{ marginRight: "2px" }} variant="outlined">
          Зберегти
        </Button>
      </div>
    </div>
  )
}

export default GroupPage
