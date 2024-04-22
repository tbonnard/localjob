
import React from 'react';
import { useNavigate } from 'react-router-dom';


const ProjectPreForm = () => {
    
    const navigate = useNavigate()
    
    const handleClick = () => {
        navigate('/suggestion')
    }


  return (
        <div className='projectPreDiv'>
            <div className='projectAddIcon' onClick={handleClick} title='Add a new suggestion or improvement'></div>
        </div>
  )
}

export default ProjectPreForm