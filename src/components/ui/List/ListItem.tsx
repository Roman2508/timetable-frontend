import React from 'react'
import styles from './List.module.scss'
import cn from 'classnames'
import { ThemeContext } from '../../../App'

interface IListItemProps {
  children: JSX.Element | JSX.Element[] | string | string[]
  sx?: React.CSSProperties
  [propName: string]: any
}

const ListItem: React.FC<React.PropsWithChildren<IListItemProps>> = ({ children, sx = {}, ...props }) => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <div
      className={cn(styles.item, {
        [styles.itemDark]: colorMode === 'dark',
        [styles.itemLight]: colorMode === 'light',
      })}
      style={sx}
      {...props}
    >
      {children}
    </div>
  )
}

export default ListItem
