// https://react-leaflet.js.org/docs/start-introduction/
// https://blog.logrocket.com/react-leaflet-tutorial/
// https://leafletjs.com/examples/quick-start/
// https://nominatim.openstreetmap.org/search.php?q=query&polygon_geojson=1&format=jsonv2
// https://wiki.openstreetmap.org/wiki/Map_features

import React from 'react';
import {  useSelector } from 'react-redux'

import { MapContainer } from 'react-leaflet';

import '../../styles/map.css'

import LoadingIcon from '../global/LoadingIcon';
import MapOpenMid from './MapOpenMid';

const MapOpen = ({mapQueryData}) => {

  const bounds = useSelector(state => state.bounds)
  //minZoom={13} 
  return (
    <>
    
      <MapContainer className='mapItem' bounds={bounds} key={bounds} scrollWheelZoom={true} >
          
        <LoadingIcon />

        <MapOpenMid mapQueryData={mapQueryData} bounds={bounds} />
    
      </MapContainer>

    </>
      
  )
}

export default MapOpen