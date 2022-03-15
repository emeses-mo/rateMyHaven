import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import logo from "./Images/log.svg"
import { useStateValue } from './StateProvider'
import {auth, db } from './Firebase';
import './DisplayNew.css'
function DisplayNew() {
    const [{ user },dispatch]= useStateValue();
    const [accomodations,setAccomodations]=useState([])
    const uniSelected = localStorage.getItem('UniversityClicked').replace(/"/g, "")

    useEffect(()=>{
        db.collection(uniSelected).onSnapshot((querySnapshot)=>{
            const acc=[]
            querySnapshot.forEach((doc)=>{
              acc.push(doc.data())
            })
            setAccomodations(acc)
          })
    },[])
  return (
    <div className='nd_main'>
        <div className="ar_header">
            <div className="ar_uni">
                <h1>{uniSelected}</h1>
            </div>
            <div className="ar_logo">
               <Link to="/"><img src={logo} alt="" /></Link> 
            </div>
        </div>
        <div className="nd_wrapper">
            
            <div className="nd_filter">
                <div className="ndf_section">
                    <div className="ndf_head">
                    <h2>Category</h2>
                    </div>
                    <div className="ndf_opts">
                        <div className="ndf_opt">
                            <label htmlFor="">Apartment</label>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <div className="ndf_opt">
                            <label htmlFor="">Hostel</label>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <div className="ndf_opt">
                            <label htmlFor="">Paying Guest</label>
                            <input type="checkbox" name="" id="" />
                        </div>
                    </div>
                </div>
                <div className="ndf_section">
                    <div className="ndf_head">
                    <h2>Rooms</h2>
                    </div>
                    <div className="ndf_opts">
                        <div className="ndf_opt">
                            <label htmlFor="">Single Room</label>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <div className="ndf_opt">
                            <label htmlFor="">Double Room</label>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <div className="ndf_opt">
                            <label htmlFor="">Triple Room</label>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <div className="ndf_opt">
                            <label htmlFor="">Four Room</label>
                            <input type="checkbox" name="" id="" />
                        </div>
                    </div>
                </div>
                <div className="ndf_final">
                     <div className="ndf_apply">
                    <button>Apply Filter</button>
                </div>
                <div className="ndf_addAcc">
                    <h3>Cant find your accommodation?{user ? <Link to="/add-accomodation" className='nodec spl' >Add it now!</Link> : <Link to='/user-login' className='nodec spl'>Add it now!</Link> }</h3>
                </div>
                </div>
               
                
                
            </div>
            <div className="nd_results">
                <div className="ndr_container">
                    {
                        accomodations.map((accommodation)=>(
                            <div className="ndr_card">
                            <div className="ndrc_img">
                                <img src={accommodation.url} alt="" />
    
                            </div>
                            <div className="ndrc_info">
                                <div className="ndrc_primary">
                                    <h3>{accommodation.Name}</h3>
                                    <p>{accommodation.Type}</p>
                                </div>
                                <div className="ndrc_secondary">
                                    <p>{accommodation.desc}</p>
                                </div>
                            </div>
                        </div>
                        ))
                    }
                   
                </div>
            </div>
            <div className="nd_map">
1
            </div>
        </div>
    </div>
  )
}

export default DisplayNew