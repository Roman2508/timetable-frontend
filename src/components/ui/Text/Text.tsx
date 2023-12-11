import React from 'react'
import styles from './Text.module.scss'
import { ThemeContext } from '../../../App'

interface ITitleProps {
  size?: string
  Variant?: 'p' | 'span'
  color?: 'black' | 'white' | 'gray' | 'green'
  align?: 'left' | 'right' | 'center' | 'justify'
  sx?: React.CSSProperties
  classNames?: string
  children: string
}

const textColors = {
  black: '#00272f',
  white: '#ffffff',
  gray: '#a7a7a7',
  green: '#20bd5f',
}

const Text: React.FC<React.PropsWithChildren<ITitleProps>> = ({
  children,
  Variant = 'p',
  color = 'black',
  align = 'left',
  size = '20px',
  classNames = '',
  sx = {},
}) => {
  const { colorMode } = React.useContext(ThemeContext)

  const [titleColor, setTitleColor] = React.useState<keyof typeof textColors>('black')

  React.useEffect(() => {
    if (colorMode === 'dark') {
      if (color === 'black') {
        setTitleColor('white')
      } else {
        setTitleColor(color)
      }
    }

    if (colorMode === 'light') {
      if (color === 'white') {
        setTitleColor('black')
      } else {
        setTitleColor(color)
      }
    }
  }, [colorMode])

  return (
    <div className={styles.textWrapper}>
      <Variant
        style={{ color: textColors[titleColor], fontSize: size, textAlign: align, ...sx }}
        className={classNames}
      >
        {children}
      </Variant>
    </div>
  )
}

export default Text
