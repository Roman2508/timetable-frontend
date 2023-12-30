import React from "react";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

import { store } from "./redux/store";
import Layout from "./components/Layout/Layout";
import PlanPage from "./pages/PlanPage/PlanPage";
import GroupPage from "./pages/GroupPage/GroupPage";
import PlansPage from "./pages/PlansPage/PlansPage";
import StreamsPage from "./pages/StreamsPage/StreamsPage";
import AllGroupsPage from "./pages/AllGroupsPage/AllGroupsPage";
import TimetablePage from "./pages/TimetablePage/TimetablePage";
import { TeachersPage } from "./pages/TeachersPage/TeachersPage";
import { AuditoriesPage } from "./pages/AuditoriesPage/AuditoriesPage";
import DistributionPage from "./pages/DistributionPage/DistributionPage";

export const ThemeContext = React.createContext({
  colorMode: "light",
  changeColorMode: () => {},
});

const App = () => {
  const [colorMode, setColorMode] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const currentColorMode = window.localStorage.getItem("colorMode") as
      | "light"
      | "dark"
      | null;
    if (currentColorMode) {
      setColorMode(currentColorMode);
      document.body.setAttribute("color", currentColorMode);
    }
  }, []);

  const changeColorMode = () => {
    setColorMode((prev) => {
      const currentMode = prev === "light" ? "dark" : "light";
      window.localStorage.setItem("colorMode", currentMode);
      document.body.setAttribute("color", currentMode);
      return currentMode;
    });
  };

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ colorMode, changeColorMode }}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<AllGroupsPage />} />
            <Route path="/group/:id" element={<GroupPage />} />

            <Route path="/distribution" element={<DistributionPage />} />

            <Route path="/plans" element={<PlansPage />} />
            <Route path="/plan/:id" element={<PlanPage />} />

            <Route path="/streams" element={<StreamsPage />} />

            <Route path="/teachers" element={<TeachersPage />} />

            <Route path="/auditories" element={<AuditoriesPage />} />

            <Route path="/5" element={<div>asdadssd11111</div>} />
            <Route path="/6" element={<div>asdadssd11111</div>} />

            <Route path="/timetable" element={<TimetablePage />} />
          </Route>

          <Route element={<div>login</div>} path="/auth" />
        </Routes>
      </ThemeContext.Provider>
    </Provider>
  );
};

// remote

export default App;
