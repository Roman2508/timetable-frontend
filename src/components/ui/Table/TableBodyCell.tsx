import React from 'react'
import cn from 'classnames'

import styles from './Table.module.scss'
import { ThemeContext } from '../../../App'

interface IProps {
  children: JSX.Element | JSX.Element[] | string | string[]
  align?: 'left' | 'center' | 'right'
  isHover?: boolean
  sx?: React.CSSProperties
}

const TableBodyCell: React.FC<IProps> = ({ children, align = 'center', isHover = false, sx = {} }) => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <td
      className={cn(styles.tableCell, styles.cell, {
        [styles.hover]: isHover,
        [styles.dark]: colorMode === 'dark',
      })}
      style={{ textAlign: align, ...sx }}
    >
      {children}
    </td>
  )
}

export default TableBodyCell
