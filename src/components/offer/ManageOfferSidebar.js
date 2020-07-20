import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'
import Select from 'react-select'
import axios from 'axios'
import {AiOutlineCheckCircle,AiOutlineEdit} from 'react-icons/ai'
import {MdDeleteForever} from 'react-icons/md'
import {TiDeleteOutline} from 'react-icons/ti'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL
import {startEditOffer,startRemoveOffer} from '../../actions/offers' 
import { setCollaborators } from '../../actions/user'

const ManageOffer = ({_id,publisherId,collaborators,completedStatus,user,startEditOffer,startRemoveOffer,history,editOfferError,removeOfferError})=>{
    const [collaborationDemands,setCollaborationDemands] = useState([])
    const [displayedCollaborators,setDisplayedCollaborators] = useState(collaborators)
    const [error,setError] = useState('')
    useEffect(()=>{
        setError(editOfferError)
    },[editOfferError])
    useEffect(()=>{
        setError(removeOfferError)
    },[removeOfferError])
    //On charge les demandes de collaboration
    useEffect( ()=>{
        
        if(String(user._id)===String(publisherId)){
            
                 axios.get('/offer/'+_id+'/demands').then((res)=>{
                     console.log(res.data)
                    setCollaborationDemands(res.data)
                 }).catch((e)=>{
                     console.log(e)
                    setError("Impossible de récupérer les reponses à l'annonce")
                 })
                
            
        }
    },[])

    //On définit le statut de la publication
    const statusIndex = [{value:"created",label:"En attente de réponse"},
    {value:"inProgress",label:"Travail en cours"},
    {value:"completed",label:"Annonce terminée"}]
    const [offerStatus,setOfferStatus] = useState(completedStatus)
    const onCompletedStatusChange = (options)=>{
        
        startEditOffer(_id,{completedStatus:options.value})
        setOfferStatus(options.value)
    }
    const rejectDemand = (e)=>{
        const userId = e.currentTarget.id.substr(6,e.currentTarget.id.length)
        axios.post('/offer/'+_id+'/demand/sort',JSON.stringify({_id:userId,status:'rejected'})).then((res)=>{
            setCollaborationDemands(collaborationDemands.filter((demand)=>String(demand.from._id)!==String(res.data.from)))
        }).catch((e)=>setError("Erreur serveur"))
    }
    const acceptDemand = (e)=>{
        const userId = e.currentTarget.id.substr(6,e.currentTarget.id.length)
        axios.post('/offer/'+_id+'/demand/sort',JSON.stringify({_id:userId,status:'accepted'})).then((res)=>{
            const {from} = collaborationDemands.find((demand)=>demand.from._id===res.data.from)
            setDisplayedCollaborators([...displayedCollaborators,{_id:userId,firstName:from.firstName,lastName:from.lastName}])
            setCollaborationDemands(collaborationDemands.filter((demand)=>String(demand.from._id)!==String(res.data.from)))
            
        }).catch((e)=>setError("Erreur serveur"))
    }
    const deleteOffer = ()=>{
        startRemoveOffer(_id)
        history.push('/offers/gestion')
    }
    
    return (
        <div className="manager__sidebar-container">
            <div className="manager__sidebar-body">
                <h3>Membres : </h3>
                <div className="manager__sidebar-members">
                    {displayedCollaborators.map((collaborator)=>(
                        <Link to={'/profile/'+collaborator._id} key={collaborator._id} className="offer-element__comment-subheader">
                            <img className="header__picture offer-element__comment-picture" src={process.env.DEV_URL+"/users/"+collaborator._id+"/avatar"}/>
                            <p>{collaborator.firstName} {collaborator.lastName}</p>
                        </Link>
                    ))}
                </div>
            </div>
            
            
            
            {String(user._id)===String(publisherId) ? (
                <div>
                    <div className="manager__sidebar-body">
                    <h3>Statut de l'annonce : </h3>
                    <Select
                        defaultValue={statusIndex.find((index)=>index.value===offerStatus)}
                        options = {statusIndex}
                        onChange={onCompletedStatusChange}
                        placeholder="Statut"
                    />
                    </div>
                    
                    
                    {collaborationDemands.length>0 &&(
                        <div className="manager__sidebar-body">
                        <h3>Réponses à l'annonce : </h3>
                        {collaborationDemands.map((demand)=>
                        <div key={demand.from._id}>
                            <Link to={'/profile/'+demand.from._id} className="offer-element__comment-subheader">
                                <img className="header__picture offer-element__comment-picture" src={process.env.DEV_URL+"/users/"+demand.from._id+"/avatar"}/>
                                <p>{demand.from.firstName} {demand.from.lastName}</p>
                            </Link>
                            <p>{demand.message}</p>
                            <button className="manager__button manager__button-margin" id={"accept"+demand.from._id} onClick={acceptDemand}><AiOutlineCheckCircle/> Accepter</button>
                            <button className="manager__button" id={"reject"+demand.from._id} onClick={rejectDemand}><TiDeleteOutline/> Rejeter</button>
                        </div>)}
                        </div>
                        )}
                    <div className="manager__sidebar-bottom">
                        <button className="manager__button" onClick={()=>{history.push('/offer/edit/'+_id)}}><AiOutlineEdit/> Modifier l'annonce</button>
                        <button className="manager__button" onClick={deleteOffer}><MdDeleteForever/> Supprimer l'annonce définitivement</button>
                    </div>
                </div>
            ):(
                <div className="manager__sidebar-body">
                    <h3>Statut de l'annonce : </h3>
                    {offerStatus==='created' &&(<p>En recherche de collaborateur(s)</p>)}
                    {offerStatus==='inProgress' &&(<p>Travail en cours</p>)}
                    {offerStatus==='completed' &&(<p>Travail effectué</p>)}
                </div>)}
            
        {error && (<p>{error}</p>)}
        </div>
    )
}
const mapStateToProps = (state)=>({
    user : state.user,
    editOfferError : state.offers.editOfferError,
    removeOfferError : state.offers.removeOfferError
})
const mapDispatchToProps = (dispatch)=>({
    startEditOffer : (id,updates)=>dispatch(startEditOffer(id,updates)),
    startRemoveOffer : (id)=>dispatch(startRemoveOffer(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(ManageOffer)
