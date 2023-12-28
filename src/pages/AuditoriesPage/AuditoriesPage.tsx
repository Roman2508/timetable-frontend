import React from 'react'
import { useSelector } from 'react-redux'

import styles from './AuditoriesPage.module.scss'
import { useAppDispatch } from '../../redux/store'
import { useOutside } from '../../hooks/useOutside'
import Paper from '../../components/ui/Paper/Paper'
import Title from '../../components/ui/Title/Title'
import ListItem from '../../components/ui/List/ListItem'
import ListWrapper from '../../components/ui/List/ListWrapper'
import { Accordion } from '../../components/ui/Accordion/Accordion'
import { auditoriesSelector } from '../../redux/auditories/auditoriesSlise'
import CreateAuditoryForm from '../../components/AuditoriesPage/CreateAuditoryForm'
import { getAuditoryCategories } from '../../redux/auditories/auditoriesAsyncActions'
import CreateAuditoryCategoryForm from '../../components/AuditoriesPage/CreateAuditoryCategoryForm'
import UpdateAuditoryCategoryModal from '../../components/AuditoriesPage/UpdateAuditoryCategoryModal'

export const AuditoriesPage = () => {
  const dispatch = useAppDispatch()

  const { ref, isShow, setIsShow } = useOutside(false)

  const { auditoriCategories, loadingStatus } = useSelector(auditoriesSelector)

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAuditoryCategories())
    }

    fetchData()
  }, [])

  return (
    <>
      <UpdateAuditoryCategoryModal
        ref={ref}
        isShow={isShow}
        auditoriCategories={auditoriCategories}
        setIsShow={setIsShow}
      />

      <div className={styles.contaner}>
        <div className={styles['left-col']}>
          <Paper sx={{ marginBottom: '15px' }}>
            <Title align="center" Variant="h6" sx={{ marginBottom: '40px' }}>
              ДОДАТИ НОВУ АУДИТОРІЮ
            </Title>

            <CreateAuditoryForm loadingStatus={loadingStatus} auditoriCategories={auditoriCategories} />
          </Paper>
          <Paper sx={{ marginBottom: '20px' }}>
            <Title align="center" Variant="h6" sx={{ marginBottom: '40px' }}>
              ДОДАТИ КАТЕГОРІЮ
            </Title>

            <CreateAuditoryCategoryForm loadingStatus={loadingStatus} setUpdateCategoryModalVisible={setIsShow} />
          </Paper>
          {/*  */}
        </div>
        <div className={styles['right-col']}>
          <Paper sx={{ textAlign: 'center', marginBottom: '15px' }}>
            <Title align="center" Variant="h6">
              АУДИТОРІЇ
            </Title>
          </Paper>

          {!auditoriCategories ? (
            <h1>loading...</h1>
          ) : (
            auditoriCategories.map((category) => (
              <Accordion key={category.id} sx={{ marginBottom: '15px' }} title={category.name}>
                <ListWrapper sx={{ maxWidth: '100%' }}>
                  {category.auditories.map((auditory) => (
                    <ListItem key={auditory.id}>{`${auditory.name} (${auditory.seatsNumber})`}</ListItem>
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
