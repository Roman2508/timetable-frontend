import React from "react"
import cn from "classnames"
import Modal from "../ui/Modal/Modal"
import styles from "./GroupPage.module.scss"
import Checkbox from "../ui/Checkbox/Checkbox"
import { ThemeContext } from "../../App"

interface ISelectPlanModalProps {
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const SelectPlanModal = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<ISelectPlanModalProps>
>(({ isShow, setIsShow }, ref) => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <Modal
      isShow={isShow}
      setIsShow={setIsShow}
      modalTitle="Навчальні плани:"
      ref={ref}
      sx={{ minWidth: "400px" }}
    >
      <div className={styles["plan-wrapper"]}>
        <div className={styles["plan-title"]}>
          <div
            className={cn(styles["plan-divider"], {
              [styles.light]: colorMode === "light",
              [styles.dark]: colorMode === "dark",
            })}
          />

          <div
            className={cn(styles["plan-name"], {
              [styles.light]: colorMode === "light",
              [styles.dark]: colorMode === "dark",
            })}
          >
            asdasdas
          </div>

          <div
            className={cn(styles["plan-divider"], {
              [styles.light]: colorMode === "light",
              [styles.dark]: colorMode === "dark",
            })}
          />
        </div>

        <div className={styles["plans-list"]}>
          <div className={styles["plan"]}>
            <Checkbox isChecked={true} color="black" sx={{ margin: "8px 0" }}>
              Plan name lan name lan name
            </Checkbox>
          </div>

          <div className={styles["plan"]}>
            <Checkbox isChecked={true} color="black" sx={{ margin: "8px 0" }}>
              Plan name lan name lan name
            </Checkbox>
          </div>

          <div className={styles["plan"]}>
            <Checkbox isChecked={true} color="black" sx={{ margin: "8px 0" }}>
              Plan name lan name lan name
            </Checkbox>
          </div>
        </div>
      </div>

      <div className={styles["plan-wrapper"]}>
        <div className={styles["plan-title"]}>
          <div
            className={cn(styles["plan-divider"], {
              [styles.light]: colorMode === "light",
              [styles.dark]: colorMode === "dark",
            })}
          />

          <div
            className={cn(styles["plan-name"], {
              [styles.light]: colorMode === "light",
              [styles.dark]: colorMode === "dark",
            })}
          >
            asdasdas
          </div>

          <div
            className={cn(styles["plan-divider"], {
              [styles.light]: colorMode === "light",
              [styles.dark]: colorMode === "dark",
            })}
          />
        </div>

        <div className={styles["plans-list"]}>
          <div className={styles["plan"]}>
            <Checkbox isChecked={false} color="black" sx={{ margin: "8px 0" }}>
              Plan name lan name lan name
            </Checkbox>
          </div>

          <div className={styles["plan"]}>
            <Checkbox isChecked={true} color="black" sx={{ margin: "8px 0" }}>
              Plan name lan name lan name
            </Checkbox>
          </div>

          <div className={styles["plan"]}>
            <Checkbox isChecked={true} color="black" sx={{ margin: "8px 0" }}>
              Plan name lan name lan name
            </Checkbox>
          </div>
        </div>
      </div>
    </Modal>
  )
})
