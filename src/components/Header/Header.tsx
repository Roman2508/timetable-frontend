import React from "react"
import styles from "./Header.module.scss"
import { ThemeContext } from "../../App"
import { VscAccount as AccountIcon } from "react-icons/vsc"
import SwitchColorMode from "../ui/SwitchColorMode/SwitchColorMode"

import { NavLink } from "react-router-dom"

import cn from "classnames"
import IconButton from "../ui/IconButton/IconButton"

const pages = [
  { path: "/", name: "Групи" },
  { path: "/1", name: "Розподіл" },
  { path: "/plans", name: "Плани" },
  { path: "/3", name: "Викладачі" },
  { path: "/4", name: "Аудиторії" },
  { path: "/5", name: "Навантаження" },
  { path: "/6", name: "Контроль вичитки" },
  { path: "/7", name: "Розклад" },
]

const Header: React.FC = () => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <header
      className={cn(styles.header, {
        [styles.light]: colorMode === "light",
        [styles.dark]: colorMode === "dark",
      })}
    >
      <div className={styles["header-left"]}>logo</div>
      <ul className={styles["header-menu"]}>
        {pages.map((el) => (
          <li key={el.name}>
            <NavLink
              to={el.path}
              className={({ isActive }) => (isActive ? styles["active-page"] : "")}
            >
              {el.name}
            </NavLink>
          </li>
        ))}

        {/* <li>Звіти</li> */}
        {/* <li>Налаштування</li> */}
      </ul>
      <div className={styles["header-right"]}>
        <SwitchColorMode />
        <IconButton sx={{ marginLeft: "20px" }} bg="dark">
          <AccountIcon size={24} />
        </IconButton>
      </div>
    </header>
  )
}

export default Header
