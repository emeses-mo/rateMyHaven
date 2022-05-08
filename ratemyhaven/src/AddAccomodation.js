import React,{useState,useEffect} from 'react';
import './AddAccomodation.css'
import { v4 as uuidv4 } from "uuid";
import home from './Images/addHome.svg'
import { storage,db,auth } from './Firebase';
import MapPicker from 'react-google-map-picker'
import { Link ,useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function AddAccomodation() {

const   warn = () => toast.warn('⚠️ Fill All Input Fields', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });




  const history = useHistory()
  const [name,setName]= useState('')
  const [acctype,setaccType]= useState('')
  const [rooms,setRooms]= useState('')
  const [desc,setDesc]= useState('')
  const [image,setImage]=useState(null)
  const [url,setUrl]=useState('')

  const [latitude,setLatitude]= useState('')
  const [longitude,setLongitude]= useState('')
  const DefaultLocation = { lat: 10, lng: 106};
const DefaultZoom = 10;
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  
  console.log(image)
  function u(){
    
 
  }
  const handleChange=e=>{
    if(e.target.files[0]){
      setImage(e.target.files[0])
      u()
    }
    console.log("url>",url)
    
  }
  const handleUpload=(e)=>{
    e.preventDefault()
    if(name!= null && acctype!=null && desc!=null && image!=null && rooms!=null){
      const uid= uuidv4()
    const uploadTask= storage.ref(`accomodationImages/${image.name}`).put(image)
    uploadTask.on("state_changed",
      snapshot =>{},
      error =>{
        console.log("e>",error)
      },
      ()=>{
        storage.ref("accomodationImages").child(image.name).getDownloadURL().then(url=>{
          setUrl(url)
          const uniSelected = localStorage.getItem('UniversityClicked').replace(/"/g, "")
          auth.onAuthStateChanged((authUser)=>{
 
           db.collection(uniSelected).doc(uid).set({
             id:uid,
             Name:name,
             CreatedBy:authUser.displayName,
             email:authUser.email,
             url:url,
             Type:acctype,
             desc:desc,
             rooms:rooms,
             lat:latitude,
             long:longitude,
           })
           console.log("auth ",authUser)
         })
         setImage(null)
         setDesc('')
         setName('')
         setRooms('')
         setUrl('')
         setaccType('')
         history.push('/university-listings')
        })
      }
    )
     
    
    
   
    
      
    
    
   
    console.log("url",url)

    }
    else{
     warn()



    }
    
  }
  
  function handleChangeLocation (lat, lng){
    setLocation({lat:lat, lng:lng});
  }
  
  function handleChangeZoom (newZoom){
    setZoom(newZoom);
  }

  function handleResetLocation(){
    setDefaultLocation({ ... DefaultLocation});
    setZoom(DefaultZoom);
  }

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
    })
  },[])
  console.log("lats>",latitude)
  console.log("long>",longitude)
  return <div className='addAccomodation'>
     
     <div className="aa_sec">
     <div className="aa_form">
        <form action="" id='add-accomodation'>
          <div className="aaform_primary">
            <h2>Primary Info</h2>
          <p>What's your accomodation called?</p>
          <input type="text" value={name} onChange={e=>setName(e.target.value)} />
          <p>What kind of accomodation is it?</p>
          <select name="" id="" value={acctype} onChange={e=>setaccType(e.target.value)}>
            <option value="" disabled selected>Select Type</option>
            <option value="apartment">Apartment</option>
            <option value="hostel">Hostel</option>
            <option value="pg">Paying Guest</option>
          </select>
          <p>Number of rooms?</p>
          <input type="number" min="1" max="3" value={rooms} onChange={e=>setRooms(e.target.value)} />
          <p>Give us a description of your home</p>
          <textarea maxLength="150" name="" form='add-accomodation' id="" cols="50" rows="10" value={desc} onChange={e=>setDesc(e.target.value)}></textarea>
          </div>
          
          <div className="aaform_secondary">
            <h2>Secondary Info</h2>
            <p>Attach Pictures</p>
            <input type="file" accept="image/png, image/jpeg" onChange={handleChange}/>
          </div>
          <div className="aaform_final">
            <button onClick={handleUpload}>Add My Home!</button>
          </div>
      </form>


      
      {/* <div className="map">
      <button onClick={handleResetLocation}>Reset Location</button>
  <label>Latitute:</label><input type='text' value={location.lat} disabled/>
  <label>Longitute:</label><input type='text' value={location.lng} disabled/>
  <label>Zoom:</label><input type='text' value={zoom} disabled/>
  <MapPicker defaultLocation={defaultLocation}
    zoom={zoom}
    mapTypeId="roadmap"
    style={{height:'700px'}}
    onChangeLocation={handleChangeLocation} 
    onChangeZoom={handleChangeZoom}
    apiKey='AIzaSyDz-JMcFB2BNnGnucKOltcip7y6z1GyhRo'/>
      </div> */}

     </div>
     </div>
     
     <div className="aa_cta">
    <img src={home} alt="" />
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
}

export default AddAccomodation;
