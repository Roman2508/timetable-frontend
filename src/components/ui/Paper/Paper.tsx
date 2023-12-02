import React from "react"
import styles from "./Paper.module.scss"
import { ThemeContext } from "../../../App"
import cn from "classnames"

interface IPaperProps {
  children: JSX.Element | JSX.Element[]
  width?: string
  sx?: React.CSSProperties
  classNames?: string
}

const Paper: React.FC<React.PropsWithChildren<IPaperProps>> = ({
  children,
  width,
  sx = {},
  classNames = "",
}) => {
  const { colorMode } = React.useContext(ThemeContext)

  const paperStyles = {
    width: width ? width : "auto",
    ...sx,
  }

  return (
    <div className={cn(styles.paper, styles[colorMode], classNames)} style={paperStyles}>
      {children}
    </div>
  )
}

export default Paper
