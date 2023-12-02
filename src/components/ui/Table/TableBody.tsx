import React from 'react'
import styles from './Table.module.scss'

interface IProps {
  children: JSX.Element | JSX.Element[] | string | string[]
}

const TableBody: React.FC<IProps> = ({ children }) => {
  return <tbody className={styles.tableBody}>{children}</tbody>
}

export default TableBody
