import React from "react"
import { useSelector } from "react-redux"
import { Theme, ToastContainer, toast } from "react-toastify"

import { ThemeContext } from "../../App"
import { useAppDispatch } from "../../redux/store"
import { clearAppAlert, selectAppStatus } from "../../redux/appStatus/appStatusSlice"

const AppAlert: React.FC = () => {
  const dispatch = useAppDispatch()

  const { message, status } = useSelector(selectAppStatus)

  const { colorMode } = React.useContext(ThemeContext)

  React.useEffect(() => {
    if (!message || !status) return

    toast[status](message, { autoClose: 1500 })
    clearAppAlert()
  }, [message, status, dispatch])

  return (
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
  )
}

export default AppAlert
