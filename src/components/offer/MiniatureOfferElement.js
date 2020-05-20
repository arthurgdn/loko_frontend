import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

import moment from 'moment'


const MiniatureOfferElement =  ({_id,title,description,createdAt,publisherName,publisherId})=>
    

    (
        
            <Link to={'/offer/gestion/'+_id}>
                <h3>{title}</h3>
                <p>{description}</p>
                <span>{moment(createdAt).lang('fr').fromNow()}</span>
                <p>Par {publisherName}</p>
            </Link>
        )
    

export default MiniatureOfferElement