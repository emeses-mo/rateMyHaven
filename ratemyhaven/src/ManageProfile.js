import React,{useState,useEffect} from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { storage,db,auth } from './Firebase';
import profile from './Images/profile.png'
import { useStateValue } from './StateProvider'
import "./ManageProfile.css"
import edit from './Images/edit.png'
function ManageProfile() {
    const [open, setOpen] = useState(false);
    const [image,setImage]=useState(null)
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [{ user },dispatch]= useStateValue();
  const [url,setURL]= useState('')
  const [userD,setuserD]= useState([])
 const handleDP=(e)=>{
e.preventDefault()
const uploadTask= storage.ref(`ProfileImages/${image.name}`).put(image)
uploadTask.on("state_changed",
  snapshot =>{},
  error =>{
    console.log("e>",error)
  },
  ()=>{
    storage.ref("ProfileImages").child(image.name).getDownloadURL().then(url=>{
      setURL(url)
      
      auth.onAuthStateChanged((authUser)=>{
        authUser.updateProfile({
          photoURL:url,
        })
      })
        
        
        
       
   
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
 console.log("dpp",url)
  const handleChange=e=>{
    if(e.target.files[0]){
      setImage(e.target.files[0])
      
    }
    
    
  }
  useEffect(()=>{
    db.collection("Users").where("Email","==",user?.email).onSnapshot((qs)=>{
      const d=[]
      qs.forEach((doc)=>{
        d.push(doc.data())
      })
      setuserD(d)
    })
  },[])
  return (
    <div className='manageprofile_main'>
        {/* <h2>Manage Profile</h2>
        <div className="compa">
            <p>Update Details</p>
            

              <p>Profile Picture</p>
              {image == null ? <img src={profile} alt="" />: <img src={URL.createObjectURL(image)} alt="" /> } 
              <label htmlFor="" for="images">Upload Your Image</label>
              <input type="file" id='images'  style={{display:'none  '}} accept="image/png, image/jpeg" onChange={handleChange} />
              <button onClick={handleDP} >Upload DP</button>
              {
                userD.map((u)=>(
                  <div className="info">
                    <p>Name</p>
                    <p>{u.Name} </p>
                    <p>University</p>
                    <p>{u.University}</p>
                  </div>
                ))
              }
            
            
            <button onClick={onOpenModal}>Open</button>
            
        </div>
        <div className="compb">

        </div> */}
        <div className="seca">
          <div className="mp_img">
            {user?.photoURL ?  <img src={user?.photoURL} alt="" /> : <img src={profile} alt="" /> }
            <p>{user?.displayName}</p>
          </div>
          <div className="mp_nav">
            <div className="mp_navitems">
              <p>Account</p>
              
            </div>
          </div>
        </div>
        <div className="secb">
        <h3>Account Settings</h3>
        <div className="mp_accdetails">
         <div className="mp_editblock">
          <div className="mp_detail">
            <p>Name</p>
            <h5>Mohammed Sameer</h5>

          </div>
          <div className="mp_editbtn">
            <button onClick={onOpenModal}><img src={edit} alt="" /></button>
          </div>
          <Modal open={open} onClose={onCloseModal} center>
        <h2>Simple centered modal</h2>
      </Modal>

         </div>
         <div className="mp_editblock">
          <div className="mp_detail">
            <p>University</p>
            <h5>Christ University, Bangalore</h5>

          </div>
          <div className="mp_editbtn">
           
          </div>
          <Modal open={open} onClose={onCloseModal} center>
        <h2>Simple centered modal</h2>
      </Modal>

         </div>
         <div className="mp_editblock">
          <div className="mp_detail">
            <p>Email</p>
            <h5>{user?.email}</h5>

          </div>
          
          <Modal open={open} onClose={onCloseModal} center>
        <h2>Simple centered modal</h2>
      </Modal>

         </div>
        </div>
        </div>
    </div>
  )
}

export default ManageProfile