import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import '../../styles/user.css'

import {propertyCreation} from "../../reducers/propertyReducer"
import { getNewCreatedMapQuery } from '../../reducers/mapQueryReducer';


const CompanySearchList = (prop) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const mapQuery = useSelector(state => state.mapQuery)

    const user = useSelector(state => state.user)

    const [selectedCommerce, setSelectedCommerce] = useState(null)
    const [selectedCommerceData, setSelectedCommerceData] = useState(null)

    const handleChangeRadioButton = (ind) => {
        setSelectedCommerceData(null)
        setSelectedCommerce(ind)
        setSelectedCommerceData(mapQuery[ind])
    };

    const handleCreateCompany = (e) => {
        e.preventDefault()
        // console.log(selectedCommerceData)
        const newProperty = {property: selectedCommerceData, user:user}
        dispatch(propertyCreation(newProperty)).then((createdItemUUID) => {
            // Utilisation de l'ID créé pour naviguer
            navigate(`/commerce/${createdItemUUID}`);
        });
    }
    
       
    useEffect(() => {
        if(mapQuery.length ===1) {
            setSelectedCommerce(0)
            setSelectedCommerceData(mapQuery[0])    
        }
    },[mapQuery])


    return (
        <div>
     
            <form onSubmit={handleCreateCompany}>
                <div className='commerceSearchList'>
                    {mapQuery.map((address, ind) => 
                    <fieldset key={ind}>
                        <legend>{address.name}</legend>
                            <div >                                       
                                <input type="radio" id={ind} name={ind} checked={selectedCommerce === ind} value={ind} onChange={() => handleChangeRadioButton(ind)}/>
                                <label htmlFor={ind}>{address.display_name}</label>
                            </div>
                    </fieldset>
                )}
     
                 </div>
                 {selectedCommerceData && <button type="submit" className="buttonFour">créer</button>}
                 
            </form>
        </div>


    )
}

export default CompanySearchList

