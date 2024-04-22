import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CloseIconBackModal from "../global/CloseIconBackModal"
import { propertyEdit } from '../../reducers/propertyReducer'

const CompanyEdit = ({functionClick, property}) => {
    const dispatch = useDispatch()
    
    const user = useSelector(state => state.user)

    const [isToggled, setIsToggled] = useState(property.active);
    const [formData, setFormData] = useState(property);

    const handleToggleChange = () => {
        setIsToggled(!isToggled)
      };

      
    const handleClose = () => {
        functionClick(false)
    };


      useEffect(() => {
        setFormData({
            ...formData,
            active: isToggled
        });
    }, [isToggled]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };


    const handleSubmit = (e) => {
        e.preventDefault()
       
        // const formDataWithUser = {
        //     ...formData,
        //     user: user,
        //   };
        const formDataWithUser = {
            ...formData, 
            active: isToggled,
            user: user,
        };
        // console.log(formDataWithUser);
        dispatch(propertyEdit(formDataWithUser)).then(() => {
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
                        <input type="text" placeholder="nom du commerce" className='enterTextNumber projectFormInput' name="name" value={formData.name || ''} onChange={handleChange} required />
                        <input type="text" placeholder="description du commerce" className='enterTextNumber projectFormInput' name="description" value={formData.description || ''} onChange={handleChange} />
                        <input type="text" placeholder="numéro de la rue du commerce" className='enterTextNumber projectFormInput' name="house_number" value={formData.house_number || ''} onChange={handleChange} />
                        <input type="text" placeholder="rue du commerce" className='enterTextNumber projectFormInput' name="road" value={formData.road || ''} onChange={handleChange} />
                        <input type="text" placeholder="ville du commerce" className='enterTextNumber projectFormInput' name="city" value={formData.city || ''} onChange={handleChange} />
                        <input type="text" placeholder="code postal du commerce" className='enterTextNumber projectFormInput' name="postcode" value={formData.postcode || ''} onChange={handleChange} />
                        <input type="text" placeholder="province du commerce" className='enterTextNumber projectFormInput' name="state" value={formData.state || ''} onChange={handleChange} />
                        <input type="text" placeholder="pays du commerce" className='enterTextNumber projectFormInput' name="country" value={formData.country || ''} onChange={handleChange} />
                        <input type="url" placeholder="URL du commerce" className='enterTextNumber projectFormInput' name="url" value={formData.url || ''} onChange={handleChange} />
                        <div className='companyEditToggle'>
                            <label className=''>Statut du commerce</label>
                            <input className='toggle toggleStatus'
                                type="checkbox"
                                checked={isToggled}
                                onChange={handleToggleChange}
                            />
                            {isToggled ? <p className='infoTagSolo infoTagSuccess'>actif</p> : <><p className='infoTagSolo infoTagError'>inactif</p><span className='infoTextNoMarginTop'>le commerce ne sera plus visible</span></> }
                        </div>
                       
                        <button type="submit" className="buttonFour">modifier</button>
                    </div>
                        
                </form>            
        </div>
    </div>

    )
}

export default CompanyEdit