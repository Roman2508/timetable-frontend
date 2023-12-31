import React from "react";
import cn from "classnames";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";
import { MdDriveFileRenameOutline as RenameIcon } from "react-icons/md";

import { ThemeContext } from "../../App";
import styles from "./PlansPage.module.scss";
import Title from "../../components/ui/Title/Title";
import Paper from "../../components/ui/Paper/Paper";
import IconButton from "../../components/ui/IconButton/IconButton";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import {
  deletePlanCategory,
  getPlansCategories,
} from "../../redux/plans/plansAsyncActions";
import { useSelector } from "react-redux";
import { plansSelector } from "../../redux/plans/plansSlice";
import Button from "../../components/ui/Button/Button";
import Skeleton from "../../components/ui/Skeleton/Skeleton";
import AddPlanModal from "../../components/PlansPage/AddPlanModal";
import { useOutside } from "../../hooks/useOutside";
import PlanModals, {
  PlanModalsType,
} from "../../components/PlansPage/PlanModals";
import { PlansType } from "../../redux/plans/plansTypes";
import { LoadingStatusTypes } from "../../redux/appTypes";

const plans = [
  {
    id: 1,
    name: "Менеджмент 1",
    createdAt: "08.12.23",
    plans: [
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
    ],
  },
  {
    id: 2,
    name: "Фармація, промислова фармація 2",
    createdAt: "08.12.23",
    plans: [
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
    ],
  },
  {
    id: 3,
    name: "Технології медичної діагностики та лікування 3",
    createdAt: "08.12.23",
    plans: [
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
    ],
  },
  {
    id: 4,
    name: "Фармація, промислова фармація (заочна форма) 4",
    createdAt: "08.12.23",
    plans: [
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
    ],
  },
  {
    id: 5,
    name: "Технології медичної діагностики та лікування 5",
    createdAt: "08.12.23",
    plans: [
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
    ],
  },
  {
    id: 6,
    name: "Фармація, промислова фармація 6",
    createdAt: "08.12.23",
    plans: [
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
    ],
  },
  {
    id: 7,
    name: "Менеджмент 7",
    createdAt: "08.12.23",
    plans: [
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      {
        id: 1,
        name: "Фармація, промислова фармація, Фаховий молодший бакалавр",
      },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
    ],
  },
];

const PlansPage = () => {
  const { colorMode } = React.useContext(ThemeContext);

  const dispatch = useAppDispatch();

  const { loadingStatus, plansCategories } = useSelector(plansSelector);

  const [openCategory, setOpenCategory] = React.useState<
    (typeof plans)[0] | null
  >(null);

  const [modalType, setModalType] = React.useState<PlanModalsType>("add-plan");

  const [selectedPlanCategory, setSelectedPlanCategory] = React.useState<{
    id: number;
    name: string;
  } | null>(null);

  const [selectedPlanId, setSelectedPlanId] = React.useState<number | null>(
    null
  );

  const {
    ref: ref,
    isShow: isModalShow,
    setIsShow: setIsModalShow,
  } = useOutside(false);

  React.useEffect(() => {
    if (!plansCategories) {
      dispatch(getPlansCategories());
    }
  }, []);

  const handleChangeOpenCategory = (id: number) => {
    if (!openCategory) {
      setOpenCategory(plans[id - 1]);
    } else {
      if (id === openCategory.id) {
        setOpenCategory(null);
      } else {
        setOpenCategory(plans[id - 1]);
      }
    }
  };

  const onOpenModal = (
    modalType: PlanModalsType,
    planCategory: { id: number; name: string } | null
  ) => {
    setModalType(modalType);
    setIsModalShow(true);
    setSelectedPlanCategory(planCategory);
  };

  const onDeleteCategory = (id: number) => {
    if (window.confirm("Ви дійсно хочете видалити категорію?")) {
      dispatch(deletePlanCategory(id));
    }
  };

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
              <Skeleton width="100%" height="115px" />
              <Skeleton width="100%" height="115px" />
              <Skeleton width="100%" height="115px" />
              <Skeleton width="100%" height="115px" />
              <Skeleton width="100%" height="115px" />
              <Skeleton width="100%" height="115px" />
            </>
          ) : (
            plansCategories.map((el) => (
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
                      >
                        {el.name}
                      </Title>

                      <IconButton
                        sx={{ marginLeft: "10px" }}
                        onClick={() => handleChangeOpenCategory(el.id)}
                      >
                        <ArrowDown
                          style={
                            openCategory?.id === el.id
                              ? { transform: "rotate(180deg)" }
                              : {}
                          }
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
                        onClick={() =>
                          onOpenModal("add-plan", { id: el.id, name: el.name })
                        }
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
                      {el.plans.map((plan) => (
                        <div className={styles["plan"]} key={plan.id}>
                          <NavLink
                            className={styles["plan-name"]}
                            to={`/plan/${plan.id}`}
                          >
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
                                setSelectedPlanId(plan.id);
                                onOpenModal("update-plan", {
                                  id: el.id,
                                  name: el.name,
                                });
                              }}
                            >
                              <DeleteIcon size={20} />
                            </IconButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              </Paper>
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
  );
};

export default PlansPage;
