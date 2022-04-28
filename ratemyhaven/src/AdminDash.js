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
                    <p>Card Title</p>

                </div>
                <div className="cardsummary">
                    <p>12</p>
                </div>
            </div>
            <div className="dash_card">
                <div className="cardname">
                    <p>Card Title</p>

                </div>
                <div className="cardsummary">
                    <p>12</p>
                </div>
            </div>
        </div>
        <div className="admin_adduni">
            <div className="addUni">
                <p>University Name</p>
                <input type="text" value={uniname} onChange={e=>setUniName(e.target.value)}/>
                <div className="addUni_button">
                    <button onClick={addUni}>Add University</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDash