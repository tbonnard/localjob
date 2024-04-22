import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CloseIconBackModal from "../global/CloseIconBackModal"

import { editProject } from '../../reducers/projectReducer'

const JobEdit = ({functionClick, project}) => {
    const dispatch = useDispatch()
    
    const user = useSelector(state => state.user)

    const [formData, setFormData] = useState(project);
    const [isToggled, setIsToggled] = useState(project.active);

    const handleToggleChange = () => {
        setIsToggled(!isToggled)
      };

    const handleClose = () => {
        functionClick(false)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          active: isToggled,
          [name]: value
        });
      };
    
      
    const handleSubmit = (e) => {
        e.preventDefault()

        const formDataWithUser = {
            ...formData, 
            active: isToggled,
            user: user,
        };
        // console.log(formDataWithUser);
        console.log(formDataWithUser)
        dispatch(editProject(formDataWithUser)).then(() => {
            handleClose();
        })
        .catch((error) => {
            // Handle errors if needed
            console.log(error)
        });
    }


    return (
        <div className='modalGlobal'>
        <div className='modalContent'>
            <CloseIconBackModal onClick={handleClose} />
            <form onSubmit={handleSubmit}>
                <div className='layerFormDiv' >
                    <input type="text" placeholder="titre de l'emploi" className='enterTextNumber projectFormInput' name="title" value={formData.title} onChange={handleChange} required />
                    <input type="text" placeholder="description de l'emploi" className='enterTextNumber projectFormInput' name="description" value={formData.description} onChange={handleChange} required />
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
                        <input type="email" placeholder="courriel de contact" className='enterTextNumber projectFormInput' name="contact_email" value={formData.contact_email || ''} onChange={handleChange} />
                        <input type="tel"  placeholder="téléphone de contact" className='enterTextNumber projectFormInput'  name="contact_phone" value={formData.contact_phone || ''} onChange={handleChange} />
                        <input type="url" placeholder="URL de contact" className='enterTextNumber projectFormInput' name="contact_url" value={formData.contact_url || ''} onChange={handleChange} />
                        <div className='companyEditToggle'>
                            <label className=''>Statut du commerce</label>
                            <input className='toggle toggleStatus'
                                type="checkbox"
                                checked={isToggled}
                                onChange={handleToggleChange}
                            />
                            {isToggled ? <p className='infoTagSolo infoTagSuccess'>actif</p> : <><p className='infoTagSolo infoTagError'>inactif</p><span className='infoTextNoMarginTop'>l'emploi ne sera plus visible</span></> }
                        </div>
                    <button type="submit" className="buttonFour">modifier</button>
                </div >
            </form>
        </div>
    </div>
    )
}

export default JobEdit