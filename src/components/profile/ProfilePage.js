import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {startSendCollaboration,startNewCollaboration} from '../../actions/user'
import { startSetProfile } from '../../actions/profile';


const ProfilePage = ({ startSendCollaboration,startSetProfile,match,stateProfile,user_id,collaborators,collaborationDemands,startNewCollaboration,history }) => {
    
    
    const isCollaborator = collaborators.find((collaborator)=>String(collaborator.collaborator)===match.params.id)
    const isInCollaborationDemands = collaborationDemands.find((demand)=>String(demand.demand)===match.params.id)
    
    const [profile,setProfile] = useState({
        firstName:'',
        lastName:'',
        location : '',
        locationText: '',
        description:'',
        summary:'',
        keywords:[],
        skills : [],
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
    
    
  return (
      <div> 
            
            
            {match.params.id!==user_id ?(<div>
                {(!isCollaborator && !isInCollaborationDemands) && <button onClick={(e)=>{
                
                startSendCollaboration({_id : match.params.id})
            }}>Collaborer </button>}

            {isInCollaborationDemands && (
                <div>
                    <button id={"accept"+match.params.id} onClick={accept}>Accepter</button>
                    <button id={"reject"+match.params.id} onClick={reject}>Rejeter</button>
                </div>)}
            <button onClick={sendMessage}>Message</button></div>) : (<Link to='/settings/profile'>Modifier</Link>)}
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
                {profile.keywords.map((keyword)=>(<li key={keyword}>{
                    //api to generate keyword text from id later, same for completed offers
                    keyword}</li>))}
            </ul>
            <h3>J'ai répondu à ces annonces : </h3>
            <ul>
            {profile.completedOffers.map((offer)=>(<li key={offer._id}>{
                //api to generate keyword text from id later, same for completed offers
                offer}</li>))}
        </ul>
      </div>
  )
};


const mapStateToProps = (state)=>({
    stateProfile : state.profile,
    user_id : state.user._id,
    collaborators : state.user.collaborators,
    collaborationDemands : state.user.collaborationDemands
})
const mapDispatchToProps = (dispatch)=>({
    startSetProfile : (profile_id)=>dispatch(startSetProfile(profile_id)),
    startSendCollaboration : (collaborator)=>dispatch(startSendCollaboration(collaborator)),
    startNewCollaboration : (collaborator,status)=>dispatch(startNewCollaboration(collaborator,status))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);