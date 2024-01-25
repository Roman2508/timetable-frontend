import React from "react"
import cn from "classnames"
import { Outlet } from "react-router-dom"
import { Theme, ToastContainer } from "react-toastify"

import Header from "../Header/Header"
import { ThemeContext } from "../../App"
import AppAlert from "../AppAlert/AppAlert"

const Layout: React.FC = () => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <div
      className={cn("app-wrapper", {
        ["light-theme"]: colorMode === "light",
        ["dark-theme"]: colorMode === "dark",
      })}
    >
      <AppAlert />

      <Header />

      <div className="app-container">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
