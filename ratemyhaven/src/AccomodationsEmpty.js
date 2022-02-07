import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from "./Firebase";
import { useStateValue } from './StateProvider'
import './AccomodationEmpty.css'
function AccomodationsEmpty() {
    useState(()=>{
        auth.onAuthStateChanged((authUser)=>{
            console.log("user here issss",authUser)
        })
    },[])
    const [{ user },dispatch]= useStateValue();

  return <div className='acc_main'>
      <div className="acc_content">
          <h1>Looks Empty Here</h1>
      <h2>Add Your Home</h2>
      {
          user ? <h2><Link to="/add-accomodation">Add Your Home</Link> </h2> : <Link to="/user-signup"> <button>Login OR Signup Here</button></Link>
      }
      </div>
      
        
  </div>;
}

export default AccomodationsEmpty;
