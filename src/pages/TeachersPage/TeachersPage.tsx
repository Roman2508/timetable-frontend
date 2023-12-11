// import React from 'react'
import styles from './TeachersPage.module.scss'
import Paper from '../../components/ui/Paper/Paper'
import Title from '../../components/ui/Title/Title'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button/Button'
import { Accordion } from '../../components/ui/Accordion/Accordion'
import ListWrapper from '../../components/ui/List/ListWrapper'
import ListItem from '../../components/ui/List/ListItem'

export const TeachersPage = () => {
  return (
    <div className={styles.contaner}>
      <div className={styles['left-col']}>
        <Paper sx={{ marginBottom: '20px' }}>
          <Title align="center" Variant="h6" sx={{ marginBottom: '40px' }}>
            ДОДАТИ НОВОГО ВИКЛАДАЧА
          </Title>

          <div className={styles['teachers-form']}>
            <Input setValue={() => {}} label="Прізвище" labelBackColor="dark" width="245px" />
            <Input setValue={() => {}} label="Ім'я" labelBackColor="dark" width="245px" />
            <Input setValue={() => {}} label="По батькові" labelBackColor="dark" width="245px" />
            <Input setValue={() => {}} label="Категорія" labelBackColor="dark" width="245px" />
          </div>

          <div className={styles['teachers-controls']}>
            <Button sx={{ marginRight: '20px' }} variant="outlined">
              Зберегти
            </Button>

            <Button variant="outlined" color="gray">
              Очистити
            </Button>
          </div>
        </Paper>

        <Paper sx={{ marginBottom: '20px' }}>
          <Title align="center" Variant="h6" sx={{ marginBottom: '40px' }}>
            ДОДАТИ КАТЕГОРІЮ
          </Title>

          <div className={styles['teachers-form']}>
            <Input setValue={() => {}} label="Назва" labelBackColor="dark" width="245px" />
            <Input setValue={() => {}} label="Номер" labelBackColor="dark" width="245px" htmlType="number" />
          </div>

          <div className={styles['categories-controls']}>
            <Button variant="outlined">Редагувати</Button>

            <div>
              <Button sx={{ marginRight: '20px' }} variant="outlined">
                Зберегти
              </Button>

              <Button variant="outlined" color="gray">
                Очистити
              </Button>
            </div>
          </div>
        </Paper>
      </div>
      <div className={styles['right-col']}>
        <Paper sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <Title align="center" Variant="h6">
            ВИКЛАДАЧІ
          </Title>
        </Paper>

        <Accordion sx={{ marginBottom: '20px' }} title="ЦК Гуманітарних дисциплін">
          <ListWrapper sx={{ maxWidth: '100%' }}>
            <ListItem>Стельмах Ірина Миколаївна</ListItem>
            <ListItem>Луцак Ірина Василівна</ListItem>
          </ListWrapper>
        </Accordion>

        <Accordion sx={{ marginBottom: '20px' }} title="ЦК Загальноосвітніх дисциплін">
          <ListWrapper sx={{ maxWidth: '100%' }}>
            <ListItem>Стельмах Ірина Миколаївна</ListItem>
            <ListItem>Луцак Ірина Василівна</ListItem>
          </ListWrapper>
        </Accordion>

        <Accordion sx={{ marginBottom: '20px' }} title="ЦК Фрамацевтичних дисциплін дисциплін">
          <ListWrapper sx={{ maxWidth: '100%' }}>
            <ListItem>Стельмах Ірина Миколаївна</ListItem>
            <ListItem>Луцак Ірина Василівна</ListItem>
          </ListWrapper>
        </Accordion>

        <Accordion sx={{ marginBottom: '20px' }} title="ЦК Медико-біологічних дисциплін">
          <ListWrapper sx={{ maxWidth: '100%' }}>
            <ListItem>Стельмах Ірина Миколаївна</ListItem>
            <ListItem>Луцак Ірина Василівна</ListItem>
          </ListWrapper>
        </Accordion>

        <Accordion sx={{ marginBottom: '20px' }} title="ЦК Хімічних дисциплін">
          <ListWrapper sx={{ maxWidth: '100%' }}>
            <ListItem>Стельмах Ірина Миколаївна</ListItem>
            <ListItem>Луцак Ірина Василівна</ListItem>
          </ListWrapper>
        </Accordion>
      </div>
    </div>
  )
}
