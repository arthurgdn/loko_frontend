const groupOffersReducerDefaultState = {
  setGroupOffersError: '', addGroupOfferError: '', groupOffers: []
};
const groupOffersReducer = (state=groupOffersReducerDefaultState, action)=>{

  switch(action.type) {
  case 'SET_GROUP_OFFERS':
    return {setGroupOffersError: '', groupOffers: action.offers};
  case 'ADD_GROUP_OFFER':
    return {addGroupOfferError: '', groupOffers: [...state.groupOffers, action.offer]};
  case 'EDIT_GROUP_OFFER':
    return {
      error: '', groupOffers: state.groupOffers.map((offer)=>{
        if(offer.id===action.id) {

          return {
            ...offer,
            ...action.updates
          };
        }else{
          return offer;
        }
      })
    };
  case 'REMOVE_GROUP_OFFER':
    return {error: '', groupOffers: state.groupOffers.filter(({id})=>id!==action.id)};
  case 'SET_GROUP_OFFERS_ERROR':
    return {...state, setGroupOffersError: 'Erreur lors du chargement des annonces'};
  case 'ADD_GROUP_OFFER_ERROR':
    return {...state, addGroupOfferError: 'Erreur lors de la création de l\'annonce'};
  default:
    return state;
  }
};
export default groupOffersReducer;