import React from 'react'
import styles from './Table.module.scss'

interface IProps {
  children: JSX.Element | JSX.Element[] | string | string[]
}

const TableHead: React.FC<IProps> = ({ children }) => {
  return <thead className={styles.tableHead}>{children}</thead>
}

export default TableHead
