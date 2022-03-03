import { db } from "./Firebase";
import React ,{useState,useEffect} from 'react'

import './test.css'

import Sentiment from 'sentiment'
var sentiment = new Sentiment();




function Test() {
const [res,setRes]=useState('')
 
  
 const calc =()=>{
  const result = sentiment.analyze('Apartment is very bad');
  console.log("result: ",result.score)
 setRes(result.score)
 }
  return <div className="mapbox">
    <h1>Sentiment Test</h1>
           <h3>Sentiment Score : {res}</h3>
           <button onClick={calc}>cal</button>
  </div>
}

export default Test;
