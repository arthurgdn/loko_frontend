const offersReducerDefaultState = []

//Reducer for user's offers (created + collaborating on)
const offersReducer = (state=offersReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_OFFERS':
            return action.offers
        case 'ADD_OFFER':
            return [...state,action.offer]
        case 'EDIT_OFFER':
            return state.map((offer)=>{
                if(offer._id===action.id){
                   
                    return {...offer,
                        ...action.updates}
                }else{
                    return offer
                }
            })
        case 'REMOVE_OFFER':
            return state.filter(({_id})=>_id!==action.id)
         
        default: 
            return state
    }
}
export default offersReducer