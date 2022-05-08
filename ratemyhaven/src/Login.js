import React ,{useState} from 'react'
import './Login.css'
import { auth } from "./Firebase";
import { Link ,useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useStateValue } from './StateProvider';
function Login() {
    const [{ user },dispatch]= useStateValue();
    const   warn = () => toast.warn('⚠️ Fill All Input Fields', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const err =()=> toast.error('🚫 Invalid Credentials', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const history = useHistory()
    const handleAuth=(e)=>{
        e.preventDefault()
        if(name!='' && password!=''){
            auth.signInWithEmailAndPassword(name,password).then(
                user ?  history.push('/'): console.log("No user")
                    
                
               
         
              
         ).catch(error=> err())
        }
        else{
            warn()
            console.log('dk')
        }
        
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
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </div>
  )
}

export default Login