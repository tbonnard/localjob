
import React , { useEffect } from 'react';
import {  useDispatch } from 'react-redux'

import { setNotification } from '../../reducers/notificationTempReducer';

import { getMapQueryDataAroundCenterAll } from '../../reducers/mapQueryReducer';


import navigationIcon from '../../media/navigation.png'


const SearchAroundCenterAll = ({map, bounds}) => {
    
    const dispatch = useDispatch()

    const handleClick = () => {
        // removeInputTextContent()
        const coordinates = map.getCenter()
        const bounding = map.getBounds()
        map.setZoom(18);
        dispatch(getMapQueryDataAroundCenterAll(coordinates))

        // if (map.getZoom() >= 12) {
        //     dispatch(getMapQueryDataAroundCenterAll(coordinates))
        // } else {
        //     dispatch(setNotification({message:'Please zoom in to search within a 10km radius', style:'warning', time:5000}))
        // }
        
     }

    const removeInputTextContent = () => {
        if (document.querySelector('#searchFormInputTextSearchId'))
        {
            let inputTextToReset = document.querySelector('#searchFormInputTextSearchId')
            inputTextToReset.value=''
        }
    } 


    useEffect(() => {
    map.fitBounds(bounds);
  }, [map, bounds]);



    return (
        <div className='searchButtonMap'>
            <div className='searchTurboPassButtonDiv'>
                <button className='searchNearButton' onClick={handleClick}>search any here</button>
            </div>
        </div>
        )
    }

export default SearchAroundCenterAll