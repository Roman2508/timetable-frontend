import React from 'react'
import cn from 'classnames'

import styles from './Input.module.scss'
import { ThemeContext } from '../../../App'

interface IInputProps {
  labelBackColor?: 'light' | 'dark'
  variant?: 'outlined' | 'standart'
  isError?: boolean
  errorMessage?: string
  label?: string
  value?: string
  width?: string
  htmlType?: 'text' | 'number' | 'search'
  setValue: React.Dispatch<React.SetStateAction<string>>
  sx?: React.CSSProperties
  wrapperSx?: React.CSSProperties
  [propName: string]: any
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      setValue,
      label = '',
      value = '',
      isError = false,
      width = '220px',
      htmlType = 'text',
      errorMessage = '',
      variant = 'outlined',
      labelBackColor = 'light',
      wrapperSx = {},
      sx = {},
      ...props
    },
    ref
  ) => {
    const { colorMode } = React.useContext(ThemeContext)

    const [isFocus, setIsFocus] = React.useState(false)
    const [isFocusLabel, setIsFocusLabel] = React.useState(false)

    const onFocusHandler = () => {
      setIsFocus(true)
      setIsFocusLabel(true)
    }

    const onBlurHandler = () => {
      if (!value) {
        setIsFocus(false)
      }
      setIsFocusLabel(false)
    }

    return (
      <div className={styles.wrapper} style={{ width, ...wrapperSx }}>
        {label && (
          <label
            className={cn(styles.label, {
              [styles.errorLabel]: isError,
              [styles.focusLabel]: isFocusLabel,
              [styles.dark]: colorMode === 'dark',
              [styles.light]: colorMode === 'light',
              [styles.notEmpty]: value || props.value,
              [styles.standartLabel]: variant === 'standart',
              [styles.outlinedLabel]: variant === 'outlined',
              [styles.focusLabelDark]: isFocus && colorMode === 'dark',
              [styles.focusLabelLight]: isFocus && colorMode === 'light',
              [styles.focusStandartLabel]: isFocus && variant === 'standart',
              [styles.focusOutlinedLabel]: isFocus && variant === 'outlined',
              [styles.lightLabelBack]: labelBackColor === 'light',
              [styles.darkLabelBack]: labelBackColor === 'dark',
            })}
          >
            {label}
          </label>
        )}

        <div
          className={cn(styles.inputWrapper, {
            [styles.bottomLine]: isFocus && variant === 'standart',
            [styles.focusInput]: isFocusLabel,
            [styles.errorBottomLine]: isError,
          })}
          style={{ width }}
        >
          {/* input */}
          <input
            ref={ref}
            {...props}
            type={htmlType}
            onBlur={onBlurHandler}
            style={{ width, ...sx }}
            onFocus={onFocusHandler}
            className={cn(styles.input, {
              [styles.outlinedInput]: variant === 'outlined',
              [styles.standartInput]: variant === 'standart',
              [styles.darkModeInput]: colorMode === 'dark',
              [styles.lightModeInput]: colorMode === 'light',
              [styles.errorInput]: isError,
            })}
            // value={value}
            // onChange={(e) => setValue(e.target.value)}
          />

          {errorMessage && (
            <p className={cn(styles.errorMessage)} style={{ width }}>
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    )
  }
)

// const Input: React.FC<IInputProps> = ({
//   setValue,
//   label = '',
//   value = '',
//   isError = false,
//   width = '220px',
//   htmlType = 'text',
//   errorMessage = '',
//   variant = 'outlined',
//   labelBackColor = 'light',
//   wrapperSx = {},
//   sx = {},
//   ...props
// }) => {
//   const { colorMode } = React.useContext(ThemeContext)

//   const [isFocus, setIsFocus] = React.useState(false)
//   const [isFocusLabel, setIsFocusLabel] = React.useState(false)

//   const onFocusHandler = () => {
//     setIsFocus(true)
//     setIsFocusLabel(true)
//   }

//   const onBlurHandler = () => {
//     if (!value) {
//       setIsFocus(false)
//     }
//     setIsFocusLabel(false)
//   }

//   return (
//     <div className={styles.wrapper} style={{ width, ...wrapperSx }}>
//       {label && (
//         <label
//           className={cn(styles.label, {
//             [styles.errorLabel]: isError,
//             [styles.focusLabel]: isFocusLabel,
//             [styles.standartLabel]: variant === 'standart',
//             [styles.outlinedLabel]: variant === 'outlined',
//             [styles.focusLabelDark]: isFocus && colorMode === 'dark',
//             [styles.focusLabelLight]: isFocus && colorMode === 'light',
//             [styles.focusStandartLabel]: isFocus && variant === 'standart',
//             [styles.focusOutlinedLabel]: isFocus && variant === 'outlined',
//             [styles.lightLabelBack]: labelBackColor === 'light',
//             [styles.darkLabelBack]: labelBackColor === 'dark',
//           })}
//         >
//           {label}
//         </label>
//       )}

//       <div
//         className={cn(styles.inputWrapper, {
//           [styles.bottomLine]: isFocus && variant === 'standart',
//           [styles.focusInput]: isFocusLabel,
//           [styles.errorBottomLine]: isError,
//         })}
//         style={{ width }}
//       >
//         {/*  */}
//         <input
//           // value={value}
//           type={htmlType}
//           onBlur={onBlurHandler}
//           style={{ width, ...sx }}
//           onFocus={onFocusHandler}
//           className={cn(styles.input, {
//             [styles.outlinedInput]: variant === 'outlined',
//             [styles.standartInput]: variant === 'standart',
//             [styles.darkModeInput]: colorMode === 'dark',
//             [styles.lightModeInput]: colorMode === 'light',
//             [styles.errorInput]: isError,
//           })}
//           // onChange={(e) => setValue(e.target.value)}
//           {...props}
//         />

//         {errorMessage && (
//           <p className={cn(styles.errorMessage)} style={{ width }}>
//             {errorMessage}
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

export default Input
