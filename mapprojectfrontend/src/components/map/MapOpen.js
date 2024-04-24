// https://react-leaflet.js.org/docs/start-introduction/
// https://blog.logrocket.com/react-leaflet-tutorial/
// https://leafletjs.com/examples/quick-start/
// https://nominatim.openstreetmap.org/search.php?q=query&polygon_geojson=1&format=jsonv2
// https://wiki.openstreetmap.org/wiki/Map_features

import React from 'react';
import {  useSelector } from 'react-redux'

import { MapContainer, TileLayer } from 'react-leaflet';

import '../../styles/map.css'

import LoadingIcon from '../global/LoadingIcon';
import MapDraggable from './MapDraggable';
import Legend from './Legend';
import MapMarkers from './MapMarkers';

const MapOpen = ({mapQueryData}) => {

  const bounds = useSelector(state => state.bounds)
  //minZoom={13} 
  
  return (
    <>
    
      <MapContainer className='mapItem' bounds={bounds} key={bounds} scrollWheelZoom={true} >
          
        <LoadingIcon />

        <MapDraggable />

        <Legend />

        <MapMarkers mapQueryData={mapQueryData}/>
            
        <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors - <a href="https://www.openstreetmap.org/copyright">"ODbL" 1.0</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

        <TileLayer 
                attribution='CartoDB.Voyager'
                url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
            />
    
      </MapContainer>

    </>
      
  )
}

export default MapOpen