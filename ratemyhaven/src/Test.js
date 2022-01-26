import { db } from "./Firebase";
import React ,{useState,useEffect} from 'react'
function Test() {
    const [uniNames,setUninames] = useState([])
  useEffect(()=>{
    db.collection("Universities").onSnapshot((querySnapshot)=>{
      const uniData=[]
      querySnapshot.forEach((doc)=>{
        uniData.push(doc.data())
      })
setUninames(uniData)
    })
  },[])
console.log(uniNames)
  return <div>
      
       <div className="searchResult">
           
          {
              uniNames.map((uname)=>(
                <div className="resultBox" key={uname.id}>
                  <p>{uname.Name} </p>
                </div>
              ))
          }
        </div>
  </div>;
}

export default Test;
