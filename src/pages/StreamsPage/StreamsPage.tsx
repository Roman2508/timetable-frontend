import React from "react"

import styles from "./StreamsPage.module.scss"
import Paper from "../../components/ui/Paper/Paper"
import Title from "../../components/ui/Title/Title"
import Table from "../../components/ui/Table/Table"
import ListItem from "../../components/ui/List/ListItem"
import TableRow from "../../components/ui/Table/TableRow"
import TableHead from "../../components/ui/Table/TableHead"
import TableBody from "../../components/ui/Table/TableBody"
import ListWrapper from "../../components/ui/List/ListWrapper"
import TableBodyCell from "../../components/ui/Table/TableBodyCell"
import { Accordion } from "../../components/ui/Accordion/Accordion"
import TableHeadCell from "../../components/ui/Table/TableHeadCell"
import Text from "../../components/ui/Text/Text"

const StreamsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles["left-col"]}>
        <Paper sx={{ textAlign: "center", marginBottom: "10px" }}>
          <Title align="center" Variant="h6">
            СТРУКТУРНІ ПІДРОЗДІЛИ
          </Title>
        </Paper>

        {Array(5)
          .fill(null)
          .map((_, index) => (
            <Accordion key={index} sx={{ marginBottom: "10px" }} title="ЦК Гуманітарних дисциплін">
              <ListWrapper sx={{ maxWidth: "100%" }}>
                <ListItem>Стельмах Ірина Миколаївна</ListItem>
                <ListItem>Луцак Ірина Василівна</ListItem>
              </ListWrapper>
            </Accordion>
          ))}
      </div>

      <div className={styles["right-col"]}>
        <div className={styles["top-row"]}>
          <Paper classNames={styles["streams-list-wrapper"]}>
            <Text sx={{ fontWeight: "700" }} align="center">
              ПОТОКИ
            </Text>

            <ListWrapper sx={{ minWidth: "100%" }} classNames={styles["streams-list"]}>
              <ListItem>1</ListItem>
              <ListItem>1</ListItem>
              <ListItem>1</ListItem>
              <ListItem>1</ListItem>
            </ListWrapper>
          </Paper>
          <Paper classNames={styles["stream-groups-wrapper"]}>
            <Text sx={{ fontWeight: "700" }} align="center">
              ГРУПИ ПОТОКУ PH-23
            </Text>

            <ListWrapper sx={{ minWidth: "100%" }} classNames={styles["streams-list"]}>
              <ListItem>1</ListItem>
              <ListItem>1</ListItem>
              <ListItem>1</ListItem>
              <ListItem>1</ListItem>
            </ListWrapper>
          </Paper>
        </div>
        <div className={styles["bottom-row"]}>
          <Table>
            <TableHead>
              <TableRow variant="head">
                <TableHeadCell>1</TableHeadCell>
                <TableHeadCell>1</TableHeadCell>
                <TableHeadCell>1</TableHeadCell>
                <TableHeadCell>1</TableHeadCell>
                <TableHeadCell>1</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array(10)
                .fill(null)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableBodyCell>1</TableBodyCell>
                    <TableBodyCell>1</TableBodyCell>
                    <TableBodyCell>1</TableBodyCell>
                    <TableBodyCell>1</TableBodyCell>
                    <TableBodyCell>1</TableBodyCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default StreamsPage
