import React from "react"
import styles from "./List.module.scss"
import cn from "classnames"
import { ThemeContext } from "../../../App"

interface IListItemProps {
  children: JSX.Element | JSX.Element[] | string | string[]
}

const ListItem: React.FC<React.PropsWithChildren<IListItemProps>> = ({ children }) => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <div
      className={cn(styles.item, {
        [styles.itemDark]: colorMode === "dark",
        [styles.itemLight]: colorMode === "light",
      })}
    >
      {children}
    </div>
  )
}

export default ListItem
