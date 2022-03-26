import React ,{useState} from 'react'
import './Login.css'
import { auth } from "./Firebase";
import { Link ,useHistory} from 'react-router-dom'
function Login() {
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const history = useHistory()
    const handleAuth=(e)=>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(name,password).then(
               history.push('/')
        
             
        ).catch(error=> alert(error.message))
    }
  return (
    <div className='login_main'>
        <div className="login_wrapper">
            <div className="login_box">

                <form action="">
                    <p>Email</p>
                    <input type="email" name="" id="" value={name} onChange={e=>setName(e.target.value)} />
                    <p>Password</p>
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)}  />
                    <div className="login_button">
                         <button onClick={handleAuth}>Login</button>
                    </div>
                   <h2>Dont have an account? <Link to='/user-signup'>Register here!</Link> </h2>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login