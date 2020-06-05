import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
export default ({offers})=>{
    const completedStatusMapper=[{value:"created",label:"En attente de réponse"},
    {value:"inProgress",label:"Travail en cours"},
    {value:"completed",label:"Annonce terminée"}]

    const getStatus = (completedStatus)=>{
        return completedStatusMapper.find((mapStatus)=>mapStatus.value===completedStatus)
    }
     
    return (
        <div className="content-container">
        <div className="manager__miniature-list">
            {offers.length>0?offers.map((offer)=>(
                <div className="manager__miniature-wrapper">
                    <Link to={'/offer/'+offer._id} style={{textDecoration:'none'}}>
                        <div className="manager__title-wrapper">
                            
                            <h3>{offer.title}</h3>
                            
                        </div>
                        <div className="manager__details-wrapper">
                            <p>{offer.description.length>250?offer.description.slice(0,250)+'...':offer.description}</p>
                            <div className="manager__bottom-container">
                                <p>{getStatus(offer.completedStatus).label}</p>
                                <span>Publié {moment(offer.createdAt).lang('fr').fromNow()}</span>
                            </div>
                        </div>
                    </Link>
                    
                    
                </div>
            )):(<p className="search__infotext">Aucune annonce ne correspond à votre recherche</p>)}
        </div>
        
        
        </div>
        )
}