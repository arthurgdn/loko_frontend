const socketReducer = (state = {},action)=>{
    switch(action.type){
        case 'SET_SOCKET':
            return action.socket
        case 'REMOVE_SOCKET':
            return {}
        default: 
            return state
    }
}
export default socketReducer