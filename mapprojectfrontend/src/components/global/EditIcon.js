import React from 'react'
import { useSelector } from 'react-redux'

import edit from '../../media/edit.png'

const EditIcon = ({ onClick, owner }) => {

    const user = useSelector(state => state.user)

    if (!user) {
        return null
    }

    return (
        <>
        { owner ===user.uuid &&
            <img className='editIcon' 
                src={edit}  
                alt='Éditer'
                title='Éditer'
                onClick={onClick} 
            />
        }
        </>

    )
}

export default EditIcon