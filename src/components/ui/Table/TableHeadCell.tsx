import React from 'react'
import cn from 'classnames'

import styles from './Table.module.scss'
import { SlOptionsVertical } from 'react-icons/sl'

interface IProps {
  children: JSX.Element | JSX.Element[] | string | string[]
  onClick?: () => void
  showControls?: boolean
  align?: 'left' | 'center' | 'right'
}

const TableHeadCell: React.FC<IProps> = ({ children, onClick = () => {}, align = 'center', showControls = false }) => {
  return (
    <th
      className={cn(styles.tableHeadCell, styles.cell, {
        [styles.controls]: showControls,
      })}
      style={{ textAlign: align }}
    >
      <span>{children}</span>
      {showControls && (
        <div className={styles.optionIconWrapper} onClick={onClick}>
          <SlOptionsVertical size={16} />
        </div>
      )}
    </th>
  )
}

export default TableHeadCell
