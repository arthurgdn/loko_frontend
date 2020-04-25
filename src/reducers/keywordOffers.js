const keywordOffersReducerDefaultState = []
const keywordOffersReducer = (state=keywordOffersReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_KEYWORD_FEED':
            return action.feed
        default: 
            return state
    }
}
export default keywordOffersReducer