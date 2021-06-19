

//Action liées à l'affichage individuel d'un groupe, création, edition d'info
const groupReducer = (state={setGroupError: ''}, action)=>{

  switch(action.type) {
  case 'SET_GROUP':
    return {...action.group, setGroupError: ''};
  case 'SET_GROUP_ERROR':
    return {...state, setGroupError: 'Erreur lors du chargement du groupe'};
  default:
    return state;
  }
};
export default groupReducer;