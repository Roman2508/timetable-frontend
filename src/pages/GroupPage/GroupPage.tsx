import React from "react"
import cn from "classnames"

import { ThemeContext } from "../../App"
import styles from "./GroupPage.module.scss"
import Title from "../../components/ui/Title/Title"
import Paper from "../../components/ui/Paper/Paper"
import Input from "../../components/ui/Input/Input"
import Button from "../../components/ui/Button/Button"
import Select from "../../components/ui/Select/Select"
import { SelectPlanModal } from "../../components/GroupPage/SelectPlanModal"
import { useOutside } from "../../hooks/useOutside"

const groupInitialData = {
  name: "",
  yearOfAdmission: 0,
  courseNumber: 1,
  students: 1,
  formOfEducation: "Денна",
  educationPlan: null,
  stream: null,
  category: null,
  groupLoad: null,
  specializationList: null,
}

const groupReducer = (state: typeof groupInitialData, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "CHANGE_NAME": {
      return { ...state, name: action.payload }
    }
    case "CHANGE_YEAR_OF_ADMISSION": {
      return { ...state, yearOfAdmission: action.payload }
    }
    case "CHANGE_COURSE_NUMBER": {
      return { ...state, courseNumber: action.payload }
    }
    case "CHANGE_STUDENTS": {
      return { ...state, courseNumber: action.payload }
    }
    default: {
      return state
    }
  }

  // throw Error("Unknown action.")
}

const GroupPage = () => {
  const { colorMode } = React.useContext(ThemeContext)

  const [state, dispatch] = React.useReducer(groupReducer, groupInitialData)

  const [t, setT] = React.useState(null)

  const {
    ref: planModalRef,
    isShow: isPlanModalShow,
    setIsShow: setIsPlanModalShow,
  } = useOutside(false)

  return (
    <>
      <SelectPlanModal ref={planModalRef} isShow={isPlanModalShow} setIsShow={setIsPlanModalShow} />

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
                onChange={(e: any) => setT(e)}
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
                onClick={() => setIsPlanModalShow(true)}
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
    </>
  )
}

export default GroupPage
