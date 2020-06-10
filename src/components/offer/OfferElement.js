import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'
import getLocationFormatted from '../../actions/getLocationFormatted'
import OfferCommentSection from './OfferCommentSection'
import CollaborationDemandForm from './CollaborationDemandForm'
import {startSendCollaborationDemand} from '../../actions/offers'
const OfferElement =  ({user,title,description,createdAt,locationRadius,locationText,collaborators,hasImage,_id,keywords,publisherName,publisherId,displayComments,displayAllComments,displayCollaborationDemandForm,startSendCollaborationDemand})=>{
    
    const onCollaborationDemandSent = (message)=>{
        
        startSendCollaborationDemand(_id,message)
    }
    const isCollaborator = collaborators.find((collaborator)=>String(collaborator._id)===String(user._id))
    
    return(
        <div className="offer-element__container">
            
            
            <div className="offer-element__title"> <h3>{title}</h3> </div>
            <div className="offer-element__subtitle">
                <Link to={'/profile/'+publisherId} className="offer-element__author">
                    <img className="header__picture" src={process.env.DEV_URL+"/users/"+publisherId+"/avatar"}/>
                    <h3>{publisherName}</h3>
                </Link>
                <span>{moment(createdAt).locale('fr').fromNow()}</span>
            </div>
            <div className="offer-element__description-container">
                <p>{description}</p>
            </div>
            
            <p className="offer-element__location">Recherche à {locationText} dans un rayon de {locationRadius} km </p>
            <div className="offer-element__bottom-container">
                {hasImage&& (<img  src={process.env.DEV_URL+"/offer/"+_id+"/image"}/>)}
            
                <div className="keywords__list">{keywords.map((keyword)=>(<Link key={keyword.name} to={'/keyword/'+keyword._id} className="keyword__link"><button>{keyword.name}</button></Link>))}</div>
            
            </div>
            
            {(displayCollaborationDemandForm && publisherId!==user._id && !isCollaborator) && 
                    
                        <CollaborationDemandForm onCollaborationDemandSent={onCollaborationDemandSent}/>
                    }
            {displayComments && <OfferCommentSection displayAllComments={displayAllComments} offer_id={_id}/>}

        </div>
        )
        
        
         
         
         
    }
const mapStateToProps = (state)=>({
    user : state.user
})
const mapDispatchToProps = (dispatch)=>({
    startSendCollaborationDemand : (id,message)=>dispatch(startSendCollaborationDemand(id,message))
})

export default connect(mapStateToProps,mapDispatchToProps)(OfferElement)