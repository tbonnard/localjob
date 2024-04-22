
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"

import ProjectPropertyNameProfile from './ProjectPropertyNameProfile';
import { getProjectDetails } from "./../../reducers/projectReducer"
import CloseIcon from '../global/CloseIcon';
import EditIcon from '../global/EditIcon';
import phoneIcon from "../../media/phone.png"
import emailIcon from "../../media/email.png"
import urlIcon from "../../media/url.png"
import Save from '../save/Save';
import JobEdit from './JobEdit';
import MenuInside from '../global/MenuInside';


const JobFull = () => {
  let { uuid } = useParams(); 
  const dispatch = useDispatch()

  const [date, setDate] = useState('')
  const [dateStart, setDateStart] = useState('')
  const [modalEnabled, setModalEnabled] = useState(false)

  const item = useSelector(state => state.projects)

  const handleEdit = () => {
    setModalEnabled(true)
  };

    useEffect(() => {
      dispatch(getProjectDetails(uuid))
  },[uuid, dispatch])

    useEffect(() => {
      const createdDate = new Date(item.created)
      // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric',  minute:'numeric',  second:'numeric' }
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
      const output = createdDate.toLocaleDateString("fr-FR", options)
      setDate(output)

    },[item])

    useEffect(() => {
      const createdDate = new Date(item.starting_date)
      // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric',  minute:'numeric',  second:'numeric' }
      const options = { year: 'numeric', month: 'long', day: 'numeric'}
      const output = createdDate.toLocaleDateString("fr-FR", options)
      setDateStart(output)

    },[item])


    const handleClickEmail = () => {

    }

    const handleClickPhone = () => {

    }
    
    const handleClickUrl = () => {

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

  
  if (!item || item.length === 0 || !item.properties) {
    return null
  }

  return (
    <div>
      {modalEnabled && <JobEdit functionClick={setModalEnabled} project={item} /> }

       {/* <CloseIcon /> */}
       <MenuInside />

        <div className='parent'>
        
          <div className="triangle triangle1"></div>
          {/* <div class="triangle triangle2"></div> */}
          <div className='text-containerJob'>

            <EditIcon onClick={handleEdit} owner={item.properties[0]["owner_uuid"]} />

            <div className='textJob'>
            <Save  project={item}/>

            <Link className='projectTitleNameJobCie' to={`/commerce/${item.properties[0]["uuid"]}`}>{item.properties[0]["name"]}</Link>

              <h2 className='projectTitleNameJob'>{item.title}</h2>


              <div className='tagJobGlobal'>
                <div className=''>
                  {item.salary ? <p className='infoTag infoTagGrey'>{item.salary}$ / {mapToDisplayFrequency(item.salary_frequency)}</p>  : <></> }
                  <p className='infoTag infoTagGrey'>{mapToDisplayjobFlexibility(item.job_flexibility)}</p>
                  <p className='infoTag infoTagGrey'>{mapToDisplayjobType(item.job_type)}</p>
                  <p className='infoTag infoTagGrey'>début idéal: {dateStart}</p>
                  {item.active ? <p className='infoTag infoTagSuccess'>actif</p> : <p className='infoTag infoTagError'>non actif</p> }
                </div> 
              </div>

              <p>{item.description}</p>
              
              {/* <p>Date de début idéal: {dateStart}</p> */}
              {/* <p>Expiration Date: {item.expiration_date}</p> */}
              {/* <p>Active: {item.active ? 'Yes' : 'No'}</p> */}
          
       

              <div className='applyJobGlobal'>
                <h3>Pour appliquer</h3>
                <div className='applyJob'>
                  {item.contact_email && 
                    <Link to={`mailto:${item.contact_email}`}>
                      <img className='applyJobIcon' 
                        src={emailIcon}  
                        alt='Envoyer sa candidature par courriel'
                        title='Envoyer sa candidature par courriel'
                        onClick={handleClickEmail} 
                        />
                      </Link>
                      }
                {/* <p>Contact Email: {item.contact_email}</p> */}
                  {item.contact_phone &&
                    <Link to={`tel:${item.contact_phone}`}>
                      <img className='applyJobIcon' 
                            src={phoneIcon}  
                            alt='Téléphoner'
                            title='Téléphoner'
                            onClick={handleClickPhone} 
                            />
                      </Link>
                      }
                  {/* <p>Contact Phone: {item.contact_phone}</p> */}
                  {item.contact_url &&
                    <Link to={`${item.contact_url}`} target='_blank'>
                      <img className='applyJobIcon' 
                            src={urlIcon}  
                            alt="Aller sur le site de l'emploi"
                            title="Aller sur le site de l'emploi"
                            onClick={handleClickUrl} 
                            />
                      </Link>
                  }
                  {/* <p>Contact URL: {item.contact_url}</p> */}
                </div>
                <Link className='' to={`/commerce/${item.properties[0]["uuid"]}`}>{item.properties[0]["name"]}</Link>

              </div>
    

              <div className='projectDateDiv'>
                <p className='projectDate'>ajouté le {date}</p>
              </div>

            </div>

          </div>

        </div>



    </div>
  )
}

export default JobFull