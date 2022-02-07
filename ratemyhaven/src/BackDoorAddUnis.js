import React ,{useEffect, useState} from 'react';
import { db } from './Firebase';
import './backdoor.css'

function BackDoorAddUnis() {
    //Service page to populate the database
    const [universityName,setUniversityName] = useState('')
    const [uni,setUni]=useState([])
    const [review,setReview]=useState([])
    useEffect(()=>{
            db.collection("Universities").onSnapshot((querySnapshot)=>{
                const u=[]
                querySnapshot.forEach((doc)=>{
                    u.push(doc.data())
                })
                setUni(u)
            })
            db.collection("Reviews").doc("Uni1").collection("review").onSnapshot((querySnapshot)=>{
                const r=[]
                querySnapshot.forEach((doc)=>{
                    r.push(doc.data())
                })
                setReview(r)
            })
            console.log(uni)
    },[])

    const addUni=(e)=>{
        e.preventDefault()
        if(uni.indexOf(universityName)>-1){
            alert("University Exists in the Database")
            console.log("UniExists")
        }
        else{
            db.collection("Universities").doc(universityName).set({
                Name: universityName,
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
        
    }

  return <div className='addunis'>
     
        <div className="backdoor-form">
        <form action="">
           <p>Enter `UniversityName` in this format "Name,Location" Eg:"Christ University,Bangalore"</p>
           <div className="form-input">
           <input type="text" placeholder='University Name Goes here...' value={universityName} onChange={e=>setUniversityName(e.target.value)} />
      <button type='submit' onClick={addUni}>Add</button>
           </div>
     
      </form>
        </div>
      <div className="unisPresent">
          <p>Universities Added:</p>
            {
                uni.map((university)=>(
                    <div className="universities">
                        <h3>{university.Name}</h3>
                    </div>
                ))
            }
      </div>
      <div className="testreview">
          <h1>TestReview</h1>
          {
                review.map((rev)=>(
                    <div className="revs">
                        <h1>{rev.Namme}</h1>
                        <h2>{rev.Review}</h2>
                    </div>
                ))
          }
      </div>
     
  </div>;
}

export default BackDoorAddUnis;
