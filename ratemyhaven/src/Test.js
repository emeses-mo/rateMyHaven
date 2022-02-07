import { db } from "./Firebase";
import React ,{useState,useEffect} from 'react'
function Test() {
    
  const uniSelected = localStorage.getItem('UniversityClicked').replace(/"/g, "")
  return <div>
      <p>{uniSelected}</p>
       
  </div>
}

export default Test;
