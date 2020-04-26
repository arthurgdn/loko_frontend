import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { startRegister } from '../../actions/auth';


const RegisterForm = ({ startRegister, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName : '',
    email: '',
    password: '',
    password2: ''
  });

  const { firstName,lastName, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
        //We will figure out how to deal with errors later
        //setAlert('Passwords do not match', 'danger');
    } else {
        
      startRegister({ firstName,lastName, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/home' />;
  }

  return (
    <div>
      <h1 className='large text-primary'>S'inscrire</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Créez votre compte
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Prénom'
            name='firstName'
            value={firstName}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Nom'
            name='lastName'
            value={lastName}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Addresse Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
          
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Mot de Passe'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirmer Mot de Passe'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit'  value="S'inscrire" />
      </form>
      
    </div>
  );
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
const mapDispatchToProps = (dispatch)=>({
    startRegister : (formData)=>dispatch(startRegister(formData))
})
export default connect(
  mapStateToProps,
    mapDispatchToProps
)(RegisterForm);