import React from 'react'
import cn from 'classnames'
import Select, { OptionProps } from 'react-select'

import './Select.scss'
import styles from './Select.module.scss'
import { ThemeContext } from '../../../App'

interface ISelectComponentProps {
  labelBgColor?: 'light' | 'dark'
  label?: string
  options?: { value: string; label: string }[]
  onChange?: (e: any) => void
  multi?: boolean
  selectValue?: { value: string; label: string } | { value: string; label: string }[] | null
  [propName: string]: any
}

const SelectComponent: React.FC<ISelectComponentProps> = ({
  labelBgColor = 'light',
  options = [],
  onChange = (_: any) => {},
  selectValue = null,
  width = 'auto',
  multi = false,
  label = null,
  ...props
}) => {
  const { colorMode } = React.useContext(ThemeContext)

  const [isFocused, setIsFocused] = React.useState(false)

  return (
    <div
      className={cn(styles['select-wrapper'], {
        ['select-menu-dark']: colorMode === 'dark',
      })}
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
          })}
        >
          {label}
        </label>
      )}

      <Select
        styles={{
          control: (baseStyles /*,  state */) => ({
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

            return cn({
              [styles.select]: true,
              [styles['focused']]: state.isFocused,
              [styles['light']]: colorMode === 'light',
              [styles['dark']]: colorMode === 'dark',
            })
          },
        }}
        /* @ts-ignore */
        components={{ Option: CustomOption }}
        {...props}
      />
    </div>
  )
}

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

export default SelectComponent
