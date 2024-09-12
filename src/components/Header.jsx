import React from 'react'
import "./Header.scss"
import { logo } from './Image'
import Menu from './Menu'


const Header = () => {
  return (
    <div id='Header'>
        <div className="Header_inner">
            <img className='logo' src={logo} alt="logo" />
            <Menu/>
        </div>
    </div>
  )
}

export default Header