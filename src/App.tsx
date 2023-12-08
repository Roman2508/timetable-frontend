import React from "react"
import { Routes, Route } from "react-router-dom"

import Layout from "./components/Layout/Layout"
import GroupPage from "./pages/GroupPage/GroupPage"
import AllGroupsPage from "./pages/AllGroupsPage/AllGroupsPage"
import PlansPage from "./pages/PlansPage/PlansPage"

export const ThemeContext = React.createContext({
  colorMode: "light",
  changeColorMode: () => {},
})

const App = () => {
  const [colorMode, setColorMode] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const currentColorMode = window.localStorage.getItem("colorMode") as "light" | "dark" | null
    if (currentColorMode) {
      setColorMode(currentColorMode)
    }
  }, [])

  const changeColorMode = () => {
    setColorMode((prev) => {
      const currentMode = prev === "light" ? "dark" : "light"
      window.localStorage.setItem("colorMode", currentMode)
      return currentMode
    })
  }

  return (
    <ThemeContext.Provider value={{ colorMode, changeColorMode }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AllGroupsPage />} />
          <Route path="/group/:id" element={<GroupPage />} />
          <Route path="/2" element={<div>asdadssd11111</div>} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/3" element={<div>asdadssd11111</div>} />
          <Route path="/4" element={<div>asdadssd11111</div>} />
          <Route path="/5" element={<div>asdadssd11111</div>} />
          <Route path="/6" element={<div>asdadssd11111</div>} />
          <Route path="/7" element={<div>asdadssd11111</div>} />
        </Route>

        <Route element={<div>login</div>} path="/auth" />
      </Routes>
    </ThemeContext.Provider>
  )
}

export default App
