import React from "react"
import cn from "classnames"

import styles from "./Button.module.scss"
import { ThemeContext } from "../../../App"

const colors = {
  blue: {
    bg: "#087EA4",
    text: "#ffffff",
  },
  green: {
    bg: "#20bd5f",
    text: "#ffffff",
  },
  // green: {
  //   bg: '#4FC488',
  //   text: '#ffffff',
  // },
  pink: {
    bg: "#DB7BA9",
    text: "#ffffff",
  },
  red: {
    bg: "#CA4240",
    text: "#ffffff",
  },
  violet: {
    bg: "#B269F6",
    text: "#ffffff",
  },
  gray: {
    bg: "#acaec9",
    text: "#000000",
  },
  white: {
    bg: "#fafafa",
    text: "#000000",
  },
  black: {
    bg: "#161B24",
    text: "#ffffff",
  },
}

// bg
// background-color: #5a5b7d;
// background-color: #3E4361;
// background-color: #2d334d;

//  background-color: #688bef;
// background-color: #ACAEC9;
// background-color: #fafafa;

interface IButtonProps {
  children: string
  color?: keyof typeof colors
  variant?: "filled" | "outlined" | "text"
  classNames?: [string]
  sx?: React.CSSProperties
  disabled?: boolean
}

const Button: React.FC<React.PropsWithChildren<IButtonProps>> = ({
  children = "",
  color = "green",
  variant = "filled",
  disabled = false,
  classNames = [],
  sx = {},
}) => {
  const { colorMode } = React.useContext(ThemeContext)

  const [isHover, setIsHover] = React.useState(false)

  if (color === "black" && colorMode === "dark") {
    color = "white"
  } else if (color === "white" && colorMode === "light") {
    color = "black"
  }

  const buttonStyles =
    variant === "filled"
      ? {
          color: colors[color].text,
          backgroundColor: colors[color].bg,
        }
      : variant === "outlined"
      ? {
          color: colors[color].bg,
          border: `1px solid ${colors[color].bg}`,
          backgroundColor: isHover ? `${colors[color].bg}31` : "transparent",
        }
      : {
          color: colors[color].bg,
          border: 0,
          backgroundColor: isHover ? `${colors[color].bg}31` : "transparent",
        }

  return (
    <button
      className={cn(styles.button, ...classNames)}
      style={{ ...buttonStyles, ...sx }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
