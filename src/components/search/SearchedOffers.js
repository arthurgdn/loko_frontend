import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
export default ({offers})=>{
    return (
        <div>
        {offers.length>0?offers.map((offer)=>(
            <Link to={'/offer/'+offer._id} key={offer._id}>

                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <span>{moment(offer.createdAt).locale('fr').fromNow()}</span>
            </Link>
        )):(<p>Aucune offre ne correspond à votre recherche</p>)}
        
        </div>
        )
}