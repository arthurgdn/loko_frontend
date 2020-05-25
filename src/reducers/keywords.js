

const keywordsReducer = (state=[],action)=>{
    
    switch(action.type){
        case 'SET_ALL_KEYWORDS':
            return action.keywords
        case 'SET_ALL_KEYWORDS_ERROR':
            return []
        default: 
            return state
    }
}
export default keywordsReducer