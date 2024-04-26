import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

import { getProjectsfromPropertyActiveOrNot } from '../../reducers/cieProjectReducer';

import profileImage from '../../media/profile/companyprofile.png'

import Follow from '../follow/Follow'
import ProjectsList from '../project/ProjectsList'
import AddJob from '../project/AddJob';
import EditIcon from '../global/EditIcon';
import CompanyEdit from './CompanyEdit';
import urlIcon from "../../media/url.png"

const CompanyProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cie = useSelector(state => state.property)
    const user = useSelector(state => state.user)

    const [modalEnabled, setModalEnabled] = useState(false)


    const handleEdit = () => {
        setModalEnabled(true)
    };

    useEffect(() => {
        if(cie.id) {
            // console.log({cie, user})
            dispatch(getProjectsfromPropertyActiveOrNot({cie, user}))
        } 
    },[cie, dispatch])

 
    return (
    <div className='accountDetailsGlobalMaster'>

            {modalEnabled && <CompanyEdit functionClick={setModalEnabled} property={cie} /> }
        
        <div className='accountDetailsGlobalTop commerceColor'>
            <p className='accountDetailsGlobalTopText commerceColor'>COMMERCE</p>
        </div>

        <div className='accountDetailsGlobal accountDetailsGlobalTopMargin'>
            <div className='accountDetailsTop'>
                <img className='profilImage' src={profileImage}  alt="profil" title="profil"/>
                <Follow />
            </div>
            <div className='accountDetailsMid'>
                <EditIcon onClick={handleEdit} owner={cie.owner_uuid} />
                <p className='labelText'>Nom</p>
                <p className='detailText'>{cie.name}</p>
                <p className='labelText'>Adresse</p>
                <p className='detailText'>{cie.house_number} {cie.road} {cie.city} {cie.postcode} {cie.state} {cie.country}</p>
                <p className='labelText'>URL</p>
                <Link to={cie.url} target='_blank' >
                    <img  className='profileIcon'
                        src={urlIcon}  
                        alt='Site web du commerce'
                    />
                </Link>
                {/* <p className='detailText'><a className='urlCie' target='_blank' href={cie.url}>{cie.url}</a></p> */}
            </div>
            <div className='accountDetailsMid'>
                <EditIcon onClick={handleEdit} owner={cie.owner_uuid} />
                <p className='labelTextTitle'>Description</p>
                <p>{cie.description}</p>
            </div>
            <div className='accountDetailsMid'>
                <EditIcon onClick={handleEdit} owner={cie.owner_uuid} />
                <p className='labelTextTitle'>Statut</p>
                {cie.active ? <p className='infoTag infoTagSuccess'>actif</p> : <p className='infoTag infoTagError'>non actif</p> }
            </div>
        </div>
        <div className='accountDetailsGlobal accountDetailsGlobalTopMarginNext'>
            <div className='tabs'>
                <div className='tab'>
                    <h3 className="tabTitle tabSelected">Emplois</h3>
                    <ProjectsList />
                    <AddJob cie={cie}/>
                </div>
            </div>
        </div>
           
    </div>

    )
}

export default CompanyProfile