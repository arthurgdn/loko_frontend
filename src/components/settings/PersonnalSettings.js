import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL
import {deleteAccount,changePassword } from '../../actions/user'
const PersonnalSettings = ({user,startDeleteAccount,startChangePassword})=>{
   
    const [displayPasswordChange,setDisplayPasswordChange] = useState(false)
    const [displayDeleteAccount,setDisplayDeleteAccount] = useState(false)
    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [newPasswordCheck,setNewPasswordCheck] = useState('')
    const [deleteAccountPassword,setDeleteAccountPassword] = useState('')
    const [error,setError]= useState('')
    const checkEmail = async (e)=> {
        e.preventDefault()
        try{
            await axios.post('/sendVerification')

        }catch(e){
            setError(e)
        }

    }
    const changePassword = (e)=>{
        e.preventDefault()
        if(newPassword!==newPasswordCheck){
            setError('Les mots de passes ne correspondent pas')
        }else{
            startChangePassword(oldPassword,newPassword)
        }
    }
    const deleteAccount = (e)=>{
        e.preventDefault()
        startDeleteAccount(deleteAccountPassword)
    }
    return (
        <div>
        {error&&(<p>{error}</p>)}
            {!user.validatedEmail&&(<button onClick={checkEmail}>Envoyer l'email de vérification</button>)}
            <button onClick={()=>setDisplayPasswordChange(!displayPasswordChange)}>Changer de mot de passe</button>
            {displayPasswordChange &&(
                <form onSubmit={changePassword}>
                    <input type="password"
                    value={oldPassword}
                    placeholder="Ancien mot de passe"
                    onChange={(e)=>setOldPassword(e.target.value)}
                    />
                    <input type="password"
                    value={newPassword}
                    placeholder="Nouveau mot de passe"
                    onChange={(e)=>setNewPassword(e.target.value)}
                    />
                    <input type="password"
                    value={newPasswordCheck}
                    placeholder="Vérifier nouveau mot de passe"
                    onChange={(e)=>setNewPasswordCheck(e.target.value)}
                    />
                    <button>Enregistrer</button>
                </form>
                )}
                <button onClick={()=>setDisplayDeleteAccount(!displayDeleteAccount)}>Supprimer mon compte</button>
            {displayDeleteAccount && (
                <form onSubmit={deleteAccount}>
                    <input type="password"
                    placeholder="Mot de passe"
                    value={deleteAccountPassword}
                    onChange={(e)=>setDeleteAccountPassword(e.target.value)}
                    />
                    <button>Supprimer définitivement mon compte</button>
                </form>
            )}
            
        </div>
    )
}
const mapStateToProps = (state)=>({
    
    user : state.user
})
const mapDispatchToProps = (dispatch)=>({
    startDeleteAccount : (password)=>dispatch(deleteAccount(password)),
    startChangePassword : (currentPass,password)=>dispatch(changePassword(currentPass,password))
})
export default connect(mapStateToProps,mapDispatchToProps)(PersonnalSettings)
