import React ,{useEffect, useState} from 'react';
import signup from './Images/signup.svg'
import './UserSignup.css'
import logo from './Images/logoFinal.png'
import { Link ,useHistory} from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { auth } from "./Firebase";
import './Nav1.css'
function Nav1() {
    const [{ user },dispatch]= useStateValue();
    const [dname,setName]= useState('')
    const [dp,setDp]=useState(null)
    const history = useHistory()
    const handlesignout =()=>{
        if(user){
          auth.signOut();
          setName()

          history.push('/')

      }
      }
      useEffect(()=>{
          auth.onAuthStateChanged((authUser)=>{
            authUser ==null ? console.log("null") : setName(authUser.displayName)
            authUser == null ? console.log("DPNULL") : setDp(authUser.photoURL)
            console.log("USerName",authUser.photoURL)
          }
         
          )
      },[])
      
  return (
    <div className='nav1_main'>
 <div className="landing_header">
            <div className="landing_logo">
                <img src={logo} alt="" />    
            </div>
            <div className="landing_nav">
              <Link to='/' className='no-dec'><p>Home</p></Link>  
                <p>My Reviews</p>
                <p>About</p>    
            </div>
            <div className="author">
            {/* <button onClick={handlesignout} >Logout</button> */}
              {
                  dname ? <div className='dropdown'><p className='dropbtn'>Hello {dname}  </p> <div className="dropdown-content"><p>Manage Profile</p> <p onClick={handlesignout}>Logout</p></div></div>   : <div className="landing_auth lgin"><Link className='no-dec' to='/user-login'><p>Login</p></Link>   
                  <p>|</p>
              <Link className='no-dec ' to='/user-signup'> <p>Sign up</p></Link>   </div>
              }
             
            </div>
        </div>
    </div>
  )
}

export default Nav1