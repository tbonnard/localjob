import React from 'react'

import closeIcon from '../../media/close.png'

const CloseIconBackModal = ({ onClick }) => {

    return (
               <img className='closeIcon' 
                    src={closeIcon}  
                    onClick={onClick}
                    alt='Fermer - Revenir'
                    title='Fermer - Revenir'
                />
    )
}

export default CloseIconBackModal