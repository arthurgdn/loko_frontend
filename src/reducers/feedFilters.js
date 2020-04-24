const feedFiltersReducerDefaultState = {
    text:'',
    sortBy:'points',
    startDate:moment().startOf('month'),
    endDate:moment().endOf('month'),
    locationRadius : 50
}

const feedFiltersReducer = (state=feedFiltersReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {...state, text:action.text}
        case 'SORT_BY_POINTS':
            return {...state,sortBy:'points'}
        case 'SORT_BY_DATE':
            return {...state,sortBy:'date'}
        case 'SET_START_DATE':
            return {...state,startDate:action.date}
        case 'SET_END_DATE':
            return {...state,endDate:action.date}
        case 'SET_LOCATION_RADIUS':
            return {...state,locationRadius:action.radius}
        default: 
            return state
    }
}
export default feedFiltersReducer