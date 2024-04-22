import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

import { userLogin } from '../../reducers/userReducer'

import CloseIcon from '../global/CloseIcon';
import LoadingIcon from '../global/LoadingIcon';
import MenuInsideHome from '../global/MenuInsideHome';


const LoginForm = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const user = useSelector(state => state.user)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleLoginSubmit = (e) => {
        e.preventDefault()
        dispatch(userLogin({email, password}))
        setEmail('')
        setPassword('')
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
        
              <LoadingIcon />

              {/* <CloseIcon /> */}
             

            <div className='layerDiv'>
                <h2 className='layerTitle'>Vous connecter</h2>
                <form onSubmit={handleLoginSubmit} className='layerFormDiv'>
                    <input type="text" placeholder='votre courriel' value={email} onChange={(e) => setEmail(e.target.value)} className='enterTextNumber projectFormInput' required/>
                    <input type="password" placeholder='votre mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} className='enterTextNumber projectFormInput' required/>
                    <button type='submit' className="buttonFour loginSigninSubLink">se connecter</button>
                </form>

                <div className='loginSigninSubLink'>
                    <p>Vous n'avez pas encore de compte ?
                    <Link className='buttonTier' to="/signup"> Créer un compte</Link></p>
                </div>
            </div>
        </div>
        </>
    )

}

export default LoginForm