import React, { Dispatch, SetStateAction } from 'react'

type TypeOutside = {
  ref: any
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (initialIsVisible: boolean): TypeOutside => {
  const [isShow, setIsShow] = React.useState(initialIsVisible)
  const ref = React.useRef<HTMLElement>(null)

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsShow(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return { ref, isShow, setIsShow }
}
