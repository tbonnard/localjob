// https://stackoverflow.com/questions/65119745/get-current-coordinates-on-dragging-react-leaflet
import { useDispatch, useSelector } from 'react-redux'
import React, {  useState, useEffect } from 'react';

import {useMap, useMapEvents } from 'react-leaflet';

import { getMapQueryDataSearchNearLocation } from '../../reducers/mapQueryReducer';
import { setBounds } from '../../reducers/boundsReducer';
import { setPositionCenter } from '../../reducers/centerPositionReducer';
import { resetProperty } from '../../reducers/propertyReducer';
import { resetNotif } from '../../reducers/notificationTempReducer';
import { resetNearbyProjects } from '../../reducers/allProjectsNearbyPropertiesReducer';
import { resetProjects } from '../../reducers/projectReducer';
import { setBoundsPersist } from '../../reducers/boundsPersistReducer';
import { resetItemToSearch } from '../../reducers/searchReducer';

const MapDraggable = () => {

  const dispatch = useDispatch()
  
  const map = useMap()

  const boundsPersist = useSelector(state => state.boundsPersist)
  const searching = useSelector(state => state.searchItem)
  const [movingMap, setMovingMap] = useState(false)

  const triggerMapQueryChange = (boundsToSend) => {
    const itemObject = {ne_lat: boundsToSend._northEast.lat,
      ne_lng: boundsToSend._northEast.lng,
      sw_lat: boundsToSend._southWest.lat,
      sw_lng: boundsToSend._southWest.lng,
    }

    dispatch(getMapQueryDataSearchNearLocation(itemObject))

    // dispatch(setBoundsPersist([[boundsToSend._northEast.lat, boundsToSend._northEast.lng],[boundsToSend._southWest.lat, boundsToSend._southWest.lng]]))
    
    dispatch(resetNotif())
    dispatch(resetProperty())
    dispatch(resetNearbyProjects())
    dispatch(resetProjects())
    setMovingMap(false)
  }

  useMapEvents({
    movestart: () => setMovingMap(true),
    moveend: e => {
      // if (!movingMap && !searching) {
          const boundsToSend = e.target.getBounds();
          const itemObject = {ne_lat: boundsToSend._northEast.lat,
            ne_lng: boundsToSend._northEast.lng,
            sw_lat: boundsToSend._southWest.lat,
            sw_lng: boundsToSend._southWest.lng,
          }
          dispatch(setBounds([[boundsToSend._northEast.lat, boundsToSend._northEast.lng],[boundsToSend._southWest.lat, boundsToSend._southWest.lng]]))
          // }
    },
    zoomlevelschange: e => {
      // dispatch(resetItemToSearch())
      if (!searching) {
        const boundsUpdate = e.target.getBounds();
        triggerMapQueryChange(boundsUpdate);
      }
    },
    zoomend: e => {
      // dispatch(resetItemToSearch())
      if (!searching) {
        const boundsUpdate = e.target.getBounds();
        triggerMapQueryChange(boundsUpdate);
      }
    },
    dragend: e => {
      dispatch(resetItemToSearch())
      if (!searching) {
        dispatch(setPositionCenter(e.target.getCenter()));
        const boundsUpdate = e.target.getBounds();
        triggerMapQueryChange(boundsUpdate);
      }
    },
    click: e => {
      dispatch(resetItemToSearch())
      const boundsUpdate = e.target.getBounds();
      if (!searching) {
        triggerMapQueryChange(boundsUpdate);
        const zoomCurrent = map.getZoom();
        map.flyTo([e.latlng.lat, e.latlng.lng], zoomCurrent);
      }
    }
  });


  useEffect(() => {
    if(!movingMap && boundsPersist) {
      dispatch(setBounds(boundsPersist))
    }
  },[])

  return null;
}

export default MapDraggable