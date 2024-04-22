
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import ProjectPropertyNameProfile from './ProjectPropertyNameProfile';
import Save from '../save/Save';
import Apply from '../save/Apply';
import ApplyLink from '../save/ApplyLink';


const Project = ({item, source=0}) => {
    
  const [date, setDate] = useState('')
  const [classProjectSource, setClassProjectSource] = useState('ProjectGlobal')

    useEffect(() => {
      const createdDate = new Date(item.created)
      // const optionsAll = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric',  minute:'numeric',  second:'numeric' }
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      const output = createdDate.toLocaleDateString("fr-CA", options)
      setDate(output)
      if (source===1) {
        setClassProjectSource('ProjectGlobalProfile')
      }
    },[item])



  if (!item) {
    return null
  }

  // Mapping function to translate backend values to frontend display values
    const mapToDisplayFrequency = (backendFrequency) => {
      const frequencyMap = {
          "HOUR": "heure",
          "DAY": "jour",
          "MONTH": "mois",
          "YEAR": "an"
      };
      return frequencyMap[backendFrequency];
    }

    const mapToDisplayjobType = (backendFrequency) => {
      const frequencyMap = {
          "PART_TIME": "Temps partiel",
          "FULL_TIME": "Temps plein",
          "CONTRACT": "Contrat",
          "SEASON": "Saisonnier"
      };
      return frequencyMap[backendFrequency];
    }

    const mapToDisplayjobFlexibility = (backendFrequency) => {
      const frequencyMap = {
          "AT_WORK": "Présentiel",
          "HYBRID": "Hybride",
          "FROM_HOME": "Télétravail",
      };
      return frequencyMap[backendFrequency];
    }


    
  return (
    <div className={classProjectSource}>
                
        <div className='projectDiv'>
  
          <Save project={item}/>

            <div className='projectDivDetails'>
            <Link className='projectTitleName' to={`/job/${item.uuid}`}>{item.title}</Link>
                            {/* <p className='infoJob projectTitleName'></p> */}
                            {/* <p className='infoJob'>{item.description}</p> */}
            <ProjectPropertyNameProfile item={item} />
            </div>
            <div className='projectDivTags'>
              {item.salary ? <p className='infoTag infoTagGrey'>{item.salary}$ / {mapToDisplayFrequency(item.salary_frequency)}</p>  : <></> }
              <p className='infoTag infoTagGrey'>{mapToDisplayjobFlexibility(item.job_flexibility)}</p>
              <p className='infoTag infoTagGrey'>{mapToDisplayjobType(item.job_type)}</p>
              {!item.active && <p className='infoTag infoTagError'>inactif</p> }

            </div>               
        </div>
        
       

    <div className='projectsLinks'>
          {/* <Apply project={item}/> */}
          <ApplyLink project={item}/>
          <div className='projectDateDiv'>
            <p className='projectDate'>{date}</p>
        </div>
    </div>
     
    </div>
  )
}

export default Project