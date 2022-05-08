import React,{useState,useEffect} from 'react'
import './AdminDash.css'
import logo from './Images/logoFinal.png'
import {auth, db } from './Firebase';
function AdminDash() {
    const [universites,setUnviersites]= useState([])
    const [uniname,setUniName]= useState([])
    useEffect(()=>{
            db.collection("Universities").onSnapshot((query)=>{
                const u = []
                query.forEach((doc)=>{
                    u.push(doc.data())
                })
                setUnviersites(u)
            })
    },[])
    const addUni=(e)=>{
        e.preventDefault()
        
            db.collection("Universities").doc(uniname).set({
                Name: uniname,
            }).then(()=>{
                alert("University Added")
            }).catch((error)=>{
                alert(error.message)
            })
            // db.collection("Reviews").doc("Christ University,Bangalore").collection("review").doc("R1").set({
            //     Namme:"Mo",
            //     Review:"Test Review",


            // }).then(()=>{
            //     console.log("Review Check")
            // }).catch((error)=>{
            //     alert(error.message)
            // })


        
    }
  return (
    <div className='admindash_main'>
        <div className="admin_header">
            <div className="admin_logo">
               <img src={logo} alt="" />
            </div>
            <div className="admin_title">
                <input type="search" placeholder='Search'/>
            </div>
            <div className="admin_logout">
                <button>Logout</button>
            </div>
        </div>
        <div className="admin_content">
            <div className="dash_card">
                <div className="cardname">
                    <p>Universtities Listed</p>

                </div>
                <div className="cardsummary">
                    {
                        
                            <p>{universites.length}</p>
                        
                    }
                </div>
            </div>
            <div className="dash_card">
                <div className="cardname">
                    <p>Total Users</p>

                </div>
                <div className="cardsummary">
                    <p>133</p>
                </div>
            </div>
            <div className="dash_card">
                <div className="cardname">
                    <p>Total Reviews</p>

                </div>
                <div className="cardsummary">
                    <p>67</p>
                </div>
            </div>
        </div>
        <div className="admin_adduni">
            <h3>Univeristy Requests</h3>
            <div className="admin_unireq">
                <div className="unireq_card">
                    <div className="uni_title">
                        <p>St Johns University, Bangalore</p>
                    </div>
                    <div className="unicard_info">
                        <p>Requested By : Mohammed Sameer</p>
                        <p>Date Requested : 13 March 2022</p>
                    </div>
                    <div className="unireq_buttons">
                        <div className="unireq_accept">
                            <button>Reject</button>

                        </div>
                        <div className="unireq_reject">
                            <button>Accept</button>
                        </div>

            
                    </div>
                </div>
                <div className="unireq_card">
                    <div className="uni_title">
                        <p>Chirst University, Bangalore</p>
                    </div>
                    <div className="unicard_info">
                        <p>Requested By : Jeffin Jose</p>
                        <p>Date Requested : 12 March 2022</p>
                    </div>
                    <div className="unireq_buttons">
                        <div className="unireq_accept">
                            <button>Reject</button>

                        </div>
                        <div className="unireq_reject">
                            <button>Accept</button>
                        </div>

            
                    </div>
                </div>
                <div className="unireq_card">
                    <div className="uni_title">
                        <p>Reva University, Bangalore</p>
                    </div>
                    <div className="unicard_info">
                        <p>Requested By : Alen Jojo</p>
                        <p>Date Requested : 11 March 2022</p>
                    </div>
                    <div className="unireq_buttons">
                        <div className="unireq_accept">
                            <button>Reject</button>

                        </div>
                        <div className="unireq_reject">
                            <button>Accept</button>
                        </div>

            
                    </div>
                </div>
            </div>
            {/* <div className="addUni">
                <p>University Name</p>
                <input type="text" value={uniname} onChange={e=>setUniName(e.target.value)}/>
                <div className="addUni_button">
                    <button onClick={addUni}>Add University</button>
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default AdminDash