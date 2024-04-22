import React from 'react'

import closeIcon from '../../media/close.png'

const CloseIconBack = () => {

    const closeLayer = () => {
        window.history.back()        
    }


    return (
               <img className='closeIcon' 
                    src={closeIcon}  
                    onClick={closeLayer}
                    alt='Fermer - Revenir'
                    title='Fermer - Revenir'
                />
    )
}

export default CloseIconBack