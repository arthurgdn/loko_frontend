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
    collaborationDemands:[],
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
        case 'SET_COLLABORATION_DEMANDS':
            return {...state,collaborationDemands : action.collaborationDemands}
        case 'SET_COLLABORATORS':
            return {...state,collaborators : action.collaborators}
        case 'ADD_PHONE':
            return {...state,phoneNumber : action.phoneNumber}    
        case 'REMOVE_COLLAB_DEMAND':
            return {...state,collaborationDemands : state.collaborationDemands.filter((demand)=>demand.demand!==action.collaborator)}
        default: 
            return state
    }
}
export default userReducer