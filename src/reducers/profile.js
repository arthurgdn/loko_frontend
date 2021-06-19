const profileReducerDefaultState = {
  firstName: '',
  lastName: '',
  profilePicture: '',
  location: '',
  locationText: '',
  summary: '',
  skills: [],
  keywords: [],
  completedOffers: [],
  recommendations: [],
  collaborators: [],
  setProfileError: '',
  editProfileError: '',
  sendRecommendationError: '',
  addCompletedOfferError: ''
};
const profileReducer = (state=profileReducerDefaultState, action)=>{

  switch(action.type) {
  case 'SET_PROFILE':
    return {...action.profile, setProfileError: ''};
  case 'CLEAR_PROFILE':
    return profileReducerDefaultState;
  case 'EDIT_PROFILE':
    return {
      ...state, ...action.updates, editProfileError: ''
    };
  case 'SEND_RECOMMENDATION':
    return {
      ...state,
      recommendations: [...state.recommendations, action.recommendation],
      sendRecommendationError: ''
    };
  case 'ADD_COMPLETED_OFFER':
    return {
      ...state,
      completedOffers: [...state.completedOffers, action.completedOffer],
      addCompletedOfferError: ''
    };
  case 'SET_PROFILE_ERROR':
    return {...state, setProfileError: 'Erreur lors du chargement du profil'};
  case 'EDIT_PROFILE_ERROR':
    return {...state, editProfileError: 'Erreur lors de la modification du profil'};
  case 'SEND_RECOMMENDATION_ERROR':
    return {...state, sendRecommendationError: 'Erreur lors de la publication'};
  case 'ADD_COMPLETED_OFFER_ERROR':
    return {...state, addCompletedOfferError: 'Erreur lors de l\'ajout de l\'annonce'};
  default:
    return state;
  }
};
export default profileReducer;