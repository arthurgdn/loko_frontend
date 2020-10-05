const errorReducer = (state={},action)=>{
    switch(action.type){
        case 'ERROR':
            return action.e
        default: 
            return state
    }
}
export default errorReducer