
import React, {  useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import '../../styles/searchForm.css'

import { getMapQueryDataParameter } from '../../reducers/mapQueryReducer';
import { setItemToSearch, resetItemToSearch} from '../../reducers/searchReducer';
import {setTab} from '../../reducers/tabHomeReducer';
import { resetNotif } from '../../reducers/notificationTempReducer';
import { resetProjects } from '../../reducers/projectReducer';
import { resetProperty } from '../../reducers/propertyReducer';
import { resetNearbyProjects } from '../../reducers/allProjectsNearbyPropertiesReducer';
import { getMapQueryDataSearchNearLocation } from '../../reducers/mapQueryReducer';

import cancelIcon from '../../media/remove_input.png'
import searchIcon from "../../media/search.png"
import informationIcon from '../../media/information.png'
import Menu from '../global/Menu';

const SearchForm = () => {
    
  const dispatch = useDispatch()


  const [placeAddress, setPlaceAddress] = useState('')
  const bounds = useSelector(state => state.bounds)


  const handleChange = (e) => {
    setPlaceAddress(e.target.value)
    dispatch(setItemToSearch(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
        
    dispatch(resetNotif())
    dispatch(resetProperty())
    dispatch(resetNearbyProjects())
    dispatch(resetProjects())

    dispatch(setTab(1))
    dispatch(getMapQueryDataParameter(placeAddress))
    dispatch(setItemToSearch(placeAddress))
  }

  const closeLayer = () => {
    dispatch(resetItemToSearch())
    setPlaceAddress('')
    const itemObject = {ne_lat: bounds[0][0],
      ne_lng: bounds[0][1],
      sw_lat: bounds[1][0],
      sw_lng: bounds[1][1],
    }
    console.log(itemObject)
    dispatch(getMapQueryDataSearchNearLocation(itemObject))
  }

  return (
    <div className="uploadGlobalForm">
        <form onSubmit={handleSubmit} className='enterTextForm searchInput'>
         
         <div className='inputSearchFormCancelDiv'>
            <input id='searchFormInputTextSearchId' className="enterTextNumber searchInputInput" type="text" placeholder='rechercher un commerce' value={placeAddress} onChange={(e) => handleChange(e)} required/>
            
            {placeAddress && 
              <img src={cancelIcon} className='cancelIcon' onClick={closeLayer}
                      alt='enlever le contenu'
                      title='enlever le contenu'/>
            }

          <img className='searchIcon'
                    src={searchIcon}  
                    alt='Rechercher'
                    title='Rechercher'
                    onClick={handleSubmit}
                />

        </div>

        <button className="buttonSearch" type='submit'>rechercher</button>
            
        
  
  
        </form>
        <Menu />
    </div>
  )
}

export default SearchForm