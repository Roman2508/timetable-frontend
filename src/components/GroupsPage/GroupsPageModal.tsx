import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import Modal from "../ui/Modal/Modal"
import Input from "../ui/Input/Input"
import styles from "./GroupsPage.module.scss"
import { GroupModalTypes } from "../../pages/AllGroupsPage/AllGroupsPage"
import Button from "../ui/Button/Button"
import { useAppDispatch } from "../../redux/store"
import { createGroupCategory, updateGroupCategory } from "../../redux/groups/groupsAsyncActions"
import { GroupCategoriesType } from "../../redux/groups/groupsTypes"

interface IGroupsPageModalProps {
  isShow: boolean
  modalType: GroupModalTypes
  activeGroupCategory: null | GroupCategoriesType
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  setActiveGroupCategory: React.Dispatch<React.SetStateAction<null | GroupCategoriesType>>
}

const GroupsPageModal = React.forwardRef<HTMLDivElement, IGroupsPageModalProps>(
  ({ modalType, isShow, setIsShow, activeGroupCategory, setActiveGroupCategory }, ref) => {
    const dispatch = useAppDispatch()

    const modalTitle =
      modalType === "create-category" ? "Створити категорію" : "Редагувати категорію"

    const {
      watch,
      register,
      setValue,
      formState: { errors },
      handleSubmit,
    } = useForm<{ name: string }>({
      mode: "onChange",
    })

    const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
      if (modalType === "create-category") {
        setIsShow(false)
        await dispatch(createGroupCategory(data.name))
        setValue("name", "")
      }

      if (modalType === "update-category" && activeGroupCategory) {
        setIsShow(false)
        await dispatch(updateGroupCategory({ id: activeGroupCategory.id, name: data.name }))
        setActiveGroupCategory((prev) => {
          if (prev) {
            return { ...prev, name: data.name }
          } else {
            return prev
          }
        })
      }
    }

    React.useEffect(() => {
      if (modalType === "update-category") {
        activeGroupCategory && setValue("name", activeGroupCategory.name)
      } else {
        setValue("name", "")
      }
    }, [modalType, activeGroupCategory])

    return (
      <Modal
        isShow={isShow}
        setIsShow={setIsShow}
        modalTitle={modalTitle}
        ref={ref}
        sx={{ minWidth: "440px" }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles["modal-wrapper"]}>
          <Input
            width="100%"
            label="Назва"
            value={watch("name")}
            labelBackColor="dark"
            isError={!!errors.name}
            wrapperSx={{ marginTop: "10px" }}
            errorMessage={errors.name?.message}
            {...register("name", { required: true })}
          />

          <div className={styles["modal-actions"]}>
            <Button
              variant="outlined"
              color="gray"
              type="button"
              sx={{ marginRight: "10px" }}
              onClick={() => setIsShow(false)}
            >
              Закрити
            </Button>

            <Button variant="outlined" disabled={!!errors.name || !watch("name")}>
              Зберегти
            </Button>
          </div>
        </form>
      </Modal>
    )
  }
)

export default GroupsPageModal
