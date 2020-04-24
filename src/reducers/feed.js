const feedReducerDefaultState = []

const feedReducer = (state=feedReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_FEED':
            return action.feed
       
        default: 
            return state
    }
}
export default feedReducer