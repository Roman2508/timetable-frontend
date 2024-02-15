import React from "react"
import cn from "classnames"

import styles from "./Checkbox.module.scss"
import { ThemeContext } from "../../../App"

interface ICheckboxProps {
  isChecked?: boolean
  sx?: React.CSSProperties
  color?: "black" | "primary"
  onClick?: (...args: any[]) => void
  children?: JSX.Element | JSX.Element[] | string
}

const Checkbox: React.FC<ICheckboxProps> = ({
  color = "primary",
  isChecked = false,
  onClick = () => {},
  children = "",
  sx = {},
}) => {
  const { colorMode } = React.useContext(ThemeContext)

  const [checked, setChecked] = React.useState(isChecked)

  const handleChange = (_: any) => {
    // if (checked) {
    //   setChecked(false)
    // } else {
    //   setChecked(true)
    // }
    setChecked(isChecked)
    // if (event.target.checked) {
    //   setChecked(true)
    // } else {
    //   setChecked(false)
    // }
  }

  return (
    <label className={styles.wrapper} onClick={onClick} style={sx}>
      <input type="checkbox" onChange={handleChange} />

      {checked ? (
        <svg
          className={cn(styles.icon, {
            [styles.black]: color === "black" && colorMode === "light",
            [styles.white]: color === "black" && colorMode === "dark",
            [styles.primary]: color === "primary",
          })}
          focusable="false"
          viewBox="0 0 24 24"
          data-testid="CheckBoxIcon"
        >
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
        </svg>
      ) : (
        <svg
          className={cn(styles.icon, {
            [styles.black]: color === "black" && colorMode === "light",
            [styles.white]: color === "black" && colorMode === "dark",
            [styles.primary]: color === "primary",
          })}
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="CheckBoxOutlineBlankIcon"
        >
          <path
            fill="#000"
            d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
          ></path>
        </svg>
      )}

      <span className={styles.text}>{children}</span>
      {/* <span className={styles.touchRipple}></span> */}
    </label>
  )
}

export default Checkbox
