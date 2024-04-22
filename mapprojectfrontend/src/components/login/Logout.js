import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../../reducers/userReducer'


import '../../styles/user.css'


const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const user = useSelector(state => state.user)

    const handleLogout= ()=>{
        dispatch(logoutUser())
    }
    
    useEffect(() => {
        if(!user) {
            navigate('/login')     
        }
    },[user])

    if (!user) {
        return null
    }

    return (
            <div className='logoutDiv'>
                <button className='' onClick={handleLogout}>se déconnecter</button> 
            </div>
    )
}

export default Logout