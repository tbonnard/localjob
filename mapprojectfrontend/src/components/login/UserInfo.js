import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


import CloseIcon from '../global/CloseIcon';

import '../../styles/user.css'
import AccountDetails from './AccountDetails';
import MenuInsideHome from '../global/MenuInsideHome';


const UserInfo = () => {
    const navigate = useNavigate();

    const user = useSelector(state => state.user)
    
    useEffect(() => {
        if(!user) {
            navigate('/login')     
        }
    },[user])

    if (!user) {
        return null
    }

    return (
        
        <>
        <MenuInsideHome />
        
        <div className='layerGlobal'>

            {/* <CloseIcon /> */}

            <AccountDetails />

       </div>
       </>
    )
}

export default UserInfo