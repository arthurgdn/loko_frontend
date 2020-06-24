const keywordOffersReducerDefaultState = {setKeywordFeedError:'',keywordOffers:[],keywordName:''}
const keywordOffersReducer = (state=keywordOffersReducerDefaultState,action)=>{
    
    switch(action.type){
        case 'SET_KEYWORD_FEED':
            return {setKeywordFeedError:'',keywordName:action.name,keywordOffers:action.feed}
        case 'SET_KEYWORD_FEED_ERROR':
            return {...state,setKeywordFeedError:'Erreur lors du chargement des annonces'}
        default: 
            return state
    }
}
export default keywordOffersReducer