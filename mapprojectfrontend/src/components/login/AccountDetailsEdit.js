import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import CloseIconBackModal from "../global/CloseIconBackModal"
import { userEdit } from '../../reducers/userReducer'


const AccountDetailsEdit = ({functionClick, user}) => {
    const dispatch = useDispatch()
    
    const [formData, setFormData] = useState(user);

    const handleClose = () => {
        functionClick(false)
    };

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
        };
        // console.log(formDataWithUser);
        dispatch(userEdit(formDataWithUser)).then(() => {
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
                    <input type="email" placeholder="courriel" className='enterTextNumber projectFormInput' name="email" value={formData.email} onChange={handleChange} required />
                    <input type="password" placeholder='votre mot de passe (ou si nouveau : minimum 8 caractères)' name="password" value={formData.password} onChange={handleChange} className='enterTextNumber projectFormInput' required/>
                    <button type="submit" className="buttonFour">modifier</button>
                </div >
            </form>
        </div>
    </div>
    )
}

export default AccountDetailsEdit