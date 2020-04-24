const conversationsReducerDefaultState = []

const conversationsReducer = (state=conversationsReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_CONVERSATIONS':
            return action.conversations
        case 'NEW_CONVERSATION':
            return [...state,action.conversation]
        case 'REMOVE_CONVERSATION':
            return state.filter(({id})=>id!==action.id)
         
        default: 
            return state
    }
}
export default conversationsReducer