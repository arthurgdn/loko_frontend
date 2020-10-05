const conversationsReducerDefaultState = {setConversationsError:'',newConversationError:'',removeConversationError:'',conversations:[]}

const conversationsReducer = (state=conversationsReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_CONVERSATIONS':
            return {setConversationsError:'',conversations:action.conversations}
        case 'NEW_CONVERSATION':
            return {newConversationError:'',conversations:[...(state.conversations),action.conversation]}
        case 'REMOVE_CONVERSATION':
            return {removeConversationError:'',conversations:state.conversations.filter(({_id})=>_id!==action.id)}
        case 'EDIT_CONVERSATION':
            return {error:'',conversations:state.conversations.map((conversation)=>{
                if(conversation._id===action.id){
                    return {...conversation,...action.updates}
                }else{
                    return conversation
                }
            }) }
        case 'SET_CONVERSATIONS_ERROR':
            return {...state,setConversationsError:'Erreur lors du chargement des conversations'}
        case 'NEW_CONVERSATION_ERROR':
            return {...state,newConversationrror:'Erreur lors de la création de la conversation'}
        case 'REMOVE_CONVERSATION_ERROR':
            return {...state,removeConversationError:'Erreur lors de la suppression de la conversation'}
        default: 
            return state
    }
}
export default conversationsReducer