import React from 'react'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import { VscAccount as AccountIcon } from 'react-icons/vsc'

import { ThemeContext } from '../../App'
import styles from './Header.module.scss'
import IconButton from '../ui/IconButton/IconButton'
import SwitchColorMode from '../ui/SwitchColorMode/SwitchColorMode'

const pages = [
  { path: '/', name: 'Групи' },
  { path: '/distribution', name: 'Розподіл' },
  { path: '/plans', name: 'Плани' },
  { path: '/streams', name: 'Потоки' },
  { path: '/teachers', name: 'Викладачі' },
  { path: '/auditories', name: 'Аудиторії' },
  { path: '/5', name: 'Навантаження' },
  { path: '/6', name: 'Контроль вичитки' },
  { path: '/timetable', name: 'Розклад' },
]

const Header: React.FC = () => {
  const { colorMode } = React.useContext(ThemeContext)

  return (
    <header
      className={cn(styles.header, {
        [styles.light]: colorMode === 'light',
        [styles.dark]: colorMode === 'dark',
      })}
    >
      <NavLink className={styles['header-left']} to="/">
        Timetable
      </NavLink>
      <ul className={styles['header-menu']}>
        {pages.map((el) => (
          <li key={el.name}>
            <NavLink to={el.path} className={({ isActive }) => (isActive ? styles['active-page'] : '')}>
              {el.name}
            </NavLink>
          </li>
        ))}

        {/* <li>Звіти</li> */}
        {/* <li>Налаштування</li> */}
      </ul>
      <div className={styles['header-right']}>
        <SwitchColorMode />
        <IconButton sx={{ marginLeft: '20px' }} bg="dark">
          <AccountIcon size={24} />
        </IconButton>
      </div>
    </header>
  )
}

export default Header
