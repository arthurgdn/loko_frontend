import React,{useState} from 'react'

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL
export default ()=>{
    
    const [email,setEmail] = useState('')
    const [error,setError] = useState('')
    const onSubmit = async  (e)=>{
        e.preventDefault()
        try{
            
            await axios.post('/user/reset',{email})
        }catch(error){
            console.log(error)
            setError(error)
        }
        
    }
    return (
        <div>
            <p>J'ai oublié mon mot de passe</p>
            <form onSubmit={onSubmit}>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                <button>Réinitialiser le mot de passe</button>
            </form>
            {error && (<p>{error}</p>)}
        </div>
    )
}