const profileReducerDefaultState = {
    firstName:'',
    lastName:'',
    profilePicture:'',
    location : {
        type:"Point",
        coordinates:[]
    },
    summary : '',
    skills : [],
    keywords : [],
    completedOffers : [],
    collaborators:[]
}
const profileReducer = (state=profileReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_PROFILE':
            return action.profile
        case 'DELETE_USER':
            return userReducerDefaultState
        case 'EDIT_PROFILE':
            return {...state,...action.updates}
        case 'ADD_COMPLETED_OFFER':
            return {...state,completedOffers : [...completedOffers,action.completedOffer]}
        default: 
            return state
    }
}
export default profileReducer