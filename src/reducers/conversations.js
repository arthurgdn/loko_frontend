const conversationsReducerDefaultState = []

const conversationsReducer = (state=conversationsReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_CONVERSATIONS':
            return action.conversations
        case 'NEW_CONVERSATION':
            return [...state,action.conversation]
        case 'REMOVE_CONVERSATION':
            return state.filter(({_id})=>_id!==action.id)
        case 'EDIT_CONVERSATION':
            return state.map((conversation)=>{
                if(conversation._id===action.id){
                   
                    return {...conversation,
                        ...action.updates}
                }else{
                    return conversation
                }
            }) 
        default: 
            return state
    }
}
export default conversationsReducer