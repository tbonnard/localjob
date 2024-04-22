import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

import { createAccount } from '../../reducers/userReducer'

import CloseIcon from '../global/CloseIcon';
import MenuInsideHome from '../global/MenuInsideHome';

const AccountForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const user = useSelector(state => state.user)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleCreateAccount = (e) => {
        e.preventDefault()
        const accountObject = {password:password, confirmPassword:confirmPassword, email:email}
        dispatch(createAccount(accountObject)).then(() => {
            // console.log("")
        })
        .catch((error) => {
            // Handle errors if needed
            console.log(error)
        });
        setPassword('')
        setConfirmPassword('')
        setEmail('')
    }


    useEffect(() => {
        if(user) {
            navigate('/profile')     
        }
    },[user])

    return (
        <>
        <MenuInsideHome />
        <div className='layerGlobal'>

            {/* <CloseIcon /> */}

            <div className='layerDiv'>
                <h2 className='layerTitle'>Créer un compte</h2>
                <form onSubmit={handleCreateAccount} className='layerFormDiv'>
                    <input type="email" placeholder='votre courriel' name="email" value={email} onChange={(e) => setEmail(e.target.value)} className='enterTextNumber projectFormInput' required/>
                    <input type="password" placeholder='votre mot de passe (minimum 8 caractères)' name="password" value={password} onChange={(e) => setPassword(e.target.value)} className='enterTextNumber projectFormInput' required/>
                    <input type="password" placeholder='confirmer votre mot de passe' name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='enterTextNumber projectFormInput' required/>
                    <button type='submit' className="buttonFour loginSigninSubLink">créer</button>
                </form>

                <div className='loginSigninSubLink'>
                    <p>Si vous avez déjà un compte,
                    <Link className='buttonTier' to="/login"> connectez vous ici</Link></p>
                </div>
            </div>
        </div>
        </>
    )
}

export default AccountForm