import React from "react"
import styles from "./List.module.scss"
import { ThemeContext } from "../../../App"
import cn from "classnames"

interface IListWrapperProps {
  children: JSX.Element | JSX.Element[] | string | string[]
  sx?: React.CSSProperties
}

const ListWrapper: React.FC<React.PropsWithChildren<IListWrapperProps>> = ({
  children,
  sx = {},
}) => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.wrapperDark]: colorMode === "dark",
        [styles.wrapperLight]: colorMode === "light",
      })}
      style={sx}
    >
      {children}
    </div>
  )
}

export default ListWrapper
