
import React, { useState } from 'react';


import Icons from './Icons';

import collapseIcon from '../../media/collapse.png'
import expandIcon from '../../media/expand.png'


const Legend = () => {

    const [statusExpand, setStatusExpand] = useState(true)
           
    const handleClick = () => {
        setStatusExpand(!statusExpand)
    }

    return (
        <div className='legendGlobalDiv'>
            <h4>Légende</h4>
            
            {/* {statusExpand ? 
                <img className='closeIcon' 
                    src={collapseIcon}  
                    onClick={handleClick}
                    alt='cancel - close'
                    width={"30px"}
                />
                :
                <img className='closeIcon' 
                    src={expandIcon}  
                    onClick={handleClick}
                    alt='cancel - close'
                    width={"30px"}
                />
            } */}


            <div className='legendIcons'>
                <div className='iconMarkerMapLegend iconMarkerMapWithJob'>
                    </div> 
                <span>avec emploi</span>
            </div>

            <div className='legendIcons'>
                <div className='iconMarkerMapLegend iconMarkerMapNoJob'></div>
                <span>sans emploi</span>
            </div>

        </div>      
      )
}

export default Legend