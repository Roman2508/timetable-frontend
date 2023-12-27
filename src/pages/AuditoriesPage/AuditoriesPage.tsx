import React from 'react'
import styles from './AuditoriesPage.module.scss'
import Paper from '../../components/ui/Paper/Paper'
import Title from '../../components/ui/Title/Title'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button/Button'
import ListItem from '../../components/ui/List/ListItem'
import ListWrapper from '../../components/ui/List/ListWrapper'
import { Accordion } from '../../components/ui/Accordion/Accordion'
import { useAppDispatch } from '../../redux/store'
import { getAuditoryCategories } from '../../redux/auditories/auditoriesAsyncActions'
import { useSelector } from 'react-redux'
import { auditoriesSelector } from '../../redux/auditories/auditoriesSlise'
import SelectComponent from '../../components/ui/Select/Select'
import CreateAuditoryCategoryForm from '../../components/AuditoriesPage/CreateAuditoryCategoryForm'
import UpdateAuditoryCategoryModal from '../../components/AuditoriesPage/UpdateAuditoryCategoryModal'
import CreateAuditoryForm from '../../components/AuditoriesPage/CreateAuditoryForm'

export const AuditoriesPage = () => {
  const dispatch = useAppDispatch()

  const [updateCategoryModalVisible, setUpdateCategoryModalVisible] = React.useState(false)

  const { auditoriCategories, loadingStatus } = useSelector(auditoriesSelector)
  // const [auditoryCategories, setAuditoryCategories] = React.useState(null)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAuditoryCategories())
      } catch (err) {
        alert(err)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <UpdateAuditoryCategoryModal
        isShow={updateCategoryModalVisible}
        auditoriCategories={auditoriCategories}
        setIsShow={setUpdateCategoryModalVisible}
      />

      <div className={styles.contaner}>
        <div className={styles['left-col']}>
          <Paper sx={{ marginBottom: '15px' }}>
            <Title align="center" Variant="h6" sx={{ marginBottom: '40px' }}>
              ДОДАТИ НОВУ АУДИТОРІЮ
            </Title>

            <CreateAuditoryForm auditoriCategories={auditoriCategories} />
          </Paper>
          <Paper sx={{ marginBottom: '20px' }}>
            <Title align="center" Variant="h6" sx={{ marginBottom: '40px' }}>
              ДОДАТИ КАТЕГОРІЮ
            </Title>

            <CreateAuditoryCategoryForm
              loadingStatus={loadingStatus}
              setUpdateCategoryModalVisible={setUpdateCategoryModalVisible}
            />
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
