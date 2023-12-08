import React from "react"
import styles from "./PlansPage.module.scss"
import Title from "../../components/ui/Title/Title"
import Paper from "../../components/ui/Paper/Paper"
import { IoIosArrowDown as ArrowDown } from "react-icons/io"
import { MdDeleteOutline as DeleteIcon } from "react-icons/md"
import IconButton from "../../components/ui/IconButton/IconButton"
import { MdDriveFileRenameOutline as RenameIcon } from "react-icons/md"

const plans = [
  {
    id: 1,
    name: "Менеджмент",
    createdAt: "08.12.23",
    plans: [
      { id: 1, name: "Фармація, промислова фармація, Фаховий молодший бакалавр" },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
    ],
  },
  {
    id: 2,
    name: "Фармація, промислова фармація",
    createdAt: "08.12.23",
    plans: [
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
    ],
  },
  {
    id: 3,
    name: "Технології медичної діагностики та лікування",
    createdAt: "08.12.23",
    plans: [
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
    ],
  },
  {
    id: 4,
    name: "Фармація, промислова фармація (заочна форма)",
    createdAt: "08.12.23",
    plans: [
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
    ],
  },
  {
    id: 5,
    name: "Технології медичної діагностики та лікування",
    createdAt: "08.12.23",
    plans: [
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
    ],
  },
  {
    id: 6,
    name: "Фармація, промислова фармація",
    createdAt: "08.12.23",
    plans: [
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
    ],
  },
  {
    id: 7,
    name: "Менеджмент",
    createdAt: "08.12.23",
    plans: [
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
      { id: 1, name: "Фармація, промислова фармація" },
    ],
  },
]

const PlansPage = () => {
  const [openCategory, setOpenCategory] = React.useState<(typeof plans)[0] | null>(null)

  const handleChangeOpenCategory = (id: number) => {
    if (!openCategory) {
      setOpenCategory(plans[id - 1])
    } else {
      if (id === openCategory.id) {
        setOpenCategory(null)
      } else {
        setOpenCategory(plans[id - 1])
      }
    }
  }

  console.log(openCategory)

  return (
    <div className={styles.container}>
      <Title sx={{ marginBottom: "20px" }}>Навчальні плани</Title>

      <div className={styles["plans-wrapper"]}>
        {plans.map((el) => (
          <Paper classNames={styles["plan-category"]} key={el.id} sx={{ padding: "16px 0 0 0" }}>
            <div className={styles["plan-category-controls"]}>
              <div className={styles["plan-top"]}>
                <Title Variant="h6" align="left" sx={{ lineHeight: "1.25" }}>
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
                <div className={styles["plan-category-actions-item"]}>Оновити</div>
                <div className={styles["plan-category-actions-item"]}>Видалити</div>
                <div className={styles["plan-category-actions-item"]}>Додати</div>
              </div>
            </div>

            {openCategory?.id === el.id && (
              <div className={styles["plans"]}>
                {el.plans.map((plan) => (
                  <div className={styles["plan"]} key={plan.id}>
                    <span>{plan.name}</span>

                    <div className={styles["plan-controls"]}>
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
                ))}
              </div>
            )}
          </Paper>
        ))}
      </div>
    </div>
  )
}

export default PlansPage
