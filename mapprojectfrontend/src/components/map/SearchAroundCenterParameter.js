
import React , { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../../reducers/notificationTempReducer';

import { getMapQueryDataAroundSpecificCoordinateParameter } from '../../reducers/mapQueryReducer';


import navigationIcon from '../../media/navigation.png'


const SearchAroundCenterParameter = ({map, bounds}) => {
    
    const dispatch = useDispatch()

    const itemToSearch = useSelector(store => store.searchItem)

    const [itemValue, setItemValue] = useState(itemToSearch)

    const handleClick = () => {
        // removeInputTextContent()
        const coordinates = map.getCenter()
        const bounding = map.getBounds()
        map.setZoom(18);
        if (map.getZoom() >= 12) {
            const itemObject = {coordinates, parameter:itemToSearch}
            console.log(itemObject)
            dispatch(getMapQueryDataAroundSpecificCoordinateParameter(itemObject))
        } else {
            dispatch(setNotification({message:'faire un zoom pour faciliter la recherche dans un rayon de 10km', style:'warning', time:5000}))
        }
     }

    const removeInputTextContent = () => {
        if (document.querySelector('#searchFormInputTextSearchId'))
        {
            let inputTextToReset = document.querySelector('#searchFormInputTextSearchId')
            inputTextToReset.value=''
        }
    } 

    useEffect(() => {
        setItemValue(itemToSearch.substring(0, 9))
    },[itemToSearch])

    useEffect(() => {
    map.fitBounds(bounds);
  }, [map, bounds]);



    return (
        <>
        {itemToSearch.length > 0 && 
            <div className='searchButtonMap'>
                <div className='searchTurboPassButtonDiv'>
                    <button className='searchNearButton' onClick={handleClick}>search "{itemValue}" here</button>
                </div>
            </div>
        }
        </>
        )
    }

export default SearchAroundCenterParameter