import React from 'react';
import {RiAddCircleLine} from 'react-icons/ri';
import GroupsList from './GroupsList';
import SuggestedGroupsList from './SuggestedGroupsList';

export default ({history})=>
  <div>
    <div className="banner__title">
      <h3>Vos Groupes</h3>
    </div>

    <div className="content-container">
      <div className="group__page-container">
        <button
          className="group__big-button"
          onClick={()=>history.push('/nouveau_groupe')}
        ><RiAddCircleLine/> Créer un groupe</button>
        <GroupsList/>
        <SuggestedGroupsList/>
      </div>

    </div>

  </div>;

