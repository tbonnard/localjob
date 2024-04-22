import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import profileIcon from '../../media/profile.png'
import informationIcon from '../../media/information.png'


const Menu = () => {

  
    return (
    <div className='MenuGlobal'>
       
            <div className='MenuGlobalMenu'>

                <Link to={`/information`} className='menuIcon' >
                    <img 
                        src={informationIcon}  
                        alt='Information'
                    />
                </Link>

            
                <Link to={`/profile`} className='menuIcon' >
                <img 
                    src={profileIcon}  
                    alt='Profile'
                            />
                </Link>
            </div>
   
        
        {/*        
        {menuDisplayed && 
            <SubMenu setMenuDisplayed={setMenuDisplayed} /> 
        } */}


    </div>
    )
}

export default Menu