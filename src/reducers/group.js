

//Action liées à l'affichage individuel d'un groupe, création, edition d'info
const groupReducer = (state={},action)=>{
    
    switch(action.type){
        case 'SET_GROUP':
            return action.group
        default: 
            return state
    }
}
export default groupReducer