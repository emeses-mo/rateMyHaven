import React ,{useState} from 'react'
import './AddReview.css'
import firebase from './Firebase';
import { FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import logo from "./Images/log.svg"
import {auth, db,serverTimestamp } from './Firebase';
import { v4 as uuidv4 } from "uuid";
import { Link,useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Sentiment from 'sentiment'
var sentiment = new Sentiment();

function AddReview() {
    const   warn = () => toast.warn('⚠️ Fill All Input Fields', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    const uniSelected = localStorage.getItem('UniversityClicked').replace(/"/g, "")
    const accomSelected = localStorage.getItem('Accomodation').replace(/"/g, "")
    const [cleanliness,setCleanliness]= useState('')
    const [maintenance,setMaintenance]= useState('')
    const [security,setSecurity]= useState('')
    const [proximity,setProximity]= useState('')
    const [hover,setHover]=useState(null)
    const [duration,setDuration]= useState('')
    const [textreview,setTextreview]=useState('')
    const [curr , setCurr] = useState('');
    const [avg,setAvg]=useState('')
    const history = useHistory()
    const [res,setRes]=useState('')
    const [from,setFrom]=useState('')
    const [to,setTo]=useState('')
    const test =(e)=>{
        e.preventDefault()
       
   
    }
    const changeClns =(value)=>{
        setCleanliness(value)
    } 
    const changeSec =(value)=>{
        setSecurity(value)
    } 
    const changeMtn =(value)=>{
        setMaintenance(value)
    } 
    const changeprx =(value)=>{
        setProximity(value)
    } 
    
 
    
    console.log("from",from)
    console.log("to",to)
    
   
    const handleReviewPost=(e)=>{
        e.preventDefault()
        if(cleanliness!='' && proximity!='' && maintenance!='' && security!='' && textreview!='' && from!='' && to!=''){
            const uid= uuidv4()
       
       
        auth.onAuthStateChanged((authUser)=>{
            
            const result = sentiment.analyze(textreview);
            console.log("result: ",result.score)
           setRes(result.score)
           console.log(res)
           const k= ((cleanliness+maintenance+security+proximity)+(res))/5
           db.collection(authUser.uid).doc(uid).set({
            id:uid,
            TextualReview: textreview,
            Cleanliness:cleanliness,
            Maintenance:maintenance,
            Security:security,
            Proximity:proximity,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            Average:k,
            StartMonth:from,
            EndMonth:to,
           })
            db.collection("uni").doc(uniSelected).collection("Accomodation").doc(accomSelected).collection("reviews").doc(uid).set({
                id:uid,
                ReviewBy:authUser.displayName,
                ReviewEmail:authUser.email,
                TextualReview: textreview,
                Cleanliness:cleanliness,
                Maintenance:maintenance,
                Security:security,
                Proximity:proximity,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                Average:k,
                StartMonth:from,
                EndMonth:to,
            }).then(
                history.push('/accomodation-reviews')
            )
        })

        }else{
          alert("Fill All Input Fields")
        }
        
    }
  return (
    <div className='addreview_main'>
        <div className="ar_header">
            <div className="ar_uni">
                <h1>{uniSelected}</h1>
            </div>
            <div className="ar_logo">
                


                
            <Link to='/'><img src={logo} alt="" /></Link>    
            </div>
        </div>
        <div className="review_container">
          <div className="review_wrapper">
            <form action="">
               <div className="review_box">
                   <div className="reviewip ip1">
                       <h2>Duration of stay</h2>
                       <div className="duration_wrapper">
                            {/* <input type="number" placeholder='Years' value={duration} onChange={e=>setDuration(e.target.value)}/> */}
                        <div className="month_block">
                            <label htmlFor="">From</label>
                        <input type="month" placeholder='' max='2022-03' value={from} onChange={e=>setFrom(e.target.value)} />
                        </div>
                        <div className="month_block">
                            <label htmlFor="">To</label>
                        <input type="month" placeholder='' max='2022-03' min={from}  value={to} onChange={e=>setTo(e.target.value)}/>
                        </div>
                       </div>
                       
                        
                   </div>
                   <div className="reviewip ip2">
                       <h2>Review</h2>
                        <textarea maxLength="150"  cols="50" rows="10" value={textreview} onChange={e=>setTextreview(e.target.value)}></textarea>
                   </div>
                    

            </div> 
            <div className="review_box">
                <div className="rating_component">
                    <h2>Cleanliness</h2>
                   
                    <div className="rc">
                    <ReactStars
                         count={5}
                       onChange={changeClns}
                     size={30}
                      activeColor="#22AEE9"
                         />
                    </div>
                    
                     
                </div>
                <div className="rating_component">
                    <h2>Security</h2>
                   
                    <div className="rc">
                    <ReactStars
                         count={5}
                       onChange={changeSec}
                     size={30}
                      activeColor="#22AEE9"
                         />
                    </div>
                    
                     
                </div>
                <div className="rating_component">
                    <h2>Maintenance</h2>
                   
                    <div className="rc">
                    <ReactStars
                         count={5}
                       onChange={changeMtn}
                     size={30}
                      activeColor="#22AEE9"
                         />
                    </div>
                    
                     
                </div>
                <div className="rating_component">
                    <h2>Proximity to the university</h2>
                   
                    <div className="rc">
                    <ReactStars
                         count={5}
                       onChange={changeprx}
                     size={30}
                      activeColor="#22AEE9"
                         />
                    </div>
                    
                     
                </div>
               
            </div>
            <div className="action_buttons">
                <div className="cancel">
                    <button>Cancel</button>
                </div>
                <div className="post">
                    <button onClick={handleReviewPost}>Post</button>
                </div>
              
            </div>
            
            </form>     
        </div>  
        </div>
        
    </div>
  )
}

export default AddReview