import React, {useEffect,useState} from 'react'
import {auth, db } from './Firebase';
import { v4 as uuidv4 } from "uuid";
import logo from "./Images/log.svg"
import empty from './Images/Empty.svg'
import './AccomodationReviews.css'
import {Link} from 'react-router-dom'
import profile from './Images/profile.png'
import { useStateValue } from './StateProvider'
import gs from './Images/gstar.png'
function AccomodationReviews() {
    const [total,setTotal] = useState([])

    const [reviews,setReviews]= useState([])
    const [name,setName]=useState('')
    const [review,setReview]=useState('')
    const [uniInfo,setUniInfo]= useState([])
    const [data,setData]=useState([])
    const uniSelected = localStorage.getItem('UniversityClicked').replace(/"/g, "")
    const accomSelected = localStorage.getItem('Accomodation').replace(/"/g, "")
const [clnsavg,setClnsavg]=useState('')
const [secavg,setSecavg]=useState('')
const [proxavg ,setProxavg]=useState('')
const [maintavg,setMaintavg]=useState('')
const [{ user },dispatch]= useStateValue();
    
    useEffect(()=>{

        db.collection("uni").doc(uniSelected).collection("Accomodation").doc(accomSelected).collection("reviews").onSnapshot((querySnapshot)=>{
                const r=[]
         
                querySnapshot.forEach((doc)=>{
                    r.push(doc.data())
               })
                 setReviews(r)

             }
        
             
        )
        db.collection(uniSelected).where("Name","==",accomSelected).onSnapshot((qs)=>{
            const s=[]
            qs.forEach((doc)=>{
                s.push(doc.data())
            })
            setUniInfo(s)
        })
        

    
// fetch().then(
//     console.log("dt",data)
  
//     // data.map((avg)=>{  
//     //     console.log('here')  
                    
//     //     console.log("CLns>",avg.Cleanliness)
//     // c.push(avg.Cleanliness)
//     // t=t + avg.Cleanliness
//     // console.log(t)
//     // setClnsavg(t)
//     // console.log("cvsvs",clnsavg)
//     // }
// )
   


  
    },[])

   
    const calculate =()=>{
        
        const c=[]
        let t= 0
        let u=0
        let v=0
        let w=0      
           
                reviews.map((avg)=>{    
                    
                    console.log("CLns>",avg.Cleanliness)
              c.push(avg.Cleanliness)
           t=t + avg.Cleanliness
           console.log("tval",t)
              u= u+ avg.Proximity
            v=v+avg.Maintenance
                w=w+avg.Security
            })
            setSecavg(Math.round(((w/reviews.length)*10))/10)
            setMaintavg(Math.round(((v/reviews.length)*10))/10)
            setProxavg(Math.round(((u/reviews.length)*10))/10)
            setClnsavg(Math.round(((t/reviews.length)*10))/10)
            console.log("Value",clnsavg)    
                    
             
    }
    

    
    const handleSend=(e)=>{
        e.preventDefault()
        const uid= uuidv4()
        auth.onAuthStateChanged((authUser)=>{
           db.collection("uni").doc(uniSelected).collection("Accomodation").doc(accomSelected).collection("reviews").doc(uid).set({
            id:uid,
            ReviewByName:authUser.displayName,
            ReviewByEmail:authUser.email,
            Review:review,
        }) 
        })
        
    }
  return (
    <div className='ar_main'>

        <div className="ar_header">
            <div className="ar_uni">
                <h1>{uniSelected}</h1>
            </div>
            <div className="ar_logo">
               <Link to="/"><img src={logo} alt="" /></Link> 
            </div>
        </div>
        <div className="ar_wrapper">
            <div className="ar_accDetails">
                <div className="acc_info1">
                    <h2>{accomSelected}</h2>
                </div>
                <div className="acc_info2">
                    <div className="info">{
                    uniInfo.map((info)=>(
                        <div className="div">
                            {info.Type}
                        </div>
                    ))
                    
                    }</div>
                    <div className="info">{
                        uniInfo.map((info)=>(
                            <div className="div">
                                {info.rooms}BHK
                            </div>
                        ))
                        
                        }
                    </div>
                    
                </div>
                <div className="acc_info3">
                    {
                        uniInfo.map((info)=>(
                            <div className="div">
                                <img src={info.url} alt="" />
                            </div>
                        ))
                    }
                  
                </div>
                <div className="overall_rating">
                    <div className="or_box">
                    <h3>Rating Breakdown </h3><div className="showbreakdown"><button onClick={calculate} >Show Breakdown</button></div>
                    </div>
                    
                    { <div className="ratingwrapper">
                        <div className="rating_br">
                            
                             <div className="rbs">
                                  <p>Cleanliness  </p>
                             </div>

                             <div className="rbs">
                                 {clnsavg}  
                                 <img src={gs} alt="" />
                             </div>
                             
                        </div>
                        <div className="rating_br">
                            
                            <div className="rbs">
                                 <p>Proximity  </p>
                            </div>

                            <div className="rbs">
                                {proxavg}  
                                <img src={gs} alt="" />
                            </div>
                            
                       </div>
                       <div className="rating_br">
                            
                            <div className="rbs">
                                 <p>Maintenance  </p>
                            </div>

                            <div className="rbs">
                                {maintavg}  
                                <img src={gs} alt="" />
                            </div>
                            
                       </div>
                       <div className="rating_br">
                            
                            <div className="rbs">
                                 <p>Security  </p>
                            </div>

                            <div className="rbs">
                                {secavg}  
                                <img src={gs} alt="" />
                            </div>
                            
                       </div>

                    </div>
                        
                        
                       
                    
                        
                    }

                </div>
                <div className="add_review">
                    {
                            user ?  <Link to="/add-review"><h4>Add another review</h4></Link> : <Link to='/user-login'><h4>Login to add another review</h4></Link> 
                    }
                   
                </div>

            </div>
            <div className="ar_Reviews">
                {
            reviews.length == 0? <div className="empty_reviews">
                <div className="er_cta">
                    <img src={empty} alt="" />
                </div>
                <h1>Looks Kinda Empty :(</h1>
            </div> : <div className="non_empty_reviews">
                {
                    reviews.map((rev)=>(
                        <div className="reviewCard" id={rev.id}>
                    <div className="reviewPrimary">
                        <div className="reviewer_image">
                            <img src={profile} alt="" />
                        </div>
                        <div className="reviewer_info">
                            <div className="rv_name">
                                <h4>{rev.ReviewBy}</h4>
                            </div>
                            
                            <div className="rv_avgrating">
                                <div className="avgtext">
                                     <h5>{rev.Average}  </h5>
                                </div>
                                <div className="avgimg">
                                <img src={gs} alt="" />
                                </div>
                               
                            </div>
                            <div className="rv_yos">
                                <h5>{rev.StartMonth} to {rev.EndMonth}</h5>
                            </div>
                             
                        </div>
                       
                    </div>
                    <div className="reviewSecondary">
                        <p>{rev.TextualReview}</p>
                    </div>
                </div> 
                    ))
                   
                }
                
            </div>
        }
            </div>
        </div>
        
        
    </div>
  )
}

export default AccomodationReviews