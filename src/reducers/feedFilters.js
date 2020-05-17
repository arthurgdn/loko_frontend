
const feedFiltersReducerDefaultState = {
    text:'',
    sortBy:'points',
    distanceRadius : 50
}

const feedFiltersReducer = (state=feedFiltersReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {...state, text:action.text}
        case 'SORT_BY_POINTS':
            return {...state,sortBy:'points'}
        case 'SORT_BY_DATE':
            return {...state,sortBy:'date'}
        case 'SET_DISTANCE_RADIUS':
            return {...state,distanceRadius:action.radius}
        default: 
            return state
    }
}
export default feedFiltersReducer