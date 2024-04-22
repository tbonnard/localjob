// https://wiki.openstreetmap.org/wiki/Map_features

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


import { Marker, Popup } from 'react-leaflet';

import { setPropertyItem } from '../../reducers/propertyReducer';
import { getProjectsfromProperty } from '../../reducers/projectReducer';

import Follow from '../follow/Follow';

import saveIcon from '../../media/save.png'
import savedIcon from '../../media/saved.png'

import '../../styles/map.css'


const MapMarker = ({icon, markerData}) => {

    
  const dispatch = useDispatch()

  const handleClickMarker = (dataMap) => {
    dispatch(setPropertyItem(dataMap))
    dispatch(getProjectsfromProperty(dataMap))
  }

 
    return (    
      <Marker position={[markerData['lat'], markerData['lon']]} icon={icon} 
      eventHandlers={{
        click: (e) => {
          handleClickMarker(markerData)
        },
      }}
      >
        
        <Popup  className='markerMap'>

              <div className='popUpNameGoIcon'>
                {markerData.name ? 
                <Link to={`/commerce/${markerData.uuid}`} title={markerData.name}>
                  <h3>{markerData.name}</h3> 
                </Link>
                : 
                <Link to={`/commerce/${markerData.uuid}`} title={markerData.display_name}>
                  <h3>{markerData.display_name}</h3>
                </Link>
                }
              </div>
        
          {/* <div className='bottomMarkerActions'>
              <Follow/>
          </div> */}

        </Popup>
        
        

      </Marker>
  )
}

export default MapMarker