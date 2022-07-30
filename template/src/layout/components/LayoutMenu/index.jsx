import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import './style.scss'

const menuItemRender = (menus) => {
  return menus.map((menu, i) => {
    if (menu.routes && menu.routes.length) {
      return (
        <Menu.SubMenu
          key={menu.path || menu.name || i}
          title={
            <span>
              {menu.icon && menu.icon}
              <span>{menu.name}</span>
            </span>
          }
        >
          {menuItemRender(menu.routes)}
        </Menu.SubMenu>
      )
    } else {
      return menu.path ? (
        <Menu.Item key={menu.path || menu.name || i}>
          <Link to={menu.path}>
            {menu.icon && menu.icon}
            <span>{menu.name}</span>
          </Link>
        </Menu.Item>
      ) : null
    }
  })
}
const LayoutMenu = ({
  menuData,
  openMenuKeys,
  selectedMenuKeys,
  setOpenMenuKeys
}) => {
  return (
    <Menu
      className='page-menu'
      theme='light'
      mode='inline'
      inlineIndent={32}
      openKeys={openMenuKeys}
      selectedKeys={selectedMenuKeys}
      onOpenChange={setOpenMenuKeys}
    >
      {menuItemRender(menuData)}
    </Menu>
  )
}

export default LayoutMenu
