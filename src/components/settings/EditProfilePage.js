import React from 'react';

import EditProfileForm from './EditProfileForm';

export default ()=>{

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Modifier le profil</h1>
        </div>
      </div>
      <div className="content-container">
        <EditProfileForm/>
      </div>
    </div>
  );
};
