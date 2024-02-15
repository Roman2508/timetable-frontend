import React from "react"
import cn from "classnames"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { ThemeContext } from "../../App"
import styles from "./GroupPage.module.scss"
import { useAppDispatch } from "../../redux/store"
import { useOutside } from "../../hooks/useOutside"
import Title from "../../components/ui/Title/Title"
import Paper from "../../components/ui/Paper/Paper"
import Input from "../../components/ui/Input/Input"
import Button from "../../components/ui/Button/Button"
import Select from "../../components/ui/Select/Select"
import { GroupFormType } from "../../redux/groups/groupsTypes"
import { groupsSelector } from "../../redux/groups/groupsSlice"
import { getFormOfEducation } from "../../helpers/getFormOfEducation"
import { SelectPlanModal } from "../../components/GroupPage/SelectPlanModal"
import { getGroup, getGroupCategories, updateGroup } from "../../redux/groups/groupsAsyncActions"
import { LoadingStatusTypes } from "../../redux/appTypes"
import { toast } from "react-toastify"

const GroupPage = () => {
  const dispatch = useAppDispatch()

  const params = useParams()

  const { colorMode } = React.useContext(ThemeContext)

  const { group, groupCategories, loadingStatus } = useSelector(groupsSelector)

  const [selectedPlanId, setSelectedPlanId] = React.useState<number | null>(null)

  // Додав selectedPlanId щоб перевірити чи ререндерить react-hook-form getValues компонент при зміні значення

  const {
    control,
    register,
    setValue,
    getValues,
    getFieldState,
    formState: { errors },
    handleSubmit,
  } = useForm<GroupFormType>({
    mode: "onChange",
  })

  const {
    ref: planModalRef,
    isShow: isPlanModalShow,
    setIsShow: setIsPlanModalShow,
  } = useOutside(false)

  React.useEffect(() => {
    if (params.id) {
      dispatch(getGroup(params.id))
    }

    if (!groupCategories) {
      dispatch(getGroupCategories())
    }
  }, [])

  React.useEffect(() => {
    if (params.id) {
      setValue("name", group.name)
      setValue("yearOfAdmission", group.yearOfAdmission)
      setValue("courseNumber", group.courseNumber)
      setValue("students", group.students)
      setValue("formOfEducation", getFormOfEducation(group.formOfEducation))

      if (group.educationPlan) {
        setValue("educationPlan", group.educationPlan.id)
        setSelectedPlanId(group.educationPlan.id)
      }

      if (group.category) {
        setValue("category", {
          value: String(group.category.id),
          label: group.category.name,
        })
      }
    }
  }, [group])

  const onSubmit: SubmitHandler<GroupFormType> = async (data) => {
    if (!data.educationPlan) {
      toast.error("Навчальний план не вибраний")
      return
    }

    const groupData = {
      ...data,
      id: group.id,
      educationPlan: data.educationPlan,
      category: Number(data.category.value),
      formOfEducation: data.formOfEducation.label as "Денна" | "Заочна",
    }

    // dispatch(updateGroup(groupData))
    console.log(groupData)
  }

  return (
    <>
      <SelectPlanModal
        ref={planModalRef}
        // setValue={setValue}
        setValue={setSelectedPlanId}
        isShow={isPlanModalShow}
        setIsShow={setIsPlanModalShow}
        // selectedPlanId={
        //   getValues("educationPlan") || (group.educationPlan && group.educationPlan.id)
        // }
        selectedPlanId={selectedPlanId}
      />

      <div className={styles.container}>
        <Paper classNames={styles.wrapper}>
          <div
            className={cn(styles.top, {
              [styles.light]: colorMode === "light",
              [styles.dark]: colorMode === "dark",
            })}
          >
            <Title Variant="h6" align="left">
              {group.name ? group.name : "Нова група"}
            </Title>
          </div>

          <form className={styles.controls}>
            <div className={styles["left-col"]}>
              <Input
                width="100%"
                label="Шифр групи"
                value={group.name}
                labelBackColor="dark"
                isError={!!errors.name}
                wrapperSx={{ marginBottom: "20px" }}
                {...register("name", { required: "Шифр групи обов'язковий" })}
              />

              <Input
                width="100%"
                label="Рік вступу"
                htmlType="number"
                labelBackColor="dark"
                value={group.yearOfAdmission}
                isError={!!errors.yearOfAdmission}
                wrapperSx={{ marginBottom: "20px" }}
                {...register("yearOfAdmission", { required: "Рік вступу обов'язковий" })}
              />

              <Input
                width="100%"
                label="Курс"
                htmlType="number"
                labelBackColor="dark"
                value={group.courseNumber}
                isError={!!errors.courseNumber}
                wrapperSx={{ marginBottom: "20px" }}
                {...register("courseNumber", { required: "Вкажіть курс групи" })}
              />

              <Input
                width="100%"
                htmlType="number"
                labelBackColor="dark"
                label="Кількість студентів"
                value={group.students}
                isError={!!errors.students}
                wrapperSx={{ marginBottom: "20px" }}
                {...register("students", { required: "Вкажіть к-ть студентів" })}
              />

              <Controller
                name="formOfEducation"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => {
                  const options = [
                    { value: "full-time", label: "Денна" },
                    { value: "part-time", label: "Заочна" },
                  ]

                  return (
                    <Select
                      label="Форма навчання"
                      options={options}
                      labelBgColor="dark"
                      wrapperWidth="100%"
                      selectValue={value}
                      isError={!!errors.formOfEducation}
                      errorMessage={errors.formOfEducation?.message}
                      onChange={(val: { value: string; label: string }) => onChange(val)}
                    />
                  )
                }}
              />
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

              <Link
                to="/streams"
                className={cn(styles["info-button"], {
                  [styles.light]: colorMode === "light",
                  [styles.dark]: colorMode === "dark",
                })}
              >
                ПОТОКИ
              </Link>

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

              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => {
                  const options = groupCategories
                    ? groupCategories.map((el) => ({ value: el.id, label: el.name }))
                    : []

                  return (
                    <Select
                      label="Категорія"
                      options={options}
                      labelBgColor="dark"
                      wrapperWidth="100%"
                      selectValue={value}
                      isError={!!errors.formOfEducation}
                      errorMessage={errors.formOfEducation?.message}
                      onChange={(val: { value: string; label: string }) => onChange(val)}
                    />
                  )
                }}
              />
            </div>
          </form>
        </Paper>

        <div className={styles.actions}>
          <Link to="/">
            <Button
              variant="text"
              color="black"
              type="button"
              sx={{ marginRight: "24px" }}
              disabled={loadingStatus === LoadingStatusTypes.LOADING}
            >
              Відмінити
            </Button>
          </Link>

          <Button
            variant="outlined"
            sx={{ marginRight: "2px" }}
            onClick={handleSubmit(onSubmit)}
            disabled={loadingStatus === LoadingStatusTypes.LOADING}
          >
            Зберегти
          </Button>
        </div>
      </div>
    </>
  )
}

export default GroupPage
