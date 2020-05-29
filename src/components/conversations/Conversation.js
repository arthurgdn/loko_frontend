import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Select from 'react-select'
import {MdArrowBack} from 'react-icons/md'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL
import Messages from './Messages'
import { startSetConversation, startPatchMembers, startAddAdmin } from '../../actions/conversation';
import {startSetCollaborators } from '../../actions/user'
import EditConversationInfoForm from './EditConversationInfoForm'


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
        <button onClick={()=>{history.goBack()}} ><MdArrowBack/></button>    
        {frontSetConvError &&(<p>{frontSetConvError}</p>)}
            {Object.keys(conversation).length<=2?(<p>Aucune conversation ne correspond</p>):
                (
                <div>
                    {conversation.name?(<h3>{conversation.name}</h3>):
                        conversation.members.map((member)=>(<div key={member.member}>
                            {member.member===user_id?(<h3></h3>):(<h3>{member.firstName + ' '+member.lastName + '-'}</h3>)}
                            </div>)
                            )
                        
                    }
                    <Messages conv_id={match.params.id}/>
                    <button onClick={()=>setDisplayInfo(!displayInfo)}>Informations</button>
                    {displayInfo && (
                        <div>
                            {conversation.description && (<p>{conversation.description}</p>)}
                            {conversation.hasImage && (<img className="header__picture" src={process.env.DEV_URL+"/conversation/"+conversation._id+"/image"}/>)}
                            <h3>Membres : </h3>
                            {conversation.members.map((member)=>
                                <div key={member.member}>
                                    <Link  to={'/profile/'+member.member}>
                                        <p>{member.firstName} {member.lastName}</p>
                                    </Link>
                                    {(!conversation.admins.find((admin)=>admin.admin===member.member)&&conversation.admins.find((admin)=>admin.admin===user_id) && member.member!==user_id) && (<button id={member.member} onClick={removeMember}>X</button>)}
                                    {(!conversation.admins.find((admin)=>admin.admin===member.member) && conversation.admins.find((admin)=>admin.admin===user_id))&& (<button id={"admin"+member.member} onClick={addAdmin}>Promouvoir administrateur</button>)}
                                    
                                </div>)}
                                   
                            {isAdmin && (<button onClick={()=>setDisplayEditConvInfoForm(!displayEditConvInfoForm)}>Modifier</button>)}
                            {(isAdmin && displayEditConvInfoForm)&&(<EditConversationInfoForm {...conversation} setDisplayEditConvInfoForm={setDisplayEditConvInfoForm}/>)}
                            
                            {displayedCollaborators.length>0 &&(
                                <div>

                                    <p>Ajouter un membre</p>
                                    <Select
                                        options={displayedCollaborators}
                                        isMulti={false}
                                        onChange={onSelectedMembersChange}
                                    />
                                    <button onClick={addMember}>Ajouter</button>
                                </div>
                            )}
                            {editConvError && (<p>{editConvError}</p>)}
                            
                        </div>
                    )}        
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


