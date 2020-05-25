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
    userGroups : [],
    setUserError:'',
    editUserInfoError:'',
    newCollabError:'',
    setCollaborationDemandsError:'',
    setCollaboratorsError:'',
    userGroupCreatedError:''
}
const userReducer = (state=userReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_USER':
            return {...action.user,setUserError:''}
        case 'CLEAR_USER':
            return userReducerDefaultState
        case 'EDIT_USER_INFO':
            return {...state,...action.updates, editUserInfoError:''}
        case 'NEW_COLLAB':
            return {...state,collaborators : [...state.collaborators,action.collaborator],newCollabError:''}
        case 'SET_COLLABORATION_DEMANDS':
            return {...state,collaborationDemands : action.collaborationDemands,setCollaborationDemandsError:''}
        case 'SET_COLLABORATORS':
            return {...state,collaborators : action.collaborators,setCollaboratorsError:''}
        case 'ADD_PHONE':
            return {...state,phoneNumber : action.phoneNumber,error:''}   
        case 'USER_GROUP_CREATED' :
            return {...state,userGroups : [...state.userGroups,action.group],userGroupCreatedError:''} 
        case 'REMOVE_COLLAB_DEMAND':
            return {...state,error:'',collaborationDemands : state.collaborationDemands.filter((demand)=>demand.demand!==action.collaborator)}
        case 'SET_USER_ERROR':
            return {...state,setUserError:'Erreur lors du chargement de votre compte'}
        case 'EDIT_USER_INFO_ERROR':
            return {...state, editUserInfoError:'Erreur lors de la modification des informations'}
        case 'NEW_COLLAB_ERROR':
            return {...state,newCollabError:"Erreur lors la suppression de la demande"}
        case 'SET_COLLABORATION_DEMANDS_ERROR':
            return {...state,setCollaborationDemandsError:'Erreur lors du chargement des demandes'}
        case 'SET_COLLABORATORS_ERROR':
            return {...state,setCollaboratorsError:'Erreur lors du chargement des personnes suivies'}
        case 'USER_GROUP_CREATED_ERROR':
            return {...state,userGroupCreatedError:'Erreur lors de la création du groupe'}

        default: 
            return state
    }
}
export default userReducer