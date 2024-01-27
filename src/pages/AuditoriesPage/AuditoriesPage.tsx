import React from "react"
import { useSelector } from "react-redux"

import styles from "./AuditoriesPage.module.scss"
import { useAppDispatch } from "../../redux/store"
import { useOutside } from "../../hooks/useOutside"
import Paper from "../../components/ui/Paper/Paper"
import Title from "../../components/ui/Title/Title"
import ListItem from "../../components/ui/List/ListItem"
import ListWrapper from "../../components/ui/List/ListWrapper"
import { Accordion } from "../../components/ui/Accordion/Accordion"
import { auditoriesSelector } from "../../redux/auditories/auditoriesSlise"
import CreateAuditoryForm from "../../components/AuditoriesPage/CreateAuditoryForm"
import { getAuditoryCategories } from "../../redux/auditories/auditoriesAsyncActions"
import CreateAuditoryCategoryForm from "../../components/AuditoriesPage/CreateAuditoryCategoryForm"
import UpdateAuditoryCategoryModal from "../../components/AuditoriesPage/UpdateAuditoryCategoryModal"
import UpdateAuditoryModal from "../../components/AuditoriesPage/UpdateAuditoryModal"
import { AuditoriesTypes } from "../../redux/auditories/auditoriesTypes"
import Skeleton from "../../components/ui/Skeleton/Skeleton"
import { LoadingStatusTypes } from "../../redux/appTypes"

export const AuditoriesPage = () => {
  const dispatch = useAppDispatch()

  const [selectedAuditory, setSelectedAuditory] = React.useState<AuditoriesTypes | null>(null)

  const {
    ref: categoryRef,
    isShow: isCategoryModalShow,
    setIsShow: setIsCategoryModalShow,
  } = useOutside(false)
  const {
    ref: auditoryRef,
    isShow: isAuditoryModalShow,
    setIsShow: setIsAuditoryModalShow,
  } = useOutside(false)

  const { auditoriCategories, loadingStatus } = useSelector(auditoriesSelector)

  React.useEffect(() => {
    if (!auditoriCategories) {
      dispatch(getAuditoryCategories())
    }
  }, [])

  // React.useEffect(() => {

  // }, [selectedAuditory])

  return (
    <>
      <UpdateAuditoryCategoryModal
        ref={categoryRef}
        isShow={isCategoryModalShow}
        setIsShow={setIsCategoryModalShow}
        auditoriCategories={auditoriCategories}
      />

      <UpdateAuditoryModal
        ref={auditoryRef}
        isShow={isAuditoryModalShow}
        setIsShow={setIsAuditoryModalShow}
        selectedAuditory={selectedAuditory}
        auditoriCategories={auditoriCategories}
        setSelectedAuditory={setSelectedAuditory}
      />

      <div className={styles.contaner}>
        <div className={styles["left-col"]}>
          <Paper sx={{ marginBottom: "15px" }}>
            <Title align="center" Variant="h6" sx={{ marginBottom: "40px" }}>
              ДОДАТИ НОВУ АУДИТОРІЮ
            </Title>

            <CreateAuditoryForm
              loadingStatus={loadingStatus}
              auditoriCategories={auditoriCategories}
            />
          </Paper>
          <Paper sx={{ marginBottom: "20px" }}>
            <Title align="center" Variant="h6" sx={{ marginBottom: "40px" }}>
              ДОДАТИ КАТЕГОРІЮ
            </Title>

            <CreateAuditoryCategoryForm
              loadingStatus={loadingStatus}
              setUpdateCategoryModalVisible={setIsCategoryModalShow}
            />
          </Paper>
          {/*  */}
        </div>
        <div className={styles["right-col"]}>
          <Paper sx={{ textAlign: "center", marginBottom: "15px" }}>
            <Title align="center" Variant="h6">
              АУДИТОРІЇ
            </Title>
          </Paper>

          {!auditoriCategories ? (
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
            auditoriCategories.map((category) => (
              <Accordion key={category.id} sx={{ marginBottom: "15px" }} title={category.name}>
                <ListWrapper sx={{ maxWidth: "100%" }}>
                  {category.auditories.map((auditory) => (
                    <ListItem
                      key={auditory.id}
                      onClick={() => {
                        setSelectedAuditory(auditory)
                        setIsAuditoryModalShow(true)
                      }}
                    >{`${auditory.name} (${auditory.seatsNumber})`}</ListItem>
                  ))}
                </ListWrapper>
              </Accordion>
            ))
          )}
        </div>
      </div>
    </>
  )
}
