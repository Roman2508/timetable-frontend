import React from "react"
import cn from "classnames"
import { ThemeContext } from "../../../App"
import styles from "./IconButton.module.scss"

interface IIconButtonProps {
  children: JSX.Element | JSX.Element[] | string | string[]
  sx?: React.CSSProperties
  bg?: "dark" | "light"
  [propName: string]: any
}

const IconButton: React.FC<React.PropsWithChildren<IIconButtonProps>> = ({
  children,
  sx = {},
  bg = "light",
  ...props
}) => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <div
      style={{ ...sx }}
      className={cn(styles.iconButton, {
        [styles["light"]]: colorMode === "light",
        [styles["dark"]]: colorMode === "dark",
        [styles["dark-bg"]]: bg === "dark",
      })}
      {...props}
    >
      {children}
    </div>
  )
}

export default IconButton
