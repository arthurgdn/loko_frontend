import React from 'react';

import RegisterForm from './auth/RegisterForm';
import Header from './showcase/Header';
import Promotion from './showcase/Promotion';

export default ()=>{
  return (
    <div>
      <Header/>
      <div className="showcase__main-area">
        <Promotion/>
        <RegisterForm/>
      </div>

    </div>
  );
};
