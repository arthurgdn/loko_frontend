import React from 'react';
import {Link} from 'react-router-dom';

import moment from 'moment';


const MiniatureOfferElement =  ({
  _id, title, description, createdAt, completedStatus, privateLink
})=>{
  const completedStatusMapper=[{value: 'created', label: 'En attente de réponse'},
    {value: 'inProgress', label: 'Travail en cours'},
    {value: 'completed', label: 'Annonce terminée'}];
  const status = completedStatusMapper.find((mapStatus)=>mapStatus.value===completedStatus);
  return (
    <div className="manager__miniature-wrapper">
      <Link to={privateLink?'/offer/gestion/'+_id:'/offer/'+_id} style={{textDecoration: 'none'}}>
        <div className="manager__title-wrapper">

          <h3>{title}</h3>

        </div>
        <div className="manager__details-wrapper">
          <p>{description.length>250?description.slice(0, 250)+'...':description}</p>
          <div className="manager__bottom-container">
            <p>{status.label}</p>
            <span>Publié {moment(createdAt).lang('fr').fromNow()}</span>
          </div>
        </div>
      </Link>


    </div>

  );
};


export default MiniatureOfferElement;