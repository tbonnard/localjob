
import React from 'react';

import ProjectsList from './ProjectsList';

import '../../styles/project.css'

import ProjectPreForm from './ProjectPreForm';


const Projects = () => {
  
  
    return (
      <>
        <div className='projectsGlobal'>
          <ProjectsList  />
          <ProjectPreForm />
        </div>
      </>


  )

}

export default Projects