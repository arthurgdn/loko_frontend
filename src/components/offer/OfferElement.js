import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'
import getLocationFormatted from '../../actions/getLocationFormatted'
import OfferCommentSection from './OfferCommentSection'
const OfferElement =  ({title,description,createdAt,locationRadius,location,image,_id,keywords,publisherName,publisherId})=>{
    const [locationResult,setLocationResult] = useState('')
    
    useEffect(()=>{
        getLocationFormatted(location.coordinates[1],location.coordinates[0]).then((getLocationFormatted)=>setLocationResult(getLocationFormatted))
        
    },[])

    return(
        <div>
            <Link to={'/profile/'+publisherId}>
                <img className="header__picture" src={process.env.DEV_URL+"/users/"+publisherId+"/avatar"}/>
                <h3>{publisherName}</h3>
            </Link>
            
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Recherche à {locationResult} </p>
            <p>Dans un rayon de : {locationRadius} </p>
            {image&& (<img  src={process.env.DEV_URL+"/offer/"+_id+"/image"}/>)}
            
            <ul>{keywords.map((keyword)=>(<li key={keyword.name}>{keyword.name}</li>))}</ul>
            <span>{moment(createdAt).format('MMMM Do, YYYY')}</span>
            <OfferCommentSection offer_id={_id}/>

        </div>
        )
        
        
         
         
         
    }

export default OfferElement