import React from "react"
import cn from "classnames"
import { useSelector } from "react-redux"
import { UseFormSetValue } from "react-hook-form"

import Modal from "../ui/Modal/Modal"
import { ThemeContext } from "../../App"
import styles from "./GroupPage.module.scss"
import Checkbox from "../ui/Checkbox/Checkbox"
import Skeleton from "../ui/Skeleton/Skeleton"
import { useAppDispatch } from "../../redux/store"
import { LoadingStatusTypes } from "../../redux/appTypes"
import { plansSelector } from "../../redux/plans/plansSlice"
import { GroupFormType } from "../../redux/groups/groupsTypes"
import { getPlansCategories } from "../../redux/plans/plansAsyncActions"
import Button from "../ui/Button/Button"

interface ISelectPlanModalProps {
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  setValue: UseFormSetValue<GroupFormType> | any
  selectedPlanId: number | null
}

export const SelectPlanModal = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<ISelectPlanModalProps>
>(({ isShow, setIsShow, selectedPlanId, setValue }, ref) => {
  const dispatch = useAppDispatch()

  const { plansCategories, loadingStatus } = useSelector(plansSelector)

  const { colorMode } = React.useContext(ThemeContext)

  React.useEffect(() => {
    dispatch(getPlansCategories())
  }, [])

  console.log(selectedPlanId)


  return (
    <Modal
      isShow={isShow}
      setIsShow={setIsShow}
      modalTitle="Навчальні плани:"
      ref={ref}
      sx={{ minWidth: "440px" }}
    >
      {loadingStatus !== LoadingStatusTypes.LOADING
        ? plansCategories
          ? plansCategories.map((planCategory) => (
              <div className={styles["plan-wrapper"]} key={planCategory.id}>
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
                    {planCategory.name}
                  </div>

                  <div
                    className={cn(styles["plan-divider"], {
                      [styles.light]: colorMode === "light",
                      [styles.dark]: colorMode === "dark",
                    })}
                  />
                </div>

                <div className={styles["plans-list"]}>
                  {planCategory.plans.map((plan) => (
                    <div className={styles["plan"]} key={plan.id}>
                      <Checkbox
                        isChecked={selectedPlanId === plan.id}
                        color="black"
                        onClick={() => setValue(plan.id)}
                        // onClick={() => setValue("educationPlan", plan.id)}
                        sx={{ margin: "8px 0" }}
                      >
                        {plan.name}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </div>
            ))
          : []
        : Array(3)
            .fill(null)
            .map((_, index) => <Skeleton key={index} width="100%" height="75px" />)}

      <div style={{ textAlign: "center" }}>
        <Button variant="outlined" sx={{ marginTop: "16px" }} onClick={() => setIsShow(false)}>
          Зберегти
        </Button>
      </div>
    </Modal>
  )
})
