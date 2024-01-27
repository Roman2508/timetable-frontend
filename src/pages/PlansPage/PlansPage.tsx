import React from "react"
import { useSelector } from "react-redux"

import styles from "./PlansPage.module.scss"
import { useAppDispatch } from "../../redux/store"
import Title from "../../components/ui/Title/Title"
import { useOutside } from "../../hooks/useOutside"
import Button from "../../components/ui/Button/Button"
import { LoadingStatusTypes } from "../../redux/appTypes"
import { plansSelector } from "../../redux/plans/plansSlice"
import Skeleton from "../../components/ui/Skeleton/Skeleton"
import { getPlansCategories } from "../../redux/plans/plansAsyncActions"
import PlanCategoryItem from "../../components/PlansPage/PlanCategoryItem"
import PlanModals, { PlanModalsType } from "../../components/PlansPage/PlanModals"

const PlansPage = () => {
  const dispatch = useAppDispatch()

  const { loadingStatus, plansCategories } = useSelector(plansSelector)

  const [modalType, setModalType] = React.useState<PlanModalsType>("add-plan")

  const [openCategory, setOpenCategory] = React.useState<number | null>(null)

  const [selectedPlanCategory, setSelectedPlanCategory] = React.useState<{
    id: number
    name: string
  } | null>(null)

  const [selectedPlanId, setSelectedPlanId] = React.useState<number | null>(null)

  const { ref: ref, isShow: isModalShow, setIsShow: setIsModalShow } = useOutside(false)

  React.useEffect(() => {
    if (!plansCategories) {
      dispatch(getPlansCategories())
    }
  }, [])

  const onOpenModal = (
    modalType: PlanModalsType,
    planCategory: { id: number; name: string } | null
  ) => {
    setModalType(modalType)
    setIsModalShow(true)
    setSelectedPlanCategory(planCategory)
  }

  const handleChangeOpenCategory = (id: number) => {
    if (id === openCategory) {
      // 2 однакових функції:
      setOpenCategory(null)
      setSelectedPlanId(null)
    } else {
      setOpenCategory(id)
      setSelectedPlanId(id)
    }
  }

  // const onDeleteCategory = (id: number) => {
  //   if (window.confirm("Ви дійсно хочете видалити категорію?")) {
  //     dispatch(deletePlanCategory(id))
  //   }
  // }

  return (
    <>
      <PlanModals
        ref={ref}
        modalType={modalType}
        isShow={isModalShow}
        setIsShow={setIsModalShow}
        selectedPlanId={selectedPlanId}
        plansCategories={plansCategories}
        selectedPlanCategory={selectedPlanCategory}
      />

      {/* <AddPlanModal
        ref={ref}
        isShow={isModalShow}
        setIsShow={setIsModalShow}
      /> */}

      <div className={styles.container}>
        <Title sx={{ marginBottom: "20px" }}>Навчальні плани</Title>

        <div className={styles["plans-wrapper"]}>
          {!plansCategories ? (
            <>
              {loadingStatus === LoadingStatusTypes.ERROR ? (
                <Title Variant="h4">Помилка при завантаженні даних</Title>
              ) : (
                Array(6)
                  .fill(null)
                  .map((_, index) => <Skeleton key={index} width="100%" height="115px" />)
              )}
            </>
          ) : (
            plansCategories.map((el) => (
              <PlanCategoryItem
                key={el.id}
                category={el}
                onOpenModal={onOpenModal}
                openCategory={openCategory}
                handleChangeOpenCategory={handleChangeOpenCategory}
              />
            ))
          )}
        </div>

        <div className={styles["add-plan-wrapper"]}>
          <Button
            variant="outlined"
            onClick={() => onOpenModal("add-category", null)}
            disabled={loadingStatus === LoadingStatusTypes.LOADING}
          >
            Додати нову категорiю
          </Button>
        </div>
      </div>
    </>
  )
}

export default PlansPage

/* 
<Paper
                classNames={cn(styles["plan-category"], {
                  [styles["open"]]: el.id === openCategory?.id,
                  [styles["light"]]: colorMode === "light",
                })}
                key={el.id}
              >
                <>
                  <div className={styles["plan-category-controls"]}>
                    <div className={styles["plan-top"]}>
                      <Title
                        Variant="h6"
                        align="left"
                        classNames={styles["plan-category-name"]}
                        title={el.name}
                      >
                        {el.name}
                      </Title>

                      <IconButton
                        sx={{ marginLeft: "10px" }}
                        onClick={() => handleChangeOpenCategory(el.id)}
                      >
                        <ArrowDown
                          style={openCategory?.id === el.id ? { transform: "rotate(180deg)" } : {}}
                        />
                      </IconButton>
                    </div>
                    <div className={styles["plan-category-actions"]}>
                      <div
                        className={styles["plan-category-actions-item"]}
                        onClick={() =>
                          onOpenModal("update-category", {
                            id: el.id,
                            name: el.name,
                          })
                        }
                      >
                        Оновити
                      </div>
                      <div
                        className={styles["plan-category-actions-item"]}
                        onClick={() => onDeleteCategory(el.id)}
                      >
                        Видалити
                      </div>
                      <div
                        className={styles["plan-category-actions-item"]}
                        onClick={() => onOpenModal("add-plan", { id: el.id, name: el.name })}
                      >
                        Додати
                      </div>
                    </div>
                  </div>

                  {openCategory?.id === el.id && (
                    <div
                      className={cn(styles["plans"], {
                        [styles["light"]]: colorMode === "light",
                      })}
                    >
                      {el.plans && el.plans.length ? (
                        el.plans.map((plan) => (
                          <div className={styles["plan"]} key={plan.id}>
                            <NavLink className={styles["plan-name"]} to={`/plan/${plan.id}`}>
                              {plan.name}
                            </NavLink>

                            <div className={styles["plan-controls"]}>
                              <IconButton
                                onClick={() =>
                                  onOpenModal("update-plan", {
                                    id: el.id,
                                    name: el.name,
                                  })
                                }
                                sx={{
                                  marginRight: "10px",
                                }}
                              >
                                <RenameIcon size={20} />
                              </IconButton>

                              <IconButton
                                onClick={() => {
                                  setSelectedPlanId(plan.id)
                                  onOpenModal("update-plan", {
                                    id: el.id,
                                    name: el.name,
                                  })
                                }}
                              >
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
*/
