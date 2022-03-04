import React ,{useEffect, useState} from 'react';
import AccomodationsEmpty from './AccomodationsEmpty';
import {auth, db } from './Firebase';
import  "./DisplayListings.css"
import { Link } from 'react-router-dom';
import getCenter from "geolib/es/getCenter";
import pin from './Images/pin.png'
import { useStateValue } from './StateProvider'
import ReactMapGL ,{Marker ,Map } from 'react-map-gl'
import mapboxgl from "mapbox-gl"; 
// @ts-ignore

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

function DisplayListings() {
  

    const [reviews,setReviews]= useState([])
    const [accomodations,setAccomodations]=useState([])
    const [coords,setCoords]= useState([])
    const [lats,setLats]=useState('')
    const [longs,setLongs]=useState('')
    const uniSelected = localStorage.getItem('UniversityClicked').replace(/"/g, "")
    const [aptCheck,setAptCheck]= useState(false)
    const [hostelcheck,sethosteCheck]= useState(false)
    const [pgCheck,setpgCheck]= useState(false)
    const [{ user },dispatch]= useStateValue();
   const setFilter= ()=>{
      if(aptCheck == true)
      {
        db.collection(uniSelected).where("Type","==","apartment").onSnapshot((querySnapshot)=>{
          const acc=[]
          querySnapshot.forEach((doc)=>{
            acc.push(doc.data())
          })
          setAccomodations(acc)
          console.log("apt Checked =",aptCheck)
        })
      }
      else if(hostelcheck == true)
      {
        db.collection(uniSelected).where("Type","==","hostel").onSnapshot((querySnapshot)=>{
          const acc=[]
          querySnapshot.forEach((doc)=>{
            acc.push(doc.data())
          })
          setAccomodations(acc)
          console.log("apt Checked =",aptCheck)
        })
      }
      else if(pgCheck ==  true){
        db.collection(uniSelected).where("Type","==","pg").onSnapshot((querySnapshot)=>{
          const acc=[]
          querySnapshot.forEach((doc)=>{
            acc.push(doc.data())
          })
          setAccomodations(acc)
          console.log("apt Checked =",aptCheck)
        })

      }
   
      else{
        db.collection(uniSelected).onSnapshot((querySnapshot)=>{
          const acc=[]
          querySnapshot.forEach((doc)=>{
            acc.push(doc.data())
          })
          setAccomodations(acc)
        })
      }
   }
    useEffect(()=>{
        // db.collection("Reviews").doc(uniSelected).collection("review").onSnapshot((querySnapshot)=>{
        //     const r=[]
        //     querySnapshot.forEach((doc)=>{
        //         r.push(doc.data())
        //     })
        //     setReviews(r)
        // })
        //db.collection("Accomodations").doc(uniSelected).listCollections().then
      //  db.collection("Accomodations").doc(uniSelected).listCollections().then(snapshot=>{
      //    const a=[]
      //    snapshot.forEach(snap=>{
      //      a.push(snap)
      //    })
      //    setAccomodations(a)
      //  })

        if(aptCheck === true){
          
        }
        else{
           db.collection(uniSelected).onSnapshot((querySnapshot)=>{
        const acc=[]
        querySnapshot.forEach((doc)=>{
          acc.push(doc.data())
        })
        setAccomodations(acc)
      })
        }
     
      auth.onAuthStateChanged((authUser)=>{
        console.log("user here issss>.",authUser)
    })
      
    },[])
    console.log( "len", accomodations)
    function locate(id){
      db.collection(uniSelected).where("id","==",id).onSnapshot((querySnapshot)=>{
        const lc=[]
        querySnapshot.forEach((doc)=>{
          lc.push(doc.data())
        })
          setCoords(lc)
      })
      coords.map((c)=>{
        console.log("lnl>",c.lat,c.long)
        setLats(c.lat)
        setLongs(c.long)
         setViewport({
           latitude:c.lat,
           longitude:c.long
         })
      })

     
    }
    const [viewport, setViewport]=useState({
      latitude: lats,
      longitude: longs,
      
      zoom: 15
    });
    console.log('VP>',viewport)
    console.log("lats",lats)
    console.log("long",longs)
       const coordis= accomodations.map((res)=>({
         longitude:res.long,
         latitude:res.lat,
       }))
       const center =getCenter(coordis)
       
       console.log("center>",center)
       


    console.log("Coordinates: ",coords)
   
    const setAccomodation=(name)=>{
      console.log(name)
      localStorage.setItem("Accomodation",JSON.stringify(name))
    }
    
  return <div className='dl_main'>
    <div className="dl_uniheading">
       <h1>{uniSelected}</h1>
    </div>
   
      {
        //   reviews.map((review)=>(
        //       <div className="accomodation_display">
        //           <h1>{review.Comment}</h1>
        //       </div>
        //    ))
        accomodations.length ==0 ? <AccomodationsEmpty /> : <div className="dl_wrapper">
          <div className="displayAccListing">
            <div className="dl_filter">
              <h2>Filter Your Results</h2>
              <div className="filter_chk">
               
              <input type="checkbox" name="Apartment" id="" checked={aptCheck} onChange={e=>setAptCheck(!aptCheck)} /> <span className='checkMark'></span> <p>Apartment</p>
              </div>
              <div className="filter_chk">
               
              <input type="checkbox" name="hostel" id="" checked={hostelcheck} onChange={e=>sethosteCheck(!hostelcheck)} /> <span className='checkMark'></span> <p>Hostel</p>
              </div>
              <div className="filter_chk">
               
              <input type="checkbox" name="pg" id="" checked={pgCheck} onChange={e=>setpgCheck(!pgCheck)} /><span className='checkMark'></span> <p>Paying Guest</p>
              </div>
              <div className="filter_button">
                 <button onClick={setFilter}>Filter Results</button >
              </div>
             
            </div>
          <div className="dl_content">
     
     
          {
            accomodations.map((accomodation)=>(
              <div className="acc_card" id={accomodation.id}>
                <div className="acc_image">
                  <img src={accomodation.url} alt="" />
                </div>
                <div className="acc_primary">
                   <h2 onClick={e=>setAccomodation(accomodation.Name)}><Link to="/accomodation-reviews">{accomodation.Name}</Link> </h2>
                   <h3>Type :{accomodation.Type}</h3>
                   <h3>Number Of Rooms : {accomodation.rooms}</h3>
                </div>
               <div className="acc_nav">
                 <button onClick={()=>locate(accomodation.id)}>Locate on the Map</button>
               </div>

              </div>
            ))
          }
          </div>
          <div className="map">
            {/* <WrappedMap  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBg-q-sIfGZ9dVmNzg1v6iqaaJKrKCQjMg`}
            loadingElement={<div style={{height:'100%'}} />}
            containerElement={<div style={{height:'100%'}} />}
            mapElement={<div style={{height:'100%'}} />}
            
            /> */}
            <ReactMapGL {...viewport} style={{width: 600, height: 400}}
    mapStyle="mapbox://styles/mapbox/streets-v9"    mapboxAccessToken="pk.eyJ1IjoiZW1lc2VzLW1vIiwiYSI6ImNrenMwcWhsYzBscHEzMHBhYzhpdHB6eWcifQ.vywsREJh34rnJ1x-W1wW9A" onMove={(vp)=>{
      setViewport(vp)
      
    }}   > 
    {
      accomodations.map((mrk)=>(
        <Marker key={mrk.id} latitude={mrk.lat} longitude={mrk.long} >
          <div className="map_marker">
             <button><img src={pin} /></button>
          </div>
         
        </Marker>
      ))
    }
    </ReactMapGL>
          </div>
          
        </div>
        <div className="dl_addacc">
          <h3>Cant find your accomodation? {user ? <Link to="/add-accomodation" className='nodec'>Add it now!</Link> : <Link to='/user-login'>Login to add a new accomodation!</Link> } </h3>
        </div>
        </div>
         

      }
  </div>;
}

export default DisplayListings;
