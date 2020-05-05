const userReducerDefaultState = {
    firstName:'',
    lastName:'',
    email:'',
    profilePicture:'',
    location : {
        type:"Point",
        coordinates:[]
    },
    locationText:'',
    collaborators:[],
    userKeywords : [],
    userGroups : []
}
const userReducer = (state=userReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_USER':
            return action.user
        case 'CLEAR_USER':
            return userReducerDefaultState
        case 'EDIT_USER_INFO':
            return {...state,...action.updates}
        case 'NEW_COLLAB':
            return {...state,collaborators : [...state.collaborators,action.collaborator]}
        case 'ADD_PHONE':
            return {...state,phoneNumber : action.phoneNumber}    
        default: 
            return state
    }
}
export default userReducer