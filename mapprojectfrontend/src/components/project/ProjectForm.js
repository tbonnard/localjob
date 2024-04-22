
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector  } from 'react-redux'

import { useNavigate } from 'react-router-dom';

import { createProject } from '../../reducers/projectReducer';


import '../../styles/project.css'
import '../../styles/layer1stLevel.css'

import closeIcon from '../../media/close.png'
import CloseIconBack from '../global/CloseIconBack';


const ProjectForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(state => state.user)
    const property = useSelector(state => state.property)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        starting_date: '',
        salary: '',
        salary_frequency: 'HOUR',
        job_type: 'FULL_TIME',
        job_flexibility: 'AT_WORK',
        active: true,
        contact_email: user.email,
        contact_phone: '',
        contact_url: '',
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault()
       
        const formDataWithUser = {
            ...formData,
            user: user,
            property:property
          };
        // console.log(formDataWithUser);
        dispatch(createProject(formDataWithUser))
        setTitle('')
        setDescription('')
        window.history.back() 
    }

    const handleClick = () => {
        navigate('/login')
    }

    if (property.length ===0) {
        navigate('/')
    }


    return (

        <div className='layerDiv'>

                <CloseIconBack />

            <div className=''>
                <h2 className='layerTitle'>créer un nouvel emploi</h2>
                <p>{property.display_name}</p>

                {user ? 
                    <form onSubmit={handleSubmit}>
                        <div className='layerFormDiv' >
                            {/* <label>Titre:</label> */}
                            <input type="text" placeholder="titre de l'emploi" className='enterTextNumber projectFormInput' name="title" value={formData.title} onChange={handleChange} required />
                    
                            {/* <label>Description:</label> */}
                            <input type="text" placeholder="description de l'emploi" className='enterTextNumber projectFormInput' name="description" value={formData.description} onChange={handleChange} required />
                    
                            {/* <label>Date de début idéale:</label> */}
                            <input type="text" placeholder="date de début idéal" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} className='enterTextNumber projectFormInput' name="starting_date" value={formData.starting_date} onChange={handleChange} required />
                    
                            <div className='createDivGroup'>
                                {/* <label>Salaire:</label> */}
                                    <input type="text" placeholder="salaire de l'emploi" className='enterTextNumber projectFormInput divInputSalary' name="salary" value={formData.salary} onChange={handleChange} />
                            
                                <div className='subFieldsSalary'>
                                        <select className='enterTextNumber projectFormInput divInputSalarySubFields' name="salary_frequency" value={formData.salary_frequency} onChange={handleChange}>
                                            <option value="HOUR">Par heure</option>
                                            <option value="DAY">Par jour</option>
                                            <option value="MONTH">Par mois</option>
                                            <option value="YEAR">Par an</option>
                                        </select>
                            
                                        {/* <label>Type de l'emploi:</label> */}
                                        <select className='enterTextNumber projectFormInput divInputSalarySubFields' name="job_type" value={formData.job_type} onChange={handleChange}>
                                            <option value="FULL_TIME">Temps plein</option>
                                            <option value="PART_TIME">Temps partiel</option>
                                            <option value="CONTRACT">Contrat</option>
                                            <option value="SEASON">Saisonnier</option>
                                        </select>
                                
                                        {/* <label>Flexibilité de l'emploi:</label> */}
                                        <select className='enterTextNumber projectFormInput divInputSalarySubFields' name="job_flexibility" value={formData.job_flexibility} onChange={handleChange}>
                                            <option value="AT_WORK">Présentiel</option>
                                            <option value="HYBRID">Hybride</option>
                                            <option value="FROM_HOME">Télétravail</option>
                                        </select>
                                    </div>
                                    
                                </div>
                                
                                {/* <label>Date d'expiration de l'emploi:</label>
                                <input type="date" name="expiration_date" value={formData.expiration_date} onChange={handleChange} /> */}
                        
                                {/* <label>Courriel de contact:</label> */}
                                <input type="email" placeholder="courriel de contact" className='enterTextNumber projectFormInput' name="contact_email" value={formData.contact_email} onChange={handleChange} />
                        
                                {/* <label>Téléphone de contact:</label> */}
                                <input type="tel"  placeholder="téléphone de contact" className='enterTextNumber projectFormInput'  name="contact_phone" value={formData.contact_phone} onChange={handleChange} />
                        
                                {/* <label>URL de l'offre pour postuler:</label> */}
                                <input type="url" placeholder="URL de contact" className='enterTextNumber projectFormInput' name="contact_url" value={formData.contact_url} onChange={handleChange} />
                    
                            <button type="submit" className="buttonFour">créer</button>
                    </div>
                </form>

                :
                <div className='loginSigninSubLink'>
                    <p>vous devez être connecté pour créer un nouvel emploi</p>
                    <button className="buttonFour loginSigninSubLink" type='submit' onClick={handleClick}>se connecter</button>
                </div>
                }

            </div>

        </div>

    )


}

export default ProjectForm