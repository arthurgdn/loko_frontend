import React,{useState} from 'react'
import {Link} from 'react-router-dom'

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL


export default ()=>{
    
    const [email,setEmail] = useState('')
    const [message,setMessage] = useState('')
    const [error,setError] = useState('')

    const onSubmit = async  (e)=>{
        e.preventDefault()
        try{
            await axios.post('/user/reset',{email})
            setMessage('Un email vous a été envoyé pour réinitialiser votre mot de passe !')
            setEmail('')
        }catch(error){
            setError(error)
        }
    }
    return (
        <div>
            <header className="header">
                <div className="header__content"> 
                    <Link className="header__title" to='/home'>
                        <img src={process.env.DEV_URL+'/showcase/cactus_mini'}/>
                        <h1>Loko</h1>
                    </Link>
                </div>
            </header>
            
            <div className="content-container">
                <h1>J'ai oublié mon mot de passe</h1>
                <form onSubmit={onSubmit} className="settings__form">
                    <input type="email" className="settings__email-input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                    <button className="post-signup__button">Réinitialiser le mot de passe</button>
                </form>
                {message && (<p className="settings__reset-text">{message}</p>)}
                {error && (<p className="login__form__error">{error}</p>)}
            </div>
            
        </div>
    )
}