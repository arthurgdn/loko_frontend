const feedReducerDefaultState = {setFeedError: '', feed: []};

const feedReducer = (state=feedReducerDefaultState, action)=>{

  switch(action.type) {
  case 'SET_FEED':
    return {setFeedError: '', feed: action.feed};
  case 'SET_FEED_ERROR':
    return {...state, setFeedError: 'Erreur lors du chargement du fil d\'actualité'};
  default:
    return state;
  }
};
export default feedReducer;