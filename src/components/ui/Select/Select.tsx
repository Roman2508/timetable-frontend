import React from 'react'
import cn from 'classnames'
import ReactSelect, { CSSObjectWithLabel, OptionProps } from 'react-select'

import './Select.scss'
import styles from './Select.module.scss'
import { ThemeContext } from '../../../App'

interface ISelectComponentProps {
  labelBgColor?: 'light' | 'dark'
  label?: string
  options?: { value: string; label: string }[]
  onChange?: (e: any) => void
  multi?: boolean
  width?: string
  wrapperWidth?: string
  onClear: () => void
  isError?: boolean
  errorMessage?: string
  customClassNames?: string
  selectValue?: { value: string; label: string } | { value: string; label: string }[] | null
  [propName: string]: any
}

const Select = React.forwardRef<any, ISelectComponentProps>(
  (
    {
      onChange = (_: any) => {},
      labelBgColor = 'light',
      wrapperWidth = 'auto',
      customClassNames = '',
      selectValue = null,
      errorMessage = '',
      isError = false,
      onClear = () => {},
      width = 'auto',
      multi = false,
      options = [],
      label = null,
      ...props
    },
    ref
  ) => {
    const { colorMode } = React.useContext(ThemeContext)

    const [isFocused, setIsFocused] = React.useState(false)

    return (
      <div
        className={cn(styles['select-wrapper'], {
          ['select-menu-dark']: colorMode === 'dark',
        })}
        style={{ width: wrapperWidth }}
      >
        {label && (
          <label
            className={cn(styles.label, {
              [styles.focused]: isFocused,
              [styles.notEmpty]: selectValue || props?.value,
              [styles['labelLight']]: labelBgColor === 'light',
              [styles['labelDark']]: labelBgColor === 'dark',
              [styles['light']]: colorMode === 'light',
              [styles['dark']]: colorMode === 'dark',
              [styles['error']]: isError,
            })}
          >
            {label}
          </label>
        )}

        <ReactSelect
          ref={ref}
          styles={{
            control: (baseStyles: CSSObjectWithLabel) => ({
              ...baseStyles,
              width,
            }),
          }}
          value={selectValue}
          onChange={onChange}
          options={options}
          placeholder=""
          isSearchable={false}
          // menuIsOpen
          isMulti={multi}
          classNames={{
            control: (state) => {
              setIsFocused(state.isFocused)

              return cn(
                {
                  [styles.select]: true,
                  [styles['focused']]: state.isFocused,
                  [styles['light']]: colorMode === 'light',
                  [styles['dark']]: colorMode === 'dark',
                  [styles['error']]: isError,
                },
                customClassNames
              )
            },
          }}
          /* @ts-ignore */
          components={{ Option: CustomOption }}
          {...props}
        />
      </div>
    )
  }
)

const CustomOption = (props: OptionProps) => {
  const { innerProps, isDisabled, /*  data, */ children, innerRef /* getStyles */ } = props
  // console.log(props)

  return !isDisabled ? (
    <div
      ref={innerRef}
      {...innerProps}
      className={cn(styles['select-item'], { [styles.selected]: innerProps['aria-selected'] })}
    >
      {children}
    </div>
  ) : null
}

export default Select
