const groupOffersReducerDefaultState = []
const keywordOffersReducer = (state=groupOffersReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_OFFERS':
            return action.offers
        case 'ADD_OFFER':
            return [...state,action.offer]
        case 'EDIT_OFFER':
            return state.map((offer)=>{
                if(offer.id===action.id){
                   
                    return {...offer,
                        ...action.updates}
                }else{
                    return offer
                }
            })
        case 'REMOVE_OFFER':
            return state.filter(({id})=>id!==action.id)
            
        default: 
            return state
    }
}
export default groupOffersReducer