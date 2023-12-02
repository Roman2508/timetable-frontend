import React from "react"
import cn from "classnames"
import { CiLight, CiDark } from "react-icons/ci"

import { ThemeContext } from "../../../App"
import styles from "./SwitchColorMode.module.scss"

const SwitchColorMode = () => {
  const { colorMode, changeColorMode } = React.useContext(ThemeContext)

  return (
    <div
      onClick={changeColorMode}
      className={cn(styles.toggleMode, {
        [styles.toggleModeDark]: colorMode === "dark",
        [styles.toggleModeLight]: colorMode === "light",
      })}
    >
      {colorMode === "light" ? <CiDark size={30} /> : <CiLight size={30} />}
    </div>
  )
}

export default SwitchColorMode
