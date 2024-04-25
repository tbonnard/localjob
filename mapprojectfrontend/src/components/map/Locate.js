
import React, { useState } from 'react';
import {  useSelector, useDispatch } from 'react-redux'

import locateIcon from '../../media/locate.png'

import { getMapQueryDataSearchNearLocation } from '../../reducers/mapQueryReducer';
import { setBounds } from '../../reducers/boundsReducer';

const Locate = () => {

    const dispatch = useDispatch()
    const boundsGeolocStart = useSelector(state => state.boundsGeolocStart)

    const handleClick = () => {
        dispatch(getMapQueryDataSearchNearLocation(boundsGeolocStart))
        const newBoundsToSet = [[boundsGeolocStart.ne_lat, boundsGeolocStart.ne_lng],[boundsGeolocStart.sw_lat,boundsGeolocStart.sw_lng]]
        dispatch(setBounds(newBoundsToSet))
    }

    if (!boundsGeolocStart) return null;

    return (
        <div className='locateIcon'>
            <img 
                src={locateIcon}  
                alt='Accueil'
                onClick={handleClick}
            />
        </div>
         
          
      )
}

export default Locate