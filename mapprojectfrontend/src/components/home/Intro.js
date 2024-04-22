
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import '../../styles/intro.css'
import MenuInside from '../global/MenuInside';


const Intro = () => {
  
  const dispatch = useDispatch()

  return (
    <>
    <MenuInside />
    <div className='layerGlobal'>
        
        <div className='layerDiv'>
            [appName]<br/>
            emplois dans les commerces locaux
        </div>
        
        <div className='layerDiv'>  
          <button className="buttonTier selectedTab">À la recherche d'une emploi</button>
          <button className="buttonTier">Un commerce</button>
        </div>
        
        <div className='linksBottom'>
          <Link to={`/information`} >Termes et conditions</Link>
          <Link to={`/information`} >vie privée</Link>
        </div>
    </div> 
   </>
  )
}

export default Intro