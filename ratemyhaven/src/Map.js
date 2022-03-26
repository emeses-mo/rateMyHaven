import React,{useState} from 'react'
import ReactMapGL from  'react-map-gl'
import    getCenter from 'geolib'
function Map({ results }) {
    
    const coords =results.map(result => ({
        longitude:result.long,
        latitude:result.lat,
    }))
    const center =getCenter(coords  )
    const [viewport ,setViewport]=useState({
        width:'100%',
        height: '100%',
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
    })
  return (
    <ReactMapGL 
    mapStyle='mapbox://styles/emeses-mo/cl0tv3o0r002315pp4gikk953'
    mapboxAccessToken='pk.eyJ1IjoiZW1lc2VzLW1vIiwiYSI6ImNremd3ZWplbTBnOG8yb3BkaGN0d2Y5MmQifQ.AYd77Hwq_LWPUxKnbP9NgA'
    {...viewport}
    onMove={(nvp)=>setViewport(nvp)}
    >

    </ReactMapGL>
  )
}

export default Map