
export const setTextFilter= (text='')=>({ 
    type:'SET_TEXT_FILTER',
    text
})

export const sortByPoints= ()=>({ 
    type:'SORT_BY_POINTS'
})

export const sortByDate= ()=>({ 
    type:'SORT_BY_DATE'
})


export const setDistanceRadius = (radius)=>({
    type : 'SET_DISTANCE_RADIUS',
    radius
})
