
import React from 'react';

import { useSelector } from 'react-redux'


import Project from './Project'

const ProjectsList = () => {
        

  const projects = useSelector(state => state.cieProject)


  if (projects.length === 0) {
    return ( <p className='infoText'>pas d'emploi actuellement</p> )
  }

    return (
      <div className='projectsList'>
          {projects.map((proj, ind) => <Project key={proj.id} item={proj} /> )}
    </div>
    )

  
}

export default ProjectsList