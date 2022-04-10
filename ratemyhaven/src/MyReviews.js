import React,{useEffect,useState} from 'react'
import { db,auth } from "./Firebase";
import './MyReviews.css'
import moment from 'moment'
function MyReviews() {
    const [revs,setRevs] = useState([])
    const [userUni,setUserUni]=useState([])
    useEffect(()=>{
auth.onAuthStateChanged((auth)=>{
    db.collection(auth.uid).onSnapshot((qs)=>{
        const rs=[]
        qs.forEach((doc)=>{
            rs.push(doc.data())
        })
        setRevs(rs)
    })
})
 
       

       
    },[])
    console.log("MYR",revs)
    console.log("uni",userUni)
  return (
    <div className='mr_main'>
        <h1>My reviews</h1>
       {
           revs.map((review)=>(
               <div className="myr">
                   <div className="myr_ts">
                   <p>{moment(review.timestamp.toDate()).calendar()}</p>
                   </div>
                   <div className="myr_rev">
                   <p>{review.TextualReview}</p>
                   </div>
                  
                 
                 
               </div>
           ))
       }
    </div>
  )
}

export default MyReviews