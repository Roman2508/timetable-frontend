import React from 'react'
import cn from 'classnames'
import { ThemeContext } from '@/app/layout'

import styles from './ToggleButton.module.scss'

interface IToggleButtonItemProps {
  children: JSX.Element | JSX.Element[] | string
  buttonIndex: number
  classNames?: [string]
  activeButton?: number
  setActiveButton: (index: number) => void
}

const ToggleButtonItem: React.FC<React.PropsWithChildren<IToggleButtonItemProps>> = ({
  children,
  buttonIndex,
  activeButton = 0,
  setActiveButton,
  classNames = [],
}) => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <div
      className={cn(styles.item, ...classNames, {
        [styles['active-dark']]: activeButton === buttonIndex && colorMode === 'dark',
        [styles['active-light']]: activeButton === buttonIndex && colorMode === 'light',
      })}
      onClick={() => setActiveButton(buttonIndex)}>
      {children}
    </div>
  )
}

export default ToggleButtonItem
