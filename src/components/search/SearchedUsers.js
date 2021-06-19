import React from 'react';
import {Link} from 'react-router-dom';
export default ({users})=>{
  return (
    <div className="content-container">
      {users.length>0
        ? users.map((user)=>
          <div key={user._id} className="collaborator__list">
            <Link to={'/profile/'+user._id} className="offer-element__comment-subheader">
              <img
                className="header__picture offer-element__comment-picture"
                src={process.env.DEV_URL+'/users/'+user._id+'/avatar'}/>
              <p>{user.firstName} {user.lastName}</p>
            </Link>

          </div>

        )
        :<p className="search__infotext" >Aucun utilisateur ne correspond à votre recherche</p>}
    </div>
  );
};