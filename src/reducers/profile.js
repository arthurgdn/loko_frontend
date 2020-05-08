const profileReducerDefaultState = {
    firstName:'',
    lastName:'',
    profilePicture:'',
    location : '',
    locationText:'',
    summary : '',
    skills : [],
    keywords : [],
    completedOffers : [],
    recommendations : [],
    collaborators:[]
}
const profileReducer = (state=profileReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_PROFILE':
            return action.profile
        case 'CLEAR_PROFILE':
            return profileReducerDefaultState
        case 'EDIT_PROFILE':
            return {...state,...action.updates}
        case 'SEND_RECOMMENDATION':
            return {...state,recommendations : [...state.recommendations,action.recommendation] }
        case 'ADD_COMPLETED_OFFER':
            return {...state,completedOffers : [...completedOffers,action.completedOffer]}
        default: 
            return state
    }
}
export default profileReducer