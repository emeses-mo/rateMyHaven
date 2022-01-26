import React from 'react';
import logo from "./Images/log.svg"
import profile from './Images/user.png'
import { Link } from "react-router-dom";
import "./Header.css"
function Header() {
  return <div className='header'>
      <div className="logo">
          <img src={logo} alt="" />
      </div>
      <div className="header-nav">
        
          <ul>
          <Link className='no-dec'><li>My Reviews</li></Link>
           <Link className='no-dec'><li>About Us</li></Link>   
           <Link className='no-dec'><li>Admin</li></Link>   
             <Link className='no-dec'><li><img src={profile} alt="" /></li></Link> 
          </ul>
        
          
      </div>
  </div>;
}

export default Header;
