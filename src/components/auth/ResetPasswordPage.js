import React,{useState} from 'react'

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL
export default ({match})=>{
    
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')
    const [error,setError] = useState('')
    const onSubmit = async  (e)=>{
        e.preventDefault()
        if(password!==password2){
            setError('Les mots de passe doivent correspondre')
        }else{
            try{
                axios.patch('/reset/'+match.params.token,{password})
            }catch(error){
                setError(error)
            }
        }
        
        
    }
    return (
        <div>
            <p>Entrez votre nouveau mot de passe</p>
            <form onSubmit={onSubmit}>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Nouveau mot de passe"/>
                <input type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)} placeholder="Vérifiez le mot de passe"/>
                <button>Réinitialiser le mot de passe</button>
            </form>
            {error && ({error})}
        </div>
    )
}