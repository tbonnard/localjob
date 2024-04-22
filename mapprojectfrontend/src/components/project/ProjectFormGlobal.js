
import React, { useState } from 'react';

import {  useSelector } from 'react-redux'

import '../../styles/project.css'

import ProjectPreForm from './ProjectPreForm';
import ProjectForm from './ProjectForm'


const ProjectFormGlobal = () => {
    

    const [flagCreateProject, setFlagCreateProject] = useState(false)
   
        return (
            <div className=''>
                { flagCreateProject ? 
                <ProjectForm setFlagCreateProject={setFlagCreateProject}/>
                :
                <ProjectPreForm setFlagCreateProject={setFlagCreateProject}/>
                }
   
            </div>
        )

}

export default ProjectFormGlobal