import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL

import { startSetGroup, startCreateGroup } from '../../actions/groups'
import ManageGroup from './ManageGroup'
import GroupOffers from './GroupOffers'
import OfferForm from '../offers/OfferForm'
import { startAddOffer } from '../../actions/offers'
const GroupPage = ({match,stateGroup,startSetGroup,user,startAddOffer,addGroupOfferError,setGroupError})=>{
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
                <div>
                    {group.hasImage && (<img className="header__picture" src={process.env.DEV_URL+"/group/"+group._id+"/image"}/>)}
                    <h3>{group.name}</h3>
                    <p>{group.description}</p>
                    <p>{group.locationText}</p>
                    <ul>{group.keywords.map((keyword)=>(<li key={keyword.name}><Link to={'/keyword/'+keyword._id}>{keyword.name}</Link></li>))}</ul>
                    
                    {isMember?(
                        <div>
                            <button onClick={()=>{setDisplayOfferForm(!displayOfferForm)}}>Publier dans le groupe</button>
                            {displayOfferForm &&(
                                <div>
                                    <OfferForm onSubmit={onSubmit} inGroup={true} group={group}/>
                                    {frontAddGroupOfferError && (<p>{frontAddGroupOfferError}</p>)}
                                </div>
                                    )}
                            
                            <GroupOffers group_id={group._id}/>
                            
                            <ManageGroup/>
                        </div>
                    ):(<div>
                        {(group.securityStatus==='onRequest' || group.securityStatus==='open')?
                        (isRequested?(<p>Demande pour rejoindre le groupe envoyée</p>):(
                            <button onClick={sendMembershipRequest}>Rejoindre le groupe</button>
                        )):(<p>Groupe privé, vous devez être invité au groupe</p>)}  
                        {requestError && (<p>{requestError}</p>)}
                    </div>)}
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