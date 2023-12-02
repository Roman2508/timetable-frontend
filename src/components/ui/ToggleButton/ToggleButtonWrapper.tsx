import React from 'react'
import styles from './ToggleButton.module.scss'
import cn from 'classnames'
import { ThemeContext } from '@/app/layout'

interface IToggleButtonWrapperProps {
  children: JSX.Element | JSX.Element[] | string
  classNames?: [string]
}

const ToggleButtonWrapper: React.FC<React.PropsWithChildren<IToggleButtonWrapperProps>> = ({
  children,
  classNames = [],
}) => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <div
      className={cn(styles.wrapper, ...classNames, {
        [styles['wrapper-dark']]: colorMode === 'dark',
        [styles['wrapper-light']]: colorMode === 'light',
      })}>
      {children}
    </div>
  )
}

export default ToggleButtonWrapper
