import { Switch } from 'antd'
import { useEffect, useState } from 'react'
import DarkIcon from './dark-icon'
import LightIcon from './light-icon'
import './style.scss'
const THEME_KEY = '__U2_admin_theme__'

const createStyle = (href) => {
  const id = 'custom-theme'
  const customTheme = document.querySelector('#' + id)
  if (customTheme) {
    customTheme.href = href
    return
  }
  const linkElement = document.createElement('link')
  const attributes = {
    type: 'text/css',
    rel: 'stylesheet',
    id,
    href: href
  }
  for (const [attribute, value] of Object.entries(attributes)) {
    linkElement[attribute] = value
  }
  document.head.appendChild(linkElement)
}
const removeStyle = (id) => {
  const element = document.querySelector(id)
  if (element) {
    element.parentNode.removeChild(element)
  }
}
const ThemeSwitch = () => {
  const [theme, setTheme] = useState(localStorage.getItem(THEME_KEY))
  const onChange = (value) => {
    const theme = value ? 'dark' : 'light'
    setTheme(theme)
  }
  useEffect(() => {
    if (theme === 'dark') {
      createStyle('/antd.dark.min.css')
    } else {
      removeStyle('#custom-theme')
    }
    document.querySelector('body').className = theme
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])
  return (
    <div className='theme-switch'>
      <Switch
        className={`button-switch ${theme}`}
        checkedChildren={
          <span className='theme-icon dark'>
            <DarkIcon />
          </span>
        }
        unCheckedChildren={
          <span className='theme-icon light'>
            <LightIcon />
          </span>
        }
        onChange={onChange}
        checked={theme === 'dark'}
      />
    </div>
  )
}

export default ThemeSwitch
