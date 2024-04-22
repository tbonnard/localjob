import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { getPropertyDetails } from '../../reducers/propertyReducer';

import '../../styles/company.css'
import '../../styles/user.css'

import CloseIcon from '../global/CloseIcon';
import CompanyProfile from "./CompanyProfile"
import CloseIconBack from '../global/CloseIconBack';
import MenuInside from '../global/MenuInside';


const Company = () => {
    let { uuid } = useParams(); 
    const dispatch = useDispatch()
    
    useEffect(() => {
          dispatch(getPropertyDetails(uuid))
      },[uuid, dispatch])
  
    return (

        <>
        <MenuInside />
                   
        <div className='layerGlobal'>

            {/* <CloseIcon /> */}
            {/* <CloseIconBack /> */}

            <CompanyProfile />

         </div>
 
         </>
    )
}

export default Company