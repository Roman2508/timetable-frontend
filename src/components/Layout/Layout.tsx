import React from "react";
import cn from "classnames";
import { Outlet } from "react-router-dom";
import { Theme, ToastContainer } from "react-toastify";

import Header from "../Header/Header";
import { ThemeContext } from "../../App";

const Layout: React.FC = () => {
  const { colorMode } = React.useContext(ThemeContext);

  return (
    <div
      className={cn("app-wrapper", {
        ["light-theme"]: colorMode === "light",
        ["dark-theme"]: colorMode === "dark",
      })}
    >
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={colorMode as Theme}
      />

      <Header />

      <div className="app-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
