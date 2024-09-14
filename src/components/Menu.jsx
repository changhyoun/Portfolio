import React from 'react';
import './Menu.scss';
import { Link } from 'react-router-dom';
import { github_ic, project_ic } from './Image';

const Menu = () => {
  return (
    <div className='Menu'>
      <nav className="Menu_inner">
        <ul>
          <li>
            <Link to="/project" data-tooltip="Projects">
              <span className="material-symbols-rounded">
                laptop_chromebook 
              </span>
              {/* 프로젝트 */}
            </Link>
          </li>
          <li>
            <Link to="/support" data-tooltip="About">
              <span className="material-symbols-rounded">
                contact_support 
              </span>
              {/* 고객 지원 */}
            </Link>
          </li>
          <li>
            <Link to="/about" data-tooltip="Contact">
              <span className="material-symbols-rounded">
                perm_phone_msg
              </span>
              {/* 소개 */}
            </Link>
          </li>
          <li>
            <Link to="https://github.com" target="_blank" data-tooltip="GitHub">
              <img src={github_ic} alt="GitHub" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;