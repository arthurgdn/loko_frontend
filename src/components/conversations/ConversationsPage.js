import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import ConversationsList from './ConversationsList'
import {startSetCollaborators, startNewCollaboration} from '../../actions/user'
import { startNewConversation,startSetConversations } from '../../actions/conversations'
const ConversationsPage = ({collaborators,startSetCollaborators,startNewConversation,startSetConversations,conversations,history})=>{
    const [displayNewConvForm,setDisplayNewConvForm] = useState(false)
    const [members,setMembers] = useState([])
    const [displayedCollaborators,setDisplayedCollaborators] = useState([])
    const [displayedConversations,setDisplayedConversations] = useState([])
    const [error,setError] = useState('')
    
    useEffect(()=>{
        startSetConversations()
    },[])
    useEffect(()=>{
        setDisplayedConversations(conversations)
    },[conversations,startSetConversations])
    useEffect(()=>{
        startSetCollaborators()
    },[])
    useEffect(()=>{
        //On vérifie qu'on a le bon format pour la liste des collaborateurs
        if((collaborators.length>0 && Object.keys(collaborators[0]).length===3)||collaborators.length===0){
            const formattedCollaborators = []
            for (const collaborator of collaborators){
                formattedCollaborators.push({collaborator : collaborator.collaborator,value:collaborator.collaborator,label:collaborator.firstName + ' '+collaborator.lastName})
            }
            setDisplayedCollaborators(formattedCollaborators)
        }
    },[collaborators,startSetCollaborators])
    const onSelectedMembersChange = (collaborators)=>{
        setMembers(collaborators)
    }
    
    const createConversation = ()=>{
        if(members.length===0){
            setError('Veuillez renseigner un membre')
        }else {
            
        if(members.length===1){
            //On regarde si la conversation existe déjà et dans ce cas la on redirige vers celle-ci
            const existingConversation = displayedConversations.find((conversation)=>!!conversation.members.find((member)=>member.member===members[0].value))
            if(existingConversation){
                
                history.push('/conversation/'+existingConversation._id)
            }else{
                const formattedMembers = []
                for (const member of members){
                    formattedMembers.push({member:member.value})
                }
        
                startNewConversation({members:formattedMembers})
                
            }
        }else{
            const formattedMembers = []
            for (const member of members){
                formattedMembers.push({member:member.value})
            }
            
            startNewConversation({members:formattedMembers})
            
        }
        }
        
    }
    return (
        <div>
            <button onClick={()=>setDisplayNewConvForm(!displayNewConvForm)}>+</button>
            {displayNewConvForm && (
                <div>
                    <Select
                        options={displayedCollaborators}
                        isMulti
                        onChange={onSelectedMembersChange}
                    />
                    <button onClick={createConversation} active={(members.length>0).toString()}>Démarrer</button>
                </div>
                )}
            <ConversationsList displayedConversations={displayedConversations}/>
        </div>
    )
}
const mapStateToProps = (state)=>({
    collaborators : state.user.collaborators,
    conversations : state.conversations
})
const mapDispatchToProps = (dispatch)=>({
    startSetCollaborators : ()=>dispatch(startSetCollaborators()),
    startNewConversation : (conversation)=>dispatch(startNewConversation(conversation)),
    startSetConversations : ()=>dispatch(startSetConversations())
})
export default connect(mapStateToProps,mapDispatchToProps)(ConversationsPage)