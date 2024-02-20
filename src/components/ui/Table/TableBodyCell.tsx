import React from 'react'
import cn from 'classnames'

import styles from './Table.module.scss'
import { ThemeContext } from '../../../App'

interface IProps {
  children: JSX.Element | JSX.Element[] | string | string[] | number | number[]
  align?: 'left' | 'center' | 'right'
  isHover?: boolean
  sx?: React.CSSProperties
  classNames?: string
  [propName: string]: any
}

const TableBodyCell: React.FC<IProps> = ({
  children,
  classNames = '',
  align = 'center',
  isHover = false,
  sx = {},
  ...props
}) => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <td
      className={cn(styles.tableCell, styles.cell, classNames, {
        [styles.hover]: isHover,
        [styles.dark]: colorMode === 'dark',
      })}
      style={{ textAlign: align, ...sx }}
      {...props}
    >
      {children}
    </td>
  )
}

export default TableBodyCell
