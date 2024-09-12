import React from 'react'
import "./Menu.scss"
import { Link } from 'react-router-dom'
import { github_ic,project_ic } from './Image'

const Menu = () => {
  return (
    <div className='Menu'>
        <nav className="Menu_inner">
          <ul>
            <li>
              <Link to="/img">
                <span className="material-symbols-rounded">
                  laptop_chromebook 
                </span>
                {/* project */}
              </Link>
            </li>
            <li>
              <Link to="/img">
              <span className="material-symbols-rounded">
                contact_support
              </span>
              </Link>
            </li>
            {/* about */}
            <li>
              <Link to="/img">
                <span className="material-symbols-rounded">
                  perm_phone_msg
                </span>
              </Link>
            </li>
            {/* contact */}
            <li>
              <Link to="/img">
                <img src={github_ic} alt="github_ic" />
              </Link>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Menu