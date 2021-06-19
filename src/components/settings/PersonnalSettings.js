import React, {useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL;
import {deleteAccount, changePassword } from '../../actions/user';
const PersonnalSettings = ({startDeleteAccount, startChangePassword})=>{
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [deleteAccountPassword, setDeleteAccountPassword] = useState('');
  const [error, setError]= useState('');
  const changePassword = (e)=>{
    e.preventDefault();
    if(newPassword!==newPasswordCheck) {
      setError('Les mots de passes ne correspondent pas');
    }else{
      startChangePassword(oldPassword, newPassword);
    }
  };
  const deleteAccount = (e)=>{
    e.preventDefault();
    startDeleteAccount(deleteAccountPassword);
  };
  return (
    <div>


      <h4 className="settings__section-title">Modifier votre mot de passe : </h4>
      <form onSubmit={changePassword} className="settings__password-form">
        <input type="password"
          value={oldPassword}
          placeholder="Ancien mot de passe"
          className="settings__input settings__password-input"
          onChange={(e)=>setOldPassword(e.target.value)}
        />
        <input type="password"
          value={newPassword}
          className="settings__input settings__password-input"
          placeholder="Nouveau mot de passe"
          onChange={(e)=>setNewPassword(e.target.value)}
        />
        <input type="password"
          value={newPasswordCheck}
          className="settings__input settings__password-input"
          placeholder="Vérifier nouveau mot de passe"
          onChange={(e)=>setNewPasswordCheck(e.target.value)}
        />
        <button className="settings__button">Modifier</button>
      </form>
      <h4 className="settings__section-title">Supprimer votre compte </h4>
      <form onSubmit={deleteAccount}>
        <input type="password"
          placeholder="Mot de passe"
          className="settings__input settings__password-input"
          value={deleteAccountPassword}
          onChange={(e)=>setDeleteAccountPassword(e.target.value)}
        />
        <button className="settings__button settings__delete-button">
        Supprimer définitivement votre compte</button>
      </form>


      {error&&<p>{error}</p>}

    </div>
  );
};
const mapStateToProps = (state)=>({user: state.user});
const mapDispatchToProps = (dispatch)=>({
  startDeleteAccount: (password)=>dispatch(deleteAccount(password)),
  startChangePassword: (currentPass, password)=>dispatch(changePassword(currentPass, password))
});
export default connect(mapStateToProps, mapDispatchToProps)(PersonnalSettings);
