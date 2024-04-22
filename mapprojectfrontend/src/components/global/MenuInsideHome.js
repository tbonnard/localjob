import React from 'react'
import { Link } from 'react-router-dom'

import homeIcon from '../../media/home.png'

const MenuInsideHome = () => {


    return (
        
        <div className='MenuGlobalInside'>

            <div className='MenuGlobalMenu'>

                <Link to={`/`} className='menuIcon' >
                    <img 
                        src={homeIcon}  
                        alt='Accueil'
                    />
                </Link>


            </div>
        </div>
                
    )
}

export default MenuInsideHome