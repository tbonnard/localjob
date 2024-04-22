import React from 'react'
import { useDispatch, useSelector  } from 'react-redux'

import { useNavigate } from 'react-router-dom';

import closeIcon from '../../media/close.png'
import homeIcon from '../../media/home.png'

import { resetMapQuery, getMapQueryDataSearchNearLocation } from '../../reducers/mapQueryReducer';
import { resetProperty } from '../../reducers/propertyReducer';
import { resetNearbyProjects } from '../../reducers/allProjectsNearbyPropertiesReducer';
import { resetProjects } from '../../reducers/projectReducer';
import { resetItemToSearch, setItemToSearch } from '../../reducers/searchReducer';
import { setTab } from '../../reducers/tabHomeReducer';

const CloseIcon = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const position = useSelector(state => state.centerPosition)


    const closeLayer = () => {
        // const itemObject = {latitude:position.lat, longitude:position.lng}
        // dispatch(resetMapQuery()).then(dispatch(getMapQueryDataSearchNearLocation(itemObject)))
        // dispatch(resetProperty())
        // dispatch(resetNearbyProjects())
        // dispatch(resetProjects())
        dispatch(setTab(1))
        navigate('/')
    }

    return (
               <img className='closeIcon' 
                    src={homeIcon}  
                    onClick={closeLayer}
                    alt='Fermer - Revenir'
                    title='Fermer - Revenir'
                />
                
    )
}

export default CloseIcon