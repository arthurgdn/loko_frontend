const messagesReducerDefaultState = {setMessagesError:'',addMessageError:'',messages:[]}

const messagesReducer = (state=messagesReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_MESSAGES':
            return {setMessagesError:'',messages:action.messages}
        case 'ADD_MESSAGE':
            return {addMessageError:'',messages:[...(state.messages),action.message]}
        case 'REMOVE_MESSAGE':
            return {error:'',messages:state.messages.filter(({id})=>id!==action.id)}
        case 'SET_MESSAGES_ERROR':
            return {...state,setMessagesError:'Erreur lors du chargement des messages'}
        case 'ADD_MESSAGE_ERROR':
            return {...state,addMessageError:"Erreur lors de l'envoi du message"}
        default: 
            return state
    }
}
export default messagesReducer