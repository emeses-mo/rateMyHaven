import React ,{useState} from 'react';
import signup from './Images/signup.svg'
import './UserSignup.css'
import logo from './Images/logoFinal.png'
import { Link ,useHistory} from 'react-router-dom'
import { useStateValue } from './StateProvider'
import profile from './Images/profile.png'
import { auth } from "./Firebase";
import next from './Images/next.png'
function UserSignup() {
const [email,setEmail]= useState('')
const [name,setName]=useState('')
const [password,setPassword]=useState('')
const [university,setUniversity]=useState('')
const history = useHistory()
const [{ user },dispatch]= useStateValue();
const [image,setImage]=useState(null)

const handleChange=e=>{
    if(e.target.files[0]){
      setImage(e.target.files[0])
      
    }
    
    
  }

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
          <div className="upload_img">
              <div className="img_preview">
              {image == null ? <img src={profile} alt="" />: <img src={URL.createObjectURL(image)} alt="" /> } 
              </div>
         <div className="img_input">
             <label htmlFor="" for="images">Upload Your Image</label>
         <input type="file" id='images'  style={{display:'none  '}} accept="image/png, image/jpeg" onChange={handleChange} />
         </div>
             
         
            
          </div>
          <div className="register_form">
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
            <button onClick={handleAuth}> <img src={next} alt="" /> </button>
        </div>
        
      </form>
          </div>
         

      </div>
      
  </div>;
}

export default UserSignup;
