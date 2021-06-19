import React from 'react';
import LoginForm from '../auth/LoginForm';
import {Link} from 'react-router-dom';

export default ()=>
  <header className="showcase__header">
    <div className="showcase__header-content">
      <Link className="header__title" to='/'>
        <img src={process.env.DEV_URL+'/showcase/cactus_mini'}/>
        <h1>Loko</h1>
      </Link>
      <div className="header__profile">
        <LoginForm/>
      </div>
    </div>
  </header>;
