// https://react-leaflet.js.org/docs/start-introduction/
// https://blog.logrocket.com/react-leaflet-tutorial/
// https://leafletjs.com/examples/quick-start/
// https://nominatim.openstreetmap.org/search.php?q=query&polygon_geojson=1&format=jsonv2
// https://wiki.openstreetmap.org/wiki/Map_features

import React, { useEffect } from 'react';
import {  useSelector, useDispatch } from 'react-redux'

import { MapContainer, TileLayer } from 'react-leaflet';

import '../../styles/map.css'

import LoadingIcon from '../global/LoadingIcon';
import MapDraggable from './MapDraggable';
import Legend from './Legend';
import MapMarkers from './MapMarkers';
import FollowItemsProjects from '../follow/FollowItemsProjects';
import CurrentLocation from './CurrentLocation';



const Map = () => {
  const dispatch = useDispatch()

  const mapQueryData = useSelector(state => state.mapQuery)
  const bounds = useSelector(state => state.bounds)
  const centerPosition = useSelector(state => state.centerPosition)
  const firstTimeCurrentLoc = useSelector(store => store.firstTimeCurrentLoc)


  return (
    <div className='divSearchMap'>
    
      <div className='mapGlobal' id='map' >
        <MapContainer className='mapItem' bounds={bounds} key={bounds} scrollWheelZoom={true} >
  
          {firstTimeCurrentLoc && 
            <CurrentLocation bounds ={bounds} />
          }

          <LoadingIcon />

          <MapDraggable  /> 

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
      </div>


      <div className='feedsHome'>
          <FollowItemsProjects />
      </div>   


    </div>
      
  )
}

export default Map