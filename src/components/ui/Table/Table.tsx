import React from 'react'
import cn from 'classnames'

import styles from './Table.module.scss'
import { ThemeContext } from '../../../App'

interface ITableProps {
  children?: JSX.Element | JSX.Element[]
}

const Table: React.FC<React.PropsWithChildren<ITableProps>> = ({ children }) => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <div
      className={cn(styles.tableWrapper, {
        [styles.light]: colorMode === 'light',
        [styles.dark]: colorMode === 'dark',
      })}
    >
      <table className={styles.table}>{children}</table>
    </div>
  )
}

export default Table
