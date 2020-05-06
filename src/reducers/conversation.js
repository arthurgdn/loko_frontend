const conversationReducerDefaultState = {}

const conversationReducer = (state=conversationReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_CONVERSATION':
            return action.conversation
        case 'EDIT_SPECIFIC_CONVERSATION':
            return {...state,...action.updates}
        case 'CLEAR_CONVERSATION':
            return {}
        default: 
            return state
    }
}
export default conversationReducer