import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogin } from '../../actions/auth';

const LoginForm = ({ startLogin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

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
      <h1 className="large text-primary">Se connecter</h1>
      <p className="lead">
        <i className="fas fa-user" /> Connectez vous à votre compte
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Addresse Email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit"  value="Se connecter" />
      </form>
      <Link to='/reset'>Mot de passe oublié?</Link>
      
    </div>
  );
};



const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
const mapDispatchToProps = (dispatch)=>({
    startLogin : (email,password)=>dispatch(startLogin(email,password))
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);