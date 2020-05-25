const offersReducerDefaultState = {setOffersError:'',addOfferError:'',editOfferError:'',removeOfferError:'',offers:[]}

//Reducer for user's offers (created + collaborating on)
const offersReducer = (state=offersReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_OFFERS':
            return {setOffersError:'',offers:action.offers}
        case 'ADD_OFFER':
            return {addOfferError:'',offers:[...(state.offers),action.offer]}
        case 'EDIT_OFFER':
            return {editOfferError:'',offers:state.offers.map((offer)=>{
                if(offer._id===action.id){
                   
                    return {...offer,
                        ...action.updates}
                }else{
                    return offer
                }
            })}
        case 'REMOVE_OFFER':
            return {removeOfferError:'',offers:state.offers.filter(({_id})=>_id!==action.id)}
        case 'SET_OFFERS_ERROR':
            return {...state,setOffersError:'Erreur lors du chargement des annonces'}
        case 'ADD_OFFER_ERROR':
            return {...state,addOfferError:"Erreur lors de la publication de l'annonce"}
        case 'EDIT_OFFER_ERROR':
            return {...state,editOfferError:"Erreur de la modification de l'annonce"}
        case 'REMOVE_OFFER_ERROR':
            return {...state,removeOfferError:"Erreur lors de la suppression de l'annonce"}
        default: 
            return state
    }
}
export default offersReducer