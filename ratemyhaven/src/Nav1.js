import React ,{useEffect, useState} from 'react';
import signup from './Images/signup.svg'
import './UserSignup.css'
import logo from './Images/logoFinal.png'
import { Link ,useHistory} from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { auth } from "./Firebase";
import profile from './Images/profile.png'
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
              <Link className='nodec' to='/my-reviews'> <p>My Reviews</p></Link> 
                <p>About</p>    
            </div>
            <div className="author">
            {/* <button onClick={handlesignout} >Logout</button> */}
              {
                  user ? <div className='dropdown'><p className='dropbtn'> {user?.displayName} {user?.photoURL ? <img src={user?.photoURL} alt="" /> : <img src={profile} alt="" /> }</p> <div className="dropdown-content"><Link className='nodec' to='/manage-profile'><p>Manage Profile</p></Link>  <p onClick={handlesignout}>Logout</p></div></div>   : <div className="landing_auth lgin"><Link className='no-dec' to='/user-login'><p>Login</p></Link>   
                  <p>|</p>
              <Link className='no-dec ' to='/user-signup'> <p>Sign up</p></Link>   </div>
              }
             
            </div>
        </div>
    </div>
  )
}

export default Nav1