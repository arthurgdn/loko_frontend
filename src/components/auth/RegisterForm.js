import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { startRegister } from '../../actions/auth';


const RegisterForm = ({ startRegister, isAuthenticated,registerError }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName : '',
    email: '',
    password: '',
    password2: ''
  })
  const { firstName,lastName, email, password, password2 } = formData
  const [error,setError] = useState('')

  useEffect(()=>{
    setError(registerError)
  },[registerError])
  

  const onChange = (e) =>setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
       setError('Les mots de passes ne se correspondent pas ')
    }else{
      startRegister({ firstName,lastName, email, password })
      history.push()
    }
  }
  if (isAuthenticated) {
    return <Redirect to='/postSignup' />;
  }
  
  return (
    <div className="showcase__signup">
      <div className="signup__container">
        <h1 className='signup__text'>Créer un compte</h1>
        <form className='signup__form' onSubmit={e => onSubmit(e)}>
          <div className='signup__form-group'>
            <input
              className='signup__input'
              type='text'
              placeholder='Prénom'
              name='firstName'
              required
              value={firstName}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='signup__form-group'>
            <input
              type='text'
              className='signup__input'
              placeholder='Nom'
              name='lastName'
              required
              value={lastName}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='signup__form-group'>
            <input
              type='email'
              className='signup__input'
              placeholder='Addresse Email'
              name='email'
              required
              value={email}
              onChange={e => onChange(e)}
            />
            
          </div>
          <div className='signup__form-group'>
            <input
              type='password'
              className='signup__input'
              placeholder='Mot de passe'
              name='password'
              required
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='signup__form-group'>
            <input
              type='password'
              className='signup__input'
              placeholder='Confirmer mot de passe'
              name='password2'
              value={password2}
              required
              onChange={e => onChange(e)}
            />
          </div>
          {error && (<p>{error}</p>)}
          <div className="signup__form-group">
            <input type='submit' className="signup__button"  value="Inscription" />
          </div>
          
        </form>
      
      </div>
      
      
    </div>)}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  registerError: state.auth.registerError
})
const mapDispatchToProps = (dispatch)=>({
    startRegister : (formData)=>dispatch(startRegister(formData))
})

export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);