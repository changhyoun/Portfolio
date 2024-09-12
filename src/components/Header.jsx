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
            <div className="input_box">
              <span className="material-symbols-rounded">
                action_key
              </span>
            </div>
        </div>
    </div>
  )
}

export default Header