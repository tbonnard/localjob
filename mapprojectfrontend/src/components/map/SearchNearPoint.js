
import React , { useEffect } from 'react';
import {  useDispatch } from 'react-redux'

import { getMapQueryDataSearchNearLocation } from '../../reducers/mapQueryReducer';
import { setNotification } from '../../reducers/notificationTempReducer';


import navigationIcon from '../../media/navigation.png'


const SearchNearPoint = ({map, bounds}) => {
    
    const dispatch = useDispatch()

    const handleClick = () => {
        // removeInputTextContent()
        const coordinates = map.getCenter()

        const itemObject = {latitude:coordinates['lat'], longitude:coordinates['lng']}
        console.log(itemObject)
        dispatch(getMapQueryDataSearchNearLocation(itemObject))

        
        // if (map.getZoom() >= 12) {
        //     const itemObject = {latitude:coordinates['lat'], longitude:coordinates['lng']}
        //     dispatch(getMapQueryDataSearchNearLocation(itemObject))
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
        <div className='searchNearButtonMap'>
            <div className='searchNearButtonDiv'>
                {/* <img className='navigationIcon' src={navigationIcon}/> */}
                <button className='searchNearButton' onClick={handleClick}>search suggestions here</button>
                {/* <button className='searchNearButton' onClick={handleClick}>nearby with suggestions</button> */}
            </div>
        </div>
        )
    }

export default SearchNearPoint