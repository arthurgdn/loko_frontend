import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment'
import  {AiOutlineEdit,AiOutlineUserAdd,AiOutlineMessage,AiOutlineCheckCircle} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {FiUserCheck} from 'react-icons/fi'
import {TiDeleteOutline} from 'react-icons/ti'
import {startSendCollaboration,startNewCollaboration} from '../../actions/user'
import { startSetProfile, startSendRecommendation } from '../../actions/profile';
import RecommendationForm from './RecommendationForm'
import MiniatureOfferElement from '../offer/MiniatureOfferElement'

const ProfilePage = ({ startSendCollaboration,startSetProfile,startSendRecommendation,match,stateProfile,user_id,collaborators,collaborationDemands,startNewCollaboration,history,setProfileError,sendCollaborationError,sendRecommendationError,newCollaborationError}) => {
    
    
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
        if(stateProfile.user===match.params.id){
            setProfile(stateProfile)
        }
        
        
        
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
      <div className="content-container"> 
            <div className="profile__container">
                <div className="profile__header">
                    <img className="profile__picture" src={process.env.DEV_URL+"/users/"+match.params.id+"/avatar"}/>
                    <div className="profile__subheader">
                        <h3>{profile.firstName} {profile.lastName} {isCollaborator && (<FiUserCheck/>)}</h3>

                        {match.params.id!==user_id ?(<div>
                            
                            {(!isCollaborator && !isInCollaborationDemands) && <button className="profile__button" onClick={(e)=>{
                            
                            startSendCollaboration({_id : match.params.id})
                            
                        }}><AiOutlineUserAdd />Suivre </button>}
                        {frontSendCollabError && (<p>{frontSendCollabError}</p>)}
                        
                        
                        {frontNewCollabError && (<p>{frontNewCollabError}</p>)}
                        <button onClick={sendMessage} className="profile__button"><AiOutlineMessage/> Message</button></div>) : (<button className="profile__button" onClick={()=>{history.push('/settings')}}><AiOutlineEdit/> Modifier</button>)}
                        <div className="profile__button-align">
                            {isInCollaborationDemands && (
                                <button className="profile__button profile__no-space" id={"accept"+match.params.id} onClick={accept}><AiOutlineCheckCircle/> </button>
                            )}
                            {isInCollaborationDemands && (
                                <button className="profile__button profile__no-space" id={"reject"+match.params.id} onClick={reject}><TiDeleteOutline/></button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="profile__body">
                        
                    {frontSetProfileError && (<p>{frontSetProfileError}</p>)}
                    {profile.locationText && (<p className="profile__location"><GoLocation/> {profile.locationText}</p>)}
                
                    <div className="keyword__list">
                        {profile.keywords.map((keyword)=>(
                            <Link className="keyword__link" key={keyword._id} to={'/keyword/'+keyword._id}>
                                <button>
                                    {keyword.name}
                                </button>
                            </Link>))}
                    </div>
                    </div>
                <div className="profile__body profile__block">
                    <h3>Description : </h3>
                    {(profile.description && profile.description.length>0 )?(
                        <p> {profile.description}</p>
                    ):(
                        <p>L'utilisateur ne s'est pas encore décrit</p>
                    )}
                    
                </div>    
                <div className="profile__body profile__block">
                    <h3>Recherche : </h3>
                    {(profile.summary && profile.summary.length>0)?(
                        <p>{profile.summary}</p>
                    ):(
                        <p>L'utilisateur n'a renseigné encore aucune information sur ce qu'il recherche sur Loko</p>
                    )}
                    
                </div>
                    
                <div className="profile__body profile__block">
                    <h3>Compétences: </h3>
                    {profile.skills.length>0 ? (
                        <div className="profile__horizontal-list">
                            {profile.skills.map((skill)=>(<p
                            className={profile.skills.findIndex((skillSearch)=>skillSearch===skill)===profile.skills.length -1 ? "profile__last-list-item":"profile__list-item"} key={skill}>
                            {skill}
                            </p>))}
                        </div>):(
                            <p>L'utilisateur n'a renseigné encore aucune information sur ses compétences</p>
                            )}
                    
                </div>    
                    
                {profile.completedOffers.length>0 && (
                    <div className="profile__body profile__block">
                        <h3> {profile.firstName} a déjà répondu à ces annonces :</h3>
                        {profile.completedOffers.map((offer)=>(<MiniatureOfferElement key={offer.completedOffer} privateLink={false} {...{...offer,_id:offer.completedOffer}} />))}
            
                    </div>
                )} 
                

                {profile.recommendations.length>0 && (
                    <div className="offer-element__comment-section profile__body profile__block ">
                    
                        <h3>{profile.recommendations.length} recommandation{profile.recommendations.length>1 && 's'} reçue{profile.recommendations.length>1 && 's'}</h3>
                        {profile.recommendations.map((recommendation)=>(
                        <div key={recommendation._id} className="offer-element__comment-display">
                            <div className="offer-element__comment-header">
                                <Link to={'/profile/'+recommendation.publisher._id} className="offer-element__comment-subheader">
                                    <img className="header__picture offer-element__comment-picture" src={process.env.DEV_URL+"/users/"+recommendation.publisher._id+"/avatar"}/>
                                    <p>{recommendation.publisher.firstName} {recommendation.publisher.lastName}</p>
                                </Link>
                                <span className="show-for-desktop">{moment(recommendation.createdAt).lang('fr').fromNow()}</span>
                            </div>
                            <p className="offer-element__comment-content" dangerouslySetInnerHTML={{ __html:recommendation.content }}></p>
                        </div>))}     
                </div>
                )}
                {match.params.id!==user_id && (
                    
                    <div className="profile__block profile__body">
                        <h3>Envoyer une recommandation</h3>
                        <RecommendationForm sendRecommendation={sendRecommendation}/>
                        {frontSendReccError && (<p>{frontSendReccError}</p>)}
                    </div>
                    ) }
                   
                    
                        
                </div>
                
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