import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import getLocationFormatted from '../../actions/getù'
import { startSetProfile } from '../../actions/profile';


const ProfilePage = ({ startSetProfile,match,profile }) => {
  
    useEffect(()=>{
        startSetProfile(match.params.id)
    },[])
    handleSendMessage((e)=>{

    })

    handleAddToCollaborators((e)=>{

    })

  
  

  return (
      <div>
            <h3>{profile.firstName} {profile.lastName}</h3>
            <img src={process.env.DEV_URL+"/users/"+match.params.id+"/avatar"}/>
            <p>{getLocationFormatted(profile.location.coordinates[1],profile.location.coordinates[0])}</p>
            <p>{profile.description}</p>
            <p>{profile.summary}</p>
            <h3>Skills : </h3>
            <ul>
                {profile.skills.map((skill)=>(<li>{skill}</li>))}
            </ul>
            <h3>Topics : </h3>
            <ul>
                {profile.keywords.map((keyword)=>(<li>{
                    //api to generate keyword text from id later, same for completed offers
                    keyword}</li>))}
            </ul>
            <h3>Completed offers : </h3>
            <ul>
            {profile.completedOffers.map((offer)=>(<li>{
                //api to generate keyword text from id later, same for completed offers
                offer}</li>))}
        </ul>
      </div>
  )
};


const mapStateToProps = (state)=>({
    profile : state.profile
})
const mapDispatchToProps = (dispatch)=>({
    startSetProfile : (profile_id)=>dispatch(startSetProfile(profile_id))
})
export default connect(
    undefined,
    mapDispatchToProps
)(ProfilePage);