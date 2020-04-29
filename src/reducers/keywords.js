

const keywordsReducer = (state=[],action)=>{
    
    switch(action.type){
        case 'SET_ALL_KEYWORDS':
            return action.keywords
       
        default: 
            return state
    }
}
export default keywordsReducer