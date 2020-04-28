import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import getLocationFormatted from '../../actions/getLocationFormatted'
import {startSendCollaboration} from '../../actions/user'
import { startSetProfile } from '../../actions/profile';


const ProfilePage = ({ startSendCollaboration,startSetProfile,match,profile,user }) => {
  
    
  return (
      <div> 
            
            
            {match.params.id!==user._id ?(<div><button onClick={(e)=>{
                //We could add in store something to keep track if a demand was sent
                startSendCollaboration({_id : match.params.id})
            }}>Collaborer </button>
            <button onClick={(e)=>{
        
                //Create a new conversation(on the server) and redirect to this conversation
            }}>Message</button></div>) : (<Link to='/settings/profile'>Modifier</Link>)}
            <h3>{profile.firstName} {profile.lastName}</h3>
            <img src={process.env.DEV_URL+"/users/"+match.params.id+"/avatar"}/>
            <p>{getLocationFormatted(profile.location.coordinates[1],profile.location.coordinates[0])}</p>
            <p>{profile.description}</p>
            <p>{profile.summary}</p>
            <h3>Mes compétences: </h3>
            <ul>
                {profile.skills.map((skill)=>(<li>{skill}</li>))}
            </ul>
            <h3>Mes sujets : </h3>
            <ul>
                {profile.keywords.map((keyword)=>(<li>{
                    //api to generate keyword text from id later, same for completed offers
                    keyword}</li>))}
            </ul>
            <h3>J'ai répondu à ces annonces : </h3>
            <ul>
            {profile.completedOffers.map((offer)=>(<li>{
                //api to generate keyword text from id later, same for completed offers
                offer}</li>))}
        </ul>
      </div>
  )
};


const mapStateToProps = (state)=>({
    profile : state.profile,
    user : state.user
})
const mapDispatchToProps = (dispatch)=>({
    startSetProfile : (profile_id)=>dispatch(startSetProfile(profile_id)),
    startSendCollaboration : (collaborator)=>dispatch(startSendCollaboration(collaborator))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);