const messagesReducerDefaultState = []

const messagesReducer = (state=messagesReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_MESSAGES':
            return action.messages
        case 'ADD_MESSAGE':
            return [...state,action.message]
        case 'REMOVE_MESSAGE':
            return state.filter(({id})=>id!==action.id)
         
        default: 
            return state
    }
}
export default messagesReducer