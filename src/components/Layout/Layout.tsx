import React from "react"
import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import { ThemeContext } from "../../App"
import cn from "classnames"

const Layout: React.FC = () => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <div
      className={cn("app-wrapper", {
        ["light-theme"]: colorMode === "light",
        ["dark-theme"]: colorMode === "dark",
      })}
    >
      <Header />

      <div className="app-container">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
