const commentsReducerDefaultState = []

const commentsReducer = (state=commentsReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_COMMENTS':
            const filteredState=state.filter(({offer_id})=>offer_id!==action.id)
            return [...filteredState,{offer_id : action.id,comments : action.comments}]
            
        case 'NEW_COMMENT':
            const associatedComments = state.find(({offer_id})=>offer_id===action.id)
            const newFilteredState=state.filter(({offer_id})=>offer_id!==action.id)
            return [...newFilteredState,{offer_id: action.id, comments : [action.comment,...associatedComments.comments]}]
        
        default: 
            return state
    }
}
export default commentsReducer