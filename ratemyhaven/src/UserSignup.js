import React ,{useState} from 'react';
import signup from './Images/signup.svg'
import './UserSignup.css'
import logo from './Images/logoFinal.png'
import { Link ,useHistory} from 'react-router-dom'
import { useStateValue } from './StateProvider'
import profile from './Images/profile.png'
import { storage,db,auth } from './Firebase';
import next from './Images/next.png'
function UserSignup() {
const [email,setEmail]= useState('')
const [name,setName]=useState('')
const [password,setPassword]=useState('')
const [university,setUniversity]=useState('')
const history = useHistory()
const [{ user },dispatch]= useStateValue();
const [image,setImage]=useState(null)
const [disppic,setDisp]=useState('')
console.log("dpurl",disppic)
const handleChange=e=>{
    if(e.target.files[0]){
      setImage(e.target.files[0])
      
    }
    console.log("URL",disppic)
    
  }

    const handleAuth=(e)=>{
        e.preventDefault()
        const uploadTask= storage.ref(`ProfileImages/${image.name}`).put(image)
    uploadTask.on("state_changed",
      snapshot =>{},
      error =>{
        console.log("e>",error)
      },
      ()=>{
        storage.ref("ProfileImages").child(image.name).getDownloadURL().then(url=>{
          setDisp(url)
         console.log(disppic)
          auth.createUserWithEmailAndPassword(email,password).then(auth=>{
            auth.user.updateProfile({
                displayName :name,
                
            })
            
            console.log("dpp",disppic)
            db.collection('Users').doc(auth.user.uid).set({
              id:auth.user.uid,
              Name:name,
              Email:email,
              University:university,
              url:disppic,
            })
            history.push('/')
           
        }).catch(error=> alert(error.message))
         
            // auth.createUserWithEmailAndPassword(email,password).then(auth=>{
            //   console.log("User Created")
            // }).catch(error => console.log(error.message))
            // auth.onAuthStateChanged((authUser)=>{
            //   authUser.updateProfile({
            //     displayName:name,
            //     photoURL:disppic,
            //   })
            //   db.collection('Users').doc(auth.user.uid).set({
            //           id:auth.user.uid,
            //           Name:name,
            //           Email:email,
            //           University:university,
            //           url:disppic,
            //         })
            //         history.push('/')
            // })




         setImage(null)
        //  auth.onAuthStateChanged((authUser)=>{
        //    authUser.updateProfile({
        //      photoURL: disppic,
        //    })
        //  })


        
        })

      })
         
    }



  return <div className='userSignup_main'>

      <div className="usu_cta">
          <img src={signup} alt="" />
      </div>
      <div className="signup_form">
      <form action="">
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
        
      
          </div>
          </form>

      </div>
      
  </div>;
}

export default UserSignup;
