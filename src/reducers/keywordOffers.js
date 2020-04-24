const keywordOffersReducerDefaultState = []
const keywordOffersReducer = (state=keywordOffersReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_OFFERS':
            return action.offers
        default: 
            return state
    }
}
export default keywordOffersReducer