import React from "react"
import cn from "classnames"
import { NavLink } from "react-router-dom"
import { IoIosArrowDown as ArrowDown } from "react-icons/io"
import { MdDeleteOutline as DeleteIcon } from "react-icons/md"
import { MdDriveFileRenameOutline as RenameIcon } from "react-icons/md"

import Paper from "../ui/Paper/Paper"
import Title from "../ui/Title/Title"
import { ThemeContext } from "../../App"
import styles from "./PlansPage.module.scss"
import { PlanModalsType } from "./PlanModals"
import { useAppDispatch } from "../../redux/store"
import IconButton from "../ui/IconButton/IconButton"
import { PlansCategoriesType } from "../../redux/plans/plansTypes"
import { deletePlan, deletePlanCategory } from "../../redux/plans/plansAsyncActions"

interface IPlanCategoryItemProps {
  category: PlansCategoriesType
  onOpenModal: (
    modalType: PlanModalsType,
    planCategory: { id: number; name: string } | null
  ) => void
  openCategory: number | null
  handleChangeOpenCategory: (id: number) => void
}

const PlanCategoryItem: React.FC<IPlanCategoryItemProps> = ({
  category,
  onOpenModal,
  openCategory,
  handleChangeOpenCategory,
}) => {
  const { colorMode } = React.useContext(ThemeContext)

  const dispatch = useAppDispatch()

  const onDeleteCategory = (id: number) => {
    if (window.confirm("Ви дійсно хочете видалити категорію?")) {
      dispatch(deletePlanCategory(id))
    }
  }

  const onDeletePlan = (id: number) => {
    if (window.confirm("Ви дійсно хочете видалити план?")) {
      dispatch(deletePlan(id))
    }
  }

  return (
    <Paper
      classNames={cn(styles["plan-category"], {
        [styles["open"]]: category.id === openCategory,
        [styles["light"]]: colorMode === "light",
      })}
      key={category.id}
    >
      <>
        <div className={styles["plan-category-controls"]}>
          <div className={styles["plan-top"]}>
            <Title
              Variant="h6"
              align="left"
              classNames={styles["plan-category-name"]}
              title={category.name}
            >
              {category.name}
            </Title>

            <IconButton
              sx={{ marginLeft: "10px" }}
              onClick={() => handleChangeOpenCategory(category.id)}
            >
              <ArrowDown
                style={openCategory === category.id ? { transform: "rotate(180deg)" } : {}}
              />
            </IconButton>
          </div>
          <div className={styles["plan-category-actions"]}>
            <div
              className={styles["plan-category-actions-item"]}
              onClick={() =>
                onOpenModal("update-category", {
                  id: category.id,
                  name: category.name,
                })
              }
            >
              Оновити
            </div>
            <div
              className={styles["plan-category-actions-item"]}
              onClick={() => onDeleteCategory(category.id)}
            >
              Видалити
            </div>
            <div
              className={styles["plan-category-actions-item"]}
              onClick={() => onOpenModal("add-plan", { id: category.id, name: category.name })}
            >
              Додати
            </div>
          </div>
        </div>

        {openCategory === category.id && (
          <div
            className={cn(styles["plans"], {
              [styles["light"]]: colorMode === "light",
            })}
          >
            {category.plans && category.plans.length ? (
              category.plans.map((plan) => (
                <div className={styles["plan"]} key={plan.id}>
                  <NavLink className={styles["plan-name"]} to={`/plan/${plan.id}`}>
                    {plan.name}
                  </NavLink>

                  <div className={styles["plan-controls"]}>
                    <IconButton
                      onClick={() =>
                        onOpenModal("update-plan", {
                          id: category.id,
                          name: category.name,
                        })
                      }
                      sx={{
                        marginRight: "10px",
                      }}
                    >
                      <RenameIcon size={20} />
                    </IconButton>

                    <IconButton onClick={() => onDeletePlan(plan.id)}>
                      <DeleteIcon size={20} />
                    </IconButton>
                  </div>
                </div>
              ))
            ) : (
              <Title Variant="h6" sx={{ padding: "20px 0" }}>
                Пусто
              </Title>
            )}
          </div>
        )}
      </>
    </Paper>
  )
}

export default PlanCategoryItem
