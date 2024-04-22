import React from 'react'
import { Link } from 'react-router-dom'

import homeIcon from '../../media/home.png'
import profileIcon from '../../media/profile.png'

const MenuInside = () => {


    return (
        
        <div className='MenuGlobalInside'>

            <div className='MenuGlobalMenu'>

                <Link to={`/`} className='menuIcon' >
                    <img 
                        src={homeIcon}  
                        alt='Accueil'
                    />
                </Link>

            
                <Link to={`/profile`} className='menuIcon' >
                <img 
                    src={profileIcon}  
                    alt='Profile'
                            />
                </Link>

            </div>
        </div>
                
    )
}

export default MenuInside