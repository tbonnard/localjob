import React, {  useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { useNavigate } from 'react-router-dom';


import '../../styles/user.css'

import { getMapQueryData } from "../../reducers/mapQueryReducer"
import CompanySearchList from './CompanySearchList';
import CloseIconBack from '../global/CloseIconBack';

const CompanyCreate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(state => state.user)

    const [commerce, setCommerce] = useState([])

        const handleChange = (e) => {
            setCommerce(e.target.value) 
        };
    
        const handleSearchCompany = (e) => {
            e.preventDefault()
            // console.log(commerce)
            dispatch(getMapQueryData(commerce))
        }
    

    const handleClick = () => {
        navigate('/login')
    }

    return (
        <div className='layerDiv'>
            
        <CloseIconBack />

            <div className=''>
                <h2 className='layerTitle'>créer un nouveau commerce</h2>

                {user ? 
                <>
                    <form onSubmit={handleSearchCompany}>
                        <div className='layerFormDiv' >
                            {/* <label>Nom du commerce:</label>
                            <input type="text" className='' name="name" value={formData.name} onChange={handleChange} required />
                    */}
                            {/* <label>Nom - Adresse</label> */}
                            <input type="text" placeholder='entrer un nom de commerce, une adresse' name="address" className='enterTextNumber projectFormInput' value={commerce} onChange={handleChange} required />
                    
                            <button type="submit" className="buttonTier">chercher</button>
                        </div>
                    </form>
                
                    <CompanySearchList />

                </>
                :
                <div className='loginSigninSubLink'>
                    <p>vous devez être connecté pour créer un nouveau commerce</p>
                    <button className="buttonFour loginSigninSubLink" type='submit' onClick={handleClick}>se connecter</button>
                </div>
                }
            </div>


        </div>


    )
}

export default CompanyCreate