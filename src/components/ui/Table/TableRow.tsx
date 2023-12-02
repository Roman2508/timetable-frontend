import React from "react"
import cn from "classnames"

import styles from "./Table.module.scss"
import { ThemeContext } from "../../../App"

interface IProps {
  children: JSX.Element | JSX.Element[] | string | string[]
  variant?: "head" | "body"
}

const TableRow: React.FC<IProps> = ({ children, variant = "body" }) => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <tr
      className={cn(styles.tableRow, {
        [styles.tableBodyRow]: variant === "body",
        [styles.light]: colorMode === "light",
        [styles.dark]: colorMode === "dark",
      })}
    >
      {children}
    </tr>
  )
}

export default TableRow
