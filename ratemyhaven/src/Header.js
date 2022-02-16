import React from 'react';
import logo from "./Images/log.svg"
import profile from './Images/user.png'
import { useStateValue } from './StateProvider'
import { Link, useHistory } from "react-router-dom";
import {auth} from "./Firebase"
import "./Header.css"
function Header() {
  const history = useHistory()
  const [{ user },dispatch]= useStateValue();
  const handleSignout =e =>{
    if(user){
      auth.signOut();
      history.push('/')
  }
  }
  return <div className='header'>
      <div className="logo">
        <Link to="/">
        <img src={logo} alt="" />
        </Link>
          
      </div>
      <div className="header-nav">
        
          <ul>
          <Link className='no-dec'><li>My Reviews</li></Link>
           <Link className='no-dec'><li>About Us</li></Link>   
           <Link className='no-dec'><li>Admin</li></Link>   
             <Link className='no-dec'><li><img src={profile} alt="" onClick={handleSignout} /></li></Link> 
          </ul>
        
          
      </div>
  </div>;
}

export default Header;
