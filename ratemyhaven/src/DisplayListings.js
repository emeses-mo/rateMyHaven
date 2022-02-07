import React ,{useEffect, useState} from 'react';
import AccomodationsEmpty from './AccomodationsEmpty';
import { db } from './Firebase';
import  "./DisplayListings.css"
function DisplayListings() {
    const [reviews,setReviews]= useState([])
    const [accomodations,setAccomodations]=useState([])
    const uniSelected = localStorage.getItem('UniversityClicked').replace(/"/g, "")
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

      db.collection(uniSelected).onSnapshot((querySnapshot)=>{
        const acc=[]
        querySnapshot.forEach((doc)=>{
          acc.push(doc.data())
        })
        setAccomodations(acc)
      })
    },[])
    console.log( "len", accomodations)
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
        accomodations.length ==0 ? <AccomodationsEmpty /> : <div className="displayAccListing">
          
          {
            accomodations.map((accomodation)=>(
              <div className="acc_card">
                <div className="acc_image">
                  <img src={accomodation.url} alt="" />
                </div>
                <div className="acc_primary">
                   <h2>{accomodation.Name}</h2>
                   <h3>Type :{accomodation.Type}</h3>
                   <h3>Number Of Rooms : {accomodation.rooms}</h3>
                </div>
               <div className="acc_nav">
                 <button>Locate on the Map</button>
               </div>

              </div>
            ))
          }
        </div>

      }
  </div>;
}

export default DisplayListings;
