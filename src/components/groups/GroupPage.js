import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {MdArrowBack} from 'react-icons/md'
import {FaUserClock} from 'react-icons/fa'
import {FiUserCheck} from 'react-icons/fi'
import {GoLocation} from 'react-icons/go'
import {GrUserAdd} from 'react-icons/gr'
import {AiFillLock} from 'react-icons/ai'
import {RiAddCircleLine} from 'react-icons/ri'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL

import { startSetGroup, startCreateGroup } from '../../actions/groups'
import ManageGroup from './ManageGroup'
import GroupOffers from './GroupOffers'
import OfferForm from '../offers/OfferForm'
import { startAddOffer } from '../../actions/offers'
const GroupPage = ({history,match,stateGroup,startSetGroup,user,startAddOffer,addGroupOfferError,setGroupError})=>{
    const [group,setGroup] = useState({})
   
    const [isRequested,setIsRequested] = useState(false)
    const [isMember,setIsMember] = useState(false)
    const [displayOfferForm,setDisplayOfferForm] = useState(false)
    const [frontAddGroupOfferError,setFrontAddGroupOfferError] = useState('')
    const [frontSetGroupError,setFrontSetGroupError] = useState('')
    const [requestError,setRequestError] = useState('')
    useEffect(()=>{
        setFrontSetGroupError(setGroupError)
    },[setGroupError])
    useEffect(()=>{
        setFrontAddGroupOfferError(addGroupOfferError)
    },[addGroupOfferError])
    useEffect(()=>{
        if(!stateGroup._id || stateGroup._id!==match.params.id){
            startSetGroup(match.params.id)
        }else{
            setGroup(stateGroup)
        }
    },[])
    useEffect(()=>{
        setGroup(stateGroup)
        setIsMember(stateGroup.membership === 'member' || stateGroup.membership ==='admin')
        setIsRequested(stateGroup.membership==='requested')
        
    },[stateGroup,startSetGroup])

    const sendMembershipRequest = (e)=>{
        axios.post('/group/'+group._id+'/member')
        .then((res)=>{
            if(group.securityStatus==='open'){
                setIsMember(true)
                
            }else{
                setIsRequested(true)
            }
        })
        .catch((e)=>setRequestError("Erreur lors de l'envoi de la demande"))
    }

    const onSubmit=(offer,image)=>{
        startAddOffer(offer,image)
        
    }

    return (
        <div>
            {frontSetGroupError && (<p>{frontSetGroupError}</p>)}
            {group._id===match.params.id ? (
                <div className="manager__container">
                    <div className="group__content-display">
                        <div className="profile__header">
                            <img className="profile__picture" src={process.env.DEV_URL+"/group/"+group._id+"/image"}/>
                            <h3>{group.name} {isMember && (<FiUserCheck/>)}</h3>
                            {!isMember &&(<div>
                                {(group.securityStatus==='onRequest' || group.securityStatus==='open')?
                                (isRequested?(<p><FaUserClock/> Demande envoyée</p>):(
                                    <button className="profile__button" onClick={sendMembershipRequest}><GrUserAdd/> Rejoindre</button>
                                )):(<p> <AiFillLock/> Groupe privé</p>)}  
                                {requestError && (<p>{requestError}</p>)}
                            </div>)}
                        </div>
                    <div className="group__body">
                        
                    
                    {group.locationText && (<p className="profile__location"><GoLocation/> {group.locationText}</p>)}
                    <div className="keyword__container">
                        <div className="keyword__list">
                            {group.keywords.map((keyword)=>(
                                <Link className="keyword__link" key={keyword._id} to={'/keyword/'+keyword._id}>
                                    <button>
                                        {keyword.name}
                                    </button>
                                </Link>))
                            }
                        </div>
                    </div>
                    
                    <p>{group.description}</p>
                    <button  className="group__big-button" onClick={()=>{setDisplayOfferForm(!displayOfferForm)}}><RiAddCircleLine/> Publier dans le groupe</button>
                                
                    </div>
                 
                        {isMember &&(
                            <div>
                                {displayOfferForm &&(
                                    <div className="content-container">
                                        <OfferForm onSubmit={onSubmit} inGroup={true} group={group}/>
                                        {frontAddGroupOfferError && (<p>{frontAddGroupOfferError}</p>)}
                                    </div>
                                        )}  
                            </div>
                            
                            
                        )}
                        {isMember &&(
                                <GroupOffers group_id={group._id}/>
                            
                        )}
                    </div>
                    <div className="group__sidebar">
                    {isMember &&(<ManageGroup history={history}/>)}
                    </div>
                </div>
            ):(<p>Erreur, pas de groupe correspondant</p>)}
        </div>
        )
}

const mapStateToProps = (state)=>({
    stateGroup : state.group,
    user : state.user,
    addGroupOfferError : state.groupOffers.addGroupOfferError,
    setGroupError : state.group.setGroupError
})

const mapDispatchToProps = (dispatch)=>({
    startSetGroup : (id)=>dispatch(startSetGroup(id)),
    startAddOffer : (offer,image)=>dispatch(startAddOffer(offer,image))
})

export default connect(mapStateToProps,mapDispatchToProps)(GroupPage)