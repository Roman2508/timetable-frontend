import React from "react"
import { useSelector } from "react-redux"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import styles from "./TeachersPage.module.scss"
import { useAppDispatch } from "../../redux/store"
import { useOutside } from "../../hooks/useOutside"
import Paper from "../../components/ui/Paper/Paper"
import Title from "../../components/ui/Title/Title"
import ListItem from "../../components/ui/List/ListItem"
import { LoadingStatusTypes } from "../../redux/appTypes"
import Skeleton from "../../components/ui/Skeleton/Skeleton"
import ListWrapper from "../../components/ui/List/ListWrapper"
import { Accordion } from "../../components/ui/Accordion/Accordion"
import { teachersSelector } from "../../redux/teachers/teachersSlice"
import CreateTeacherForm from "../../components/TeachersPage/CreateTeacherForm"
import UpdateTeacherModal from "../../components/TeachersPage/UpdateTeacherModal"
import { getTeachersCategories } from "../../redux/teachers/teachersAsyncActions"
import { TeachersType } from "../../redux/teachers/teachersTypes"
import CreateTeachersCategoryForm from "../../components/TeachersPage/CreateTeachersCategoryForm"
import UpdateTeachersCategoriesModal from "../../components/TeachersPage/UpdateTeachersCategoryModal"

export const TeachersPage = () => {
  const dispatch = useAppDispatch()

  const [selectedTeacher, setSelectedTeacher] = React.useState<TeachersType | null>(null)

  const { loadingStatus, teachersCategories } = useSelector(teachersSelector)

  const {
    ref: categoryRef,
    isShow: isCategoryModalShow,
    setIsShow: setIsCategoryModalShow,
  } = useOutside(false)

  const {
    ref: teacherRef,
    isShow: isTeacherModalShow,
    setIsShow: setIsTeacherModalShow,
  } = useOutside(false)

  React.useEffect(() => {
    if (!teachersCategories) {
      dispatch(getTeachersCategories())
    }
  }, [])

  return (
    <>
      <UpdateTeachersCategoriesModal
        ref={categoryRef}
        isShow={isCategoryModalShow}
        setIsShow={setIsCategoryModalShow}
        teachersCategories={teachersCategories}
      />

      <UpdateTeacherModal
        ref={teacherRef}
        isShow={isTeacherModalShow}
        selectedTeacher={selectedTeacher}
        setIsShow={setIsTeacherModalShow}
        setSelectedTeacher={setSelectedTeacher}
        teachersCategories={teachersCategories}
      />

      <div className={styles.contaner}>
        <div className={styles["left-col"]}>
          <Paper sx={{ marginBottom: "15px" }}>
            <Title align="center" Variant="h6" sx={{ marginBottom: "40px" }}>
              ДОДАТИ НОВОГО ВИКЛАДАЧА
            </Title>

            <CreateTeacherForm teachersCategories={teachersCategories} />
          </Paper>

          <Paper sx={{ marginBottom: "15px" }}>
            <Title align="center" Variant="h6" sx={{ marginBottom: "40px" }}>
              ДОДАТИ КАТЕГОРІЮ
            </Title>

            <CreateTeachersCategoryForm setUpdateCategoryModalVisible={setIsCategoryModalShow} />
          </Paper>
        </div>
        <div className={styles["right-col"]}>
          <Paper sx={{ textAlign: "center", marginBottom: "20px" }}>
            <Title align="center" Variant="h6">
              ВИКЛАДАЧІ
            </Title>
          </Paper>

          {!teachersCategories ? (
            <div>
              {loadingStatus === LoadingStatusTypes.ERROR ? (
                <Title Variant="h5">Помилка при завантаженні</Title>
              ) : (
                <>
                  <Skeleton width="100%" height="62px" styles={{ marginBottom: "12px" }} />
                  <Skeleton width="100%" height="62px" styles={{ marginBottom: "12px" }} />
                  <Skeleton width="100%" height="62px" styles={{ marginBottom: "12px" }} />
                </>
              )}
            </div>
          ) : (
            teachersCategories.map((category) => (
              <Accordion key={category.id} sx={{ marginBottom: "15px" }} title={category.name}>
                <ListWrapper sx={{ maxWidth: "100%" }}>
                  <TransitionGroup>
                    {category.teachers.map((teacher) => (
                      <CSSTransition key={teacher.id} timeout={0}>
                        <ListItem
                          onClick={() => {
                            setSelectedTeacher(teacher)
                            setIsTeacherModalShow(true)
                          }}
                        >
                          {`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}
                        </ListItem>
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                </ListWrapper>
              </Accordion>
            ))
          )}
        </div>
      </div>
    </>
  )
}
