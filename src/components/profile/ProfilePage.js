import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {startSendCollaboration,startNewCollaboration} from '../../actions/user'
import { startSetProfile, startSendRecommendation } from '../../actions/profile';
import RecommendationForm from './RecommendationForm'

const ProfilePage = ({ startSendCollaboration,startSetProfile,startSendRecommendation,match,stateProfile,user_id,collaborators,collaborationDemands,startNewCollaboration,history,setProfileError,sendCollaborationError,sendRecommendationError,newCollaborationError }) => {
    
    
    const isCollaborator = collaborators.find((collaborator)=>String(collaborator.collaborator)===match.params.id)
    const isInCollaborationDemands = collaborationDemands.find((demand)=>String(demand.demand)===match.params.id)
    const [frontSetProfileError,setFrontSetProfileError] = useState('')
    const [frontSendCollabError,setFrontSendCollabError] = useState('')
    const [frontSendReccError,setFrontSendReccError] = useState('')
    const [frontNewCollabError,setFrontNewCollabError] = useState('')
    useEffect(()=>{
        setFrontSetProfileError(setProfileError)
    },[setProfileError])
    useEffect(()=>{
        setFrontSendCollabError(sendCollaborationError)
    },[sendCollaborationError])
    useEffect(()=>{
        setFrontSendReccError(sendRecommendationError)
    },[sendRecommendationError])
    useEffect(()=>{
        setFrontNewCollabError(newCollaborationError)
    },[newCollaborationError])
    const [profile,setProfile] = useState({
        firstName:'',
        lastName:'',
        location : '',
        locationText: '',
        description:'',
        summary:'',
        keywords:[],
        skills : [],
        recommendations : [],
        completedOffers:[]

    })
    
    useEffect(()=>{
        startSetProfile(match.params.id)
    },[])
    
    useEffect(()=>{
        setProfile(stateProfile)
        
        
    },[stateProfile,startSetProfile])
    const accept=(e)=>{
        const collaborator = e.currentTarget.id.substr(6,e.currentTarget.id.length)
        
        startNewCollaboration(collaborator,'accept')
    }
    const reject = (e)=>{
        const collaborator = e.currentTarget.id.substr(6,e.currentTarget.id.length)
        
        startNewCollaboration(collaborator,'reject')
    }
    const sendMessage = (e)=>{
        history.push('/load/conversation/'+match.params.id)
    }
    const sendRecommendation = (content)=>{
        startSendRecommendation(match.params.id,content)
    }
    
  return (
      <div> 
            
            
            {match.params.id!==user_id ?(<div>
                {(!isCollaborator && !isInCollaborationDemands) && <button onClick={(e)=>{
                
                startSendCollaboration({_id : match.params.id})
            {frontSendCollabError && (<p>{frontSendCollabError}</p>)}
            }}>Suivre </button>}

            {isInCollaborationDemands && (
                <div>
                    <button id={"accept"+match.params.id} onClick={accept}>Accepter</button>
                    <button id={"reject"+match.params.id} onClick={reject}>Rejeter</button>
                </div>)}
            {frontNewCollabError && (<p>{frontNewCollabError}</p>)}
            <button onClick={sendMessage}>Message</button></div>) : (<Link to='/settings/profile'>Modifier</Link>)}
            {frontSetProfileError && (<p>{frontSetProfileError}</p>)}
            <h3>{profile.firstName} {profile.lastName}</h3>
            <img src={process.env.DEV_URL+"/users/"+match.params.id+"/avatar"}/>
            <p>Localisation : {profile.locationText}</p>
            <p>Description : {profile.description}</p>
            <p>Ce que je recherche : {profile.summary}</p>
            <h3>Mes compétences: </h3>
            <ul>
                {profile.skills.map((skill)=>(<li key={skill}>{skill}</li>))}
            </ul>
            <h3>Mes centres d'intérêt : </h3>
            <ul>
                {profile.keywords.map((keyword)=>(<li key={keyword._id}><Link to={'/keyword/'+keyword._id}>{
                    keyword.name}</Link></li>))}
            </ul>
            <h3>J'ai répondu à ces annonces : </h3>
                    {profile.completedOffers.map((offer)=>(<Link to={'/offer/'+offer.completedOffer} key={offer.completedOffer}><li>{offer.title}</li></Link>))}
           
            <h3>Recommendations reçues : </h3>
            {profile.recommendations.map((recommendation)=>(
                <div key={recommendation._id}>
                    <Link to={'/profile/'+recommendation.publisher._id}>
                        <img className="header__picture" src={process.env.DEV_URL+"/users/"+recommendation.publisher._id+"/avatar"}/>
                        <p>{recommendation.publisher.firstName} {recommendation.publisher.lastName}</p>
                    </Link>
                    <p>{recommendation.content}</p>
                </div>))}
                {match.params.id!==user_id && (
                    <div>
                        <RecommendationForm sendRecommendation={sendRecommendation}/>
                        {frontSendReccError && (<p>{frontSendReccError}</p>)}
                    </div>
                    ) }

               
      </div>
  )
};


const mapStateToProps = (state)=>({
    stateProfile : state.profile,
    user_id : state.user._id,
    collaborators : state.user.collaborators,
    collaborationDemands : state.user.collaborationDemands,
    setProfileError : state.profile.setProfileError,
    sendCollaborationError : state.user.sendCollaborationError,
    sendRecommendationError : state.user.sendRecommendationError,
    newCollaborationError : state.user.newCollaborationError
})
const mapDispatchToProps = (dispatch)=>({
    startSetProfile : (profile_id)=>dispatch(startSetProfile(profile_id)),
    startSendCollaboration : (collaborator)=>dispatch(startSendCollaboration(collaborator)),
    startNewCollaboration : (collaborator,status)=>dispatch(startNewCollaboration(collaborator,status)),
    startSendRecommendation : (profile_id,content)=>dispatch(startSendRecommendation(profile_id,content))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);