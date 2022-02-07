import React ,{useState} from 'react';
import signup from './Images/signup.svg'
import './UserSignup.css'
import { Link ,useHistory} from 'react-router-dom'
import { auth } from "./Firebase";
function UserSignup() {
const [email,setEmail]= useState('')
const [name,setName]=useState('')
const [password,setPassword]=useState('')
const [university,setUniversity]=useState('')
const history = useHistory()
    const handleAuth=(e)=>{
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email,password).then(auth=>{
            auth.user.updateProfile({
                displayName :name
            })
            history.push('/')

        }).catch(error=> alert(error.message))
    }



  return <div className='userSignup_main'>
      <div className="usu_cta">
          <img src={signup} alt="" />
      </div>
      <div className="signup_form">
          <form action="">
          <p>What's Your Name?</p>
          <input type="text" value={name} onChange={e=>setName(e.target.value)} />
          <p>Where Do You Study?</p>
          <input type="text" value={university} onChange={e=>setUniversity(e.target.value)} />
          <p>What's Your Email</p>
          <input type="email"  value={email} onChange={e=>setEmail(e.target.value)} />
        <p>Set A Secure Password</p>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)}  />
        <div className="su_button">
            <button onClick={handleAuth}>Create Account </button>
        </div>
        
      </form>

      </div>
      
  </div>;
}

export default UserSignup;
