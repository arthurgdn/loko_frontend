
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

export const setStartDate = (date)=>({
    type:'SET_START_DATE',
    date
})
export const setLoCationRadius = (radius)=>({
    type : 'SET_LOCATION_RADIUS',
    radius
})
export const setEndDate = (date)=>({
    type:'SET_END_DATE',
    date
})