import React from 'react'

import loadingGifIcon from '../../media/loadinggif.gif'


import '../../styles/layer1stLevel.css'
import { useSelector } from 'react-redux'

const LoadingIcon = () => {

    const loadingIconState = useSelector(store => store.loadingFlag['loading'])
    const longLoadingIconState = useSelector(store => store.loadingFlag['longLoading'])

    if (!loadingIconState) {
        return null
    }

    return (
        <div>
            <img className='loadingIcon' 
                src={loadingGifIcon}  
                alt='cancel - close'
                width={"30px"}
            />

            {longLoadingIconState && 
            <div className="longLoadingDiv">
                <p>loading can be long as we query on all types of properties near that location (50 meters)</p>
            </div>
            }

        </div>
    )
}

export default LoadingIcon