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
        <div>
            <Link to={'/profile/'+publisherId}>
                <img className="header__picture" src={process.env.DEV_URL+"/users/"+publisherId+"/avatar"}/>
                <h3>{publisherName}</h3>
            </Link>
            
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Recherche à {locationText} </p>
            <p>Dans un rayon de : {locationRadius} </p>
            {hasImage&& (<img  src={process.env.DEV_URL+"/offer/"+_id+"/image"}/>)}
            
            <ul>{keywords.map((keyword)=>(<li key={keyword.name}><Link to={'/keyword/'+keyword._id}>{keyword.name}</Link></li>))}</ul>
            <span>{moment(createdAt).locale('fr').fromNow()}</span>
            {displayCollaborationDemandForm && <div>
                    {isCollaborator?(<p>Vous travaillez sur cette annonce</p>):(
                        <CollaborationDemandForm onCollaborationDemandSent={onCollaborationDemandSent}/>
                    )}
                </div>}
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