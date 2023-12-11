// import React from 'react'
import styles from "./AuditoriesPage.module.scss"
import Paper from "../../components/ui/Paper/Paper"
import Title from "../../components/ui/Title/Title"
import Input from "../../components/ui/Input/Input"
import Button from "../../components/ui/Button/Button"
import ListItem from "../../components/ui/List/ListItem"
import ListWrapper from "../../components/ui/List/ListWrapper"
import { Accordion } from "../../components/ui/Accordion/Accordion"

export const AuditoriesPage = () => {
  return (
    <div className={styles.contaner}>
      <div className={styles["left-col"]}>
        <Paper sx={{ marginBottom: "20px" }}>
          <Title align="center" Variant="h6" sx={{ marginBottom: "40px" }}>
            ДОДАТИ НОВУ АУДИТОРІЮ
          </Title>

          <div className={styles["auditories-form"]}>
            <Input setValue={() => {}} label="Назва" labelBackColor="dark" width="245px" />
            <Input
              setValue={() => {}}
              label="Кількість місць"
              labelBackColor="dark"
              htmlType="number"
              width="245px"
            />
            <Input setValue={() => {}} label="Категорія" labelBackColor="dark" width="245px" />
            {/* <Input setValue={() => {}} label="label" labelBackColor="dark" width="245px" /> */}
          </div>

          <div className={styles["auditories-controls"]}>
            <Button sx={{ marginRight: "20px" }} variant="outlined">
              Зберегти
            </Button>

            <Button variant="outlined" color="gray">
              Очистити
            </Button>
          </div>
        </Paper>

        <Paper sx={{ marginBottom: "20px" }}>
          <Title align="center" Variant="h6" sx={{ marginBottom: "40px" }}>
            ДОДАТИ КАТЕГОРІЮ
          </Title>

          <div className={styles["auditories-form"]}>
            <Input setValue={() => {}} label="Назва" labelBackColor="dark" width="245px" />
            <Input
              setValue={() => {}}
              label="Номер"
              labelBackColor="dark"
              width="245px"
              htmlType="number"
            />
          </div>

          <div className={styles["categories-controls"]}>
            <Button variant="outlined">Редагувати</Button>

            <div>
              <Button sx={{ marginRight: "20px" }} variant="outlined">
                Зберегти
              </Button>

              <Button variant="outlined" color="gray">
                Очистити
              </Button>
            </div>
          </div>
        </Paper>
      </div>
      <div className={styles["right-col"]}>
        <Paper sx={{ textAlign: "center", marginBottom: "20px" }}>
          <Title align="center" Variant="h6">
            АУДИТОРІЇ
          </Title>
        </Paper>

        <Accordion sx={{ marginBottom: "20px" }} title="1 поверх">
          <ListWrapper sx={{ maxWidth: "100%" }}>
            <ListItem>99</ListItem>
            <ListItem>108</ListItem>
            <ListItem>Спорт. зала</ListItem>
          </ListWrapper>
        </Accordion>

        <Accordion sx={{ marginBottom: "20px" }} title="2 поверх">
          <ListWrapper sx={{ maxWidth: "100%" }}>
            <ListItem>217</ListItem>
            <ListItem>220</ListItem>
          </ListWrapper>
        </Accordion>

        <Accordion sx={{ marginBottom: "20px" }} title="3 поверх">
          <ListWrapper sx={{ maxWidth: "100%" }}>
            <ListItem>301</ListItem>
            <ListItem>304</ListItem>
          </ListWrapper>
        </Accordion>

        <Accordion sx={{ marginBottom: "20px" }} title="4 поверх">
          <ListWrapper sx={{ maxWidth: "100%" }}>
            <ListItem>416</ListItem>
            <ListItem>501</ListItem>
          </ListWrapper>
        </Accordion>
      </div>
    </div>
  )
}
