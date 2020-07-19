import React, {useState, useEffect,useRef} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {FaRegUserCircle} from 'react-icons/fa'
import {RiLockPasswordLine} from 'react-icons/ri'
import { startLogin } from '../../actions/auth';


const LoginForm = ({ startLogin, isAuthenticated,loginError }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error,setError] = useState('')
  useEffect(()=>{setError(loginError)},[loginError])
  const emailRef = useRef(null)
  useEffect(()=>{
    emailRef.current.focus()
    
  },[])
  

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = async e => {
    e.preventDefault();
    startLogin(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <div className="login__fieldset" >
        
        
      <form className="login__form" onSubmit={e => onSubmit(e)}>
        <div className="login__item">
          <FaRegUserCircle/>
          <input
            className="login__input"
            type="email"
            ref={emailRef}
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
            focus="true"
          />
        </div>
        
        <div className="login__item">
          <RiLockPasswordLine/>
          <input
            
            type="password"
            className="login__input"
            placeholder="Mot de passe"
            required
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        
      
      <input type="submit" className="login__button"  value="Connexion" />
    </form>
    <div className="login__footer">
      {error && (<p className="login__form__error">{error}</p>)}
      <Link to='/reset' className="login__forgot-password">Mot de passe oublié?</Link>
      
    </div>
      
    </div>
      
     
      
      
    </div>
  );
};



const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loginError:state.auth.loginError
});
const mapDispatchToProps = (dispatch)=>({
    startLogin : (email,password)=>dispatch(startLogin(email,password))
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);