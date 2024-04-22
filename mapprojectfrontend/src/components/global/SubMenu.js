import React from 'react'

import { useNavigate } from 'react-router-dom';

import cancelIcon from '../../media/cancel.png'
import { useSelector } from 'react-redux';

const SubMenu = ({setMenuDisplayed}) => {

    const user = useSelector(store => store.user)

    const navigate = useNavigate();

    const handleLogin = () => {
        window.scrollTo(0,0);
        navigate('/login')
    }

    const handleProfile = () => {
        window.scrollTo(0,0);
        navigate('/profile')
    }

    const handleHome = () => {
        window.scrollTo(0,0);
        navigate('/')
    }

    const handleHowItWorks = () => {
        window.scrollTo(0,0);
        navigate('/howitworks')
    }

    const handleWhy = () => {
        window.scrollTo(0,0);
        navigate('/why')
    }

    const handleExplanation = () => {
        window.scrollTo(0,0);
        navigate('/explanation')
    }


    const closeLayer = () => {
        setMenuDisplayed(false)
    }

    return (
    <div className='MenuGlobalSubMenu'>

        <img className='closeIconMenu' 
            src={cancelIcon}  
            onClick={closeLayer}
            alt='cancel - close'
            width={"30px"}
        />

        {window.location.pathname !== '/' && 
            <div className='subMenuButtonDiv'>
                <button className='buttonTier MainColor' onClick={handleHome}>Accueil</button>
            </div>
        }

        <div className='subMenuButtonDiv'>   
            {user ? 
                <button className='buttonTier MainColor' onClick={handleProfile}>Profile</button>
            :
                  <button className='buttonTier MainColor' onClick={handleLogin}>login</button>
            }
        </div>


        <div className='subMenuButtonDiv'>
            <button className='buttonTier MainColor' onClick={handleExplanation}>Explanation</button>
        </div>

        {/* <div className='subMenuButtonDiv'>
            <button className='buttonTier MainColor' onClick={handleWhy}>why?</button>
        </div>

        <div className='subMenuButtonDiv'>
            <button className='buttonTier MainColor' onClick={handleHowItWorks}>see how it works</button>
        </div> */}

    </div>
    )
}

export default SubMenu