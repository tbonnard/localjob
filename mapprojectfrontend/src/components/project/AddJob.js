
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom';

const AddJob = ({cie}) => {
    const navigate = useNavigate();

    const user = useSelector(state => state.user)

    const handleClick = () => {
            navigate('/job')
        }

        if(!user || user.uuid !== cie.owner_uuid) {
            return null
        }

    return (
        <div className='addSuggestionMarkerItem'>
            <button onClick={handleClick} className='MainColor'>ajouter un emploi</button>
        </div>
    )

  
}

export default AddJob