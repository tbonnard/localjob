import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

import Logout from './Logout';
import { getPropertyOwner } from '../../reducers/userPropertyReducer';

import profileImage from '../../media/profile/profile.png'


import '../../styles/user.css'

import FollowGlobal from '../follow/FollowGlobal';
import { resetMapQuery } from '../../reducers/mapQueryReducer';
import EditIcon from '../global/EditIcon';
import AccountDetailsEdit from './AccountDetailsEdit';


const AccountDetails = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const user = useSelector(state => state.user)
    const userCie = useSelector(state => state.userProperty)

    const [modalEnabled, setModalEnabled] = useState(false)

    const handleNewCompany = () => {
        dispatch(resetMapQuery())
        navigate('/create')    
    }

    const handleEdit = () => {
        setModalEnabled(true)
    };

    useEffect(() => {
        if(!user) {
            navigate('/login')     
        } else {
            dispatch(getPropertyOwner(user.uuid))
        }
        
    },[user])

    if (!user) {
        return null
    }

    return (
        <div className='accountDetailsGlobalMaster'>

            {modalEnabled && <AccountDetailsEdit functionClick={setModalEnabled} user={user} /> }

            <div className='accountDetailsGlobalTop'>
                <p className='accountDetailsGlobalTopText'>Mon Profil</p>
            </div>

            <div className='accountDetailsGlobal'>
                <div className='accountDetailsTop'>
                    <img  src={profileImage}  alt="profile" title="profile"/>
                </div>
                <div className='accountDetailsMid'>
                    
                    <EditIcon onClick={handleEdit} owner={user.uuid}/>

                    <p className='labelText'>Courriel</p>
                    <p className='detailText'>{user.email}</p>
                    <p className='labelText'>Mot de passe</p>
                    <p className='detailText'>********</p>
                </div>
                <div className='accountDetailsMid'>
                    <p className='labelTextTitle'>Commerce</p>
                    {userCie.map((cieDetails, ind) => <p key={cieDetails.uuid}><Link className='' to={`/commerce/${cieDetails.uuid}`} title={cieDetails.name}>{cieDetails.name}</Link></p>)}
                    
                    <div className='newCompanyDiv'>
                        <button className='' onClick={handleNewCompany}>+ nouveau commerce</button> 
                    </div>
                </div>
                <div className='accountDetailsMid'>
                    <p className='labelTextTitle'>Statut</p>
                    <p className='labelText'>Courriel confirmé</p>
                    {user.email_confirmed ? <p className='infoTag infoTagSuccess'>confirmé</p> : <p className='infoTag infoTagError'>non confirmé</p> }
                    <Logout />
                </div>
            </div>
            <div className='accountDetailsGlobal'>
                <FollowGlobal />
            </div>
               
        </div>
    )
}

export default AccountDetails