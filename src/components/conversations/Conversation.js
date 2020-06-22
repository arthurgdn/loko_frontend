import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Select from 'react-select'
import {AiOutlineMessage,AiOutlineEdit} from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import {GiUpgrade} from 'react-icons/gi'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL
import Messages from './Messages'
import { startSetConversation, startPatchMembers, startAddAdmin } from '../../actions/conversation';
import {startSetCollaborators } from '../../actions/user'
import EditConversationInfoForm from './EditConversationInfoForm'
import formatConversationName from '../../utils/formatConversationName'

const Conversation =  ({setConversationError,editSpecificConversationError,match,user_id,stateConversation,startSetConversation,collaborators,startSetCollaborators,startPatchMembers,startAddAdmin,history})=>{
    
    
    const [member,setMember] = useState({})
    const [conversation,setConversation]= useState({})
    const [displayEditConvInfoForm,setDisplayEditConvInfoForm] = useState(false)
    const [displayInfo,setDisplayInfo] = useState(false)
    const [frontSetConvError,setFrontSetConvError]=useState('')
    const [editConvError,setEditConvError]=useState('')
    const [displayedCollaborators,setDisplayedCollaborators] = useState([])
    const isAdmin = (Object.keys(conversation).length>2 && !!conversation.admins.find((admin)=>admin.admin===user_id))
    //On regarde lorsqu'une erreur intervient côté serveur
    useEffect(()=>{
        setFrontSetConvError(setConversationError)
    },[setConversationError])

    useEffect(()=>{
        setEditConvError(editSpecificConversationError)
    },[editSpecificConversationError])
    useEffect(()=>{
        if(Object.keys(stateConversation).length>2 && stateConversation._id!==match.params.id){
            startSetConversation(match.params.id)
        }else{
            
            startSetConversation(match.params.id)
        }
        startSetCollaborators()
             
    },[])
    useEffect(()=>{
        if(stateConversation._id===match.params.id){
            setConversation(stateConversation)
        }
        

    },[stateConversation,startSetConversation])
    useEffect(()=>{
        //On vérifie qu'on a le bon format pour la liste des collaborateurs
        
        if((collaborators.length>0 && !!stateConversation.members && Object.keys(collaborators[0]).length===3)||collaborators.length===0){
            const formattedCollaborators = []
            for (const collaborator of collaborators){
                if(!stateConversation.members.find((member)=>member.member===collaborator.collaborator)){
                    formattedCollaborators.push({collaborator : collaborator.collaborator,value:collaborator.collaborator,label:collaborator.firstName + ' '+collaborator.lastName})
            
                }
            }
            setDisplayedCollaborators(formattedCollaborators)
        }
    },[stateConversation,startSetConversation])
    const onSelectedMembersChange = (collaborator)=>{
        setMember(collaborator)
        
    }
    const addMember = ()=>{
        
        startPatchMembers(match.params.id,member.value,'add')
    }
    const removeMember = (e)=>{
        const selectedId = e.currentTarget.id
        startPatchMembers(match.params.id,selectedId,'remove')
    }
    const addAdmin = (e)=>{
        const member = e.currentTarget.id.substr(5,e.currentTarget.id.length)
        startAddAdmin(match.params.id,member,'admin')
    }


    return (
        <div>
           
            {frontSetConvError &&(<p>{frontSetConvError}</p>)}
            {Object.keys(conversation).length<=2?(<p className="group__text-info">Aucune conversation ne correspond</p>):
                (
                <div className="manager__container">
                    <div className="group__content-display">
                        <div className="profile__header">
                            {conversation.hasImage ? (<img className="profile__picture" src={process.env.DEV_URL+"/conversation/"+conversation._id+"/image"}/>):(<AiOutlineMessage className="header__picture offer-element__comment-picture"/>)}
                            <h3>{formatConversationName(conversation,user_id)}</h3>    
                        </div>
                        <Messages conv_id={match.params.id}/>
                    </div>
                    <div className="group__sidebar">
                        <div className="manager__sidebar-container">
            
                            
                            {conversation.description && (
                                <div className="manager__sidebar-body">
                                    <h3>Description : </h3>
                                    <p>{conversation.description}</p>
                                </div>
                            )}
                            {conversation.members.length>2 && (
                                <div className="manager__sidebar-body">
                                    <h3>Membres : </h3>
                                    <div className="manager__sidebar-members">
                                        {conversation.members.map((member)=>
                                            <Link to={'/profile/'+member.member} key={member.member} className="offer-element__comment-subheader">
                                                <img className="header__picture offer-element__comment-picture" src={process.env.DEV_URL+"/users/"+member.member+"/avatar"}/>
                                                <p>{member.firstName} {member.lastName}</p>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                            {(isAdmin && displayedCollaborators.length>0 && conversation.members.length>2) && (
                                <div className="manager__sidebar-body">
                                    <h3>Inviter un membre</h3>
                                    <Select
                                        options={displayedCollaborators}
                                        isMulti={false}
                                        onChange={onSelectedMembersChange}
                                    />
                                    <button className="manager__button" onClick={addMember}>Ajouter</button>
                                </div>
                            )}
                            <div>

                            {(isAdmin && conversation.members.length>2 && conversation.admins.length!==conversation.members.length) && (
                                <div className="manager__sidebar-body">
                                    <h3>Gérer les membres : </h3>
                                                {conversation.members.filter((member)=>{
                                                    return member.member !== user_id && !conversation.admins.find((admin)=>admin.admin===member.member)
                                                }).map((member)=>(
                                                    <div key={member.member}>
                                                        <Link to={'/profile/'+member.member} className="offer-element__comment-subheader">
                                                            <img className="header__picture offer-element__comment-picture" src={process.env.DEV_URL+"/users/"+member.member+"/avatar"}/>
                                                            <p>{member.firstName} {member.lastName}</p>
                                                        </Link>
                                                        <button className="manager__button manager__button-margin" id={"admin"+member.member} onClick={addAdmin}><GiUpgrade/> Promouvoir</button>
                                                        <button className="manager__button" id={member.member} onClick={removeMember}><TiDeleteOutline/> Supprimer</button>
                                                
                                                    </div>
                                        ))}
                                </div>
                            )}

                            {isAdmin && (
                                <div className="manager__sidebar-body">
                                    <button className="manager__button" onClick={()=>setDisplayEditConvInfoForm(!displayEditConvInfoForm)}><AiOutlineEdit/> Modifier</button>
                                    {(isAdmin && displayEditConvInfoForm)&&(<EditConversationInfoForm {...conversation} setDisplayEditConvInfoForm={setDisplayEditConvInfoForm}/>)}
                                    {editConvError && (<p>{editConvError}</p>)}
                                </div>
                            )}
                            
                                
                                
                                
                                
                            
                            
                            
                        </div>
                        </div>

                            
                    </div>
                </div>
                              
                            
                    
                    
                           
                
                )
            }
            
    
        </div>
    )
}
const mapStateToProps = (state)=>({
    user_id : state.user._id,
    stateConversation : state.conversation,
    collaborators : state.user.collaborators,
    setConversationError : state.conversation.setConversationError,
    editSpecificConversationError: state.conversation.editSpecificConversationError

})
const mapDispatchToProps = (dispatch)=>({
    startSetConversation : (id)=>dispatch(startSetConversation(id)),
    startSetCollaborators : ()=>dispatch(startSetCollaborators()),
    startPatchMembers : (id,member,action)=>dispatch(startPatchMembers(id,member,action)),
    startAddAdmin : (id,member,newStatus)=>dispatch(startAddAdmin(id,member,newStatus))
})
export default connect(mapStateToProps,mapDispatchToProps)(Conversation)


