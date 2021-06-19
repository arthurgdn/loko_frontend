const commentsReducerDefaultState = {
  newCommentError: '', setCommentsError: '', comments: []
};

const commentsReducer = (state=commentsReducerDefaultState, action)=>{

  switch(action.type) {
  case 'SET_COMMENTS':
    const filteredState=state.comments.filter(
      ({offer_id})=>offer_id!==action.id);
    return {
      setCommentsError: '',
      comments: [...filteredState, {offer_id: action.id, comments: action.comments}]
    };
  case 'NEW_COMMENT':
    const associatedComments = state.comments.find(({offer_id})=>offer_id===action.id);
    const newFilteredState=state.comments.filter(({offer_id})=>offer_id!==action.id);
    return {
      newCommentError: '',
      comments: [...newFilteredState,
        {offer_id: action.id, comments: [action.comment, ...associatedComments.comments]}]
    };
  case 'NEW_COMMENT_ERROR':
    return {...state, newCommentError: 'Impossible de publier le commentaire'};
  case 'SET_COMMENTS_ERROR':
    return {...state, setCommentsError: 'Impossible de charger les commentaires'};
  default:
    return state;
  }
};
export default commentsReducer;