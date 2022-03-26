import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import logo from "./Images/log.svg"
import ReactMapGL ,{Marker  }  from  'react-map-gl'
import getCenter from "geolib/es/getCenter";
import { useStateValue } from './StateProvider'
import {auth, db } from './Firebase';
import Map from  './Map.js'
import pin from './Images/pin.png'
import './DisplayNew.css'
function DisplayNew() {
    const [{ user },dispatch]= useStateValue();
    const [coordis,setCoords]= useState([])
    const [accomodations,setAccomodations]=useState([])
    const [aptCheck,setAptCheck]= useState(false)
    const [hostelcheck,sethosteCheck]= useState(false)
    const [pgCheck,setpgCheck]= useState(false)
    const [selected,setSelected]=useState('')
    const uniSelected = localStorage.getItem('UniversityClicked').replace(/"/g, "")
    const [center,setCenter]=useState([])
    const [lats,setLats]=useState('')
    const [longs,setLongs]=useState('')
    const test =()=>{
        db.collection(uniSelected).where("Type","==",selected).onSnapshot((querySnapshot)=>{
            const acc=[]
            querySnapshot.forEach((doc)=>{
              acc.push(doc.data())
            })
            setAccomodations(acc)
        })
    }
 

    const coords =accomodations.map(result => ({
        longitude:result.long,
        latitude:result.lat,
    }))
    const cent= getCenter(coords)
    console.log(cent.longitude)
    
        
    const [viewport ,setViewport]=useState({
        width:'100%',
        height: '100%',
        longitude: 77.6065096   ,
        latitude: 12.9330899,
        zoom: 16
    })


    useEffect(()=>{
        db.collection(uniSelected).onSnapshot((querySnapshot)=>{
            const acc=[]
            querySnapshot.forEach((doc)=>{
              acc.push(doc.data())
            })
            setAccomodations(acc)
          })
          
          
    },[])
    const setAccomodation=(name)=>{
        
        localStorage.setItem("Accomodation",JSON.stringify(name))
      }
    console.log("c",center)
    const findLoc=(id)=>{
        console.log("hello",id)
        db.collection(uniSelected).where("id","==",id).onSnapshot((querySnapshot)=>{
            const lc=[]
            querySnapshot.forEach((doc)=>{
              lc.push(doc.data())
            })
              setCoords(lc)
          })
          coordis.map((c)=>{
            setLats(c.lat)
            setLongs(c.long)
             setViewport({
               latitude:c.lat,
               longitude:c.long
             })

          })
    }
    
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
                    <div className="ndf_opts" onChange={e=>setSelected(e.target.value)}>
                       
                        <div className="ndf_opt">
                            <label htmlFor="">Apartment</label>
                            <input type="radio" value='apartment' name="category" id="apartment"  />
                        </div>
                        <div className="ndf_opt">
                            <label htmlFor="">Hostel</label>
                            <input type="radio" value='hostel'  name="category" id="" />
                        </div>
                        <div className="ndf_opt">
                            <label htmlFor="">Paying Guest</label>
                            <input type="radio"  value='pg' name="category" id="" />
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
                    <button onClick={test}>Apply Filter</button>
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
                            <div className="ndr_card" id={accommodation.id}>
                            <div className="ndrc_img">
                                <img src={accommodation.url} alt="" />
    
                            </div>
                            <div className="ndrc_info">
                                <div className="ndrc_primary">
                                    <h3 onClick={e=>setAccomodation(accommodation.Name)}> <Link className='nodec' to='/accomodation-reviews'>{accommodation.Name}</Link> </h3>
                                    <p>{accommodation.Type}</p>
                                </div>
                                <div className="ndrc_secondary">
                                    <p>{accommodation.desc}</p>
                                </div>
                                <div className="ndrc_extras" onClick={()=>findLoc(accommodation.id)}>
                                    <img src={pin} alt="" />
                                </div>
                            </div>
                        </div>
                        ))
                    }
                   
                </div>
            </div>
            <div className="nd_map">
                        {/* <Map results ={accomodations}/> */}
                        <ReactMapGL 
    mapStyle='mapbox://styles/emeses-mo/cl0ui2y2i000216l8vk3owzlk'
    mapboxAccessToken='pk.eyJ1IjoiZW1lc2VzLW1vIiwiYSI6ImNremd3ZWplbTBnOG8yb3BkaGN0d2Y5MmQifQ.AYd77Hwq_LWPUxKnbP9NgA'
    {...viewport}
    onMove={(nvp)=>setViewport(nvp)}
    >   
    {
        accomodations.map((marker)=>(
            <Marker key={marker.id} latitude={marker.lat} longitude={marker.long} >
                <div className="map_marker">
                    <img src={pin} alt="" />
                </div>

        </Marker>
        ))
    }
        

    </ReactMapGL>
            </div>
        </div>
    </div>
  )
}

export default DisplayNew