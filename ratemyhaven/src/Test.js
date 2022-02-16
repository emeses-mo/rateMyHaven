import { db } from "./Firebase";
import React ,{useState,useEffect} from 'react'

import './test.css'

import ReactMapGL from "react-map-gl"


function Test() {

  const [viewport, setViewport]=useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width:window.innerWidth,
    height:window.innerHeight,
    
    zoom: 10
  });

  console.log(viewport)
  return <div className="mapbox">
    <h2>Map</h2>
     <ReactMapGL {...viewport} style={{width: 600, height: 400}}
    mapStyle="mapbox://styles/mapbox/streets-v9" mapboxAccessToken="pk.eyJ1IjoiZW1lc2VzLW1vIiwiYSI6ImNremd3aGRyejAwZmoyb3F1MTUybzhiZGcifQ.gEDe7mISUHA83evvU1gR-g"/>


           
  </div>
}

export default Test;
