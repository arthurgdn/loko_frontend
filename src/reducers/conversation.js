const conversationReducerDefaultState =
{setConversationError: '', editSpecificConversationError: ''};

const conversationReducer = (state=conversationReducerDefaultState, action)=>{

  switch(action.type) {
  case 'SET_CONVERSATION':
    return {...action.conversation, setConversationError: ''};
  case 'EDIT_SPECIFIC_CONVERSATION':
    return {
      ...state, ...action.updates, editSpecificConversationError: ''
    };
  case 'CLEAR_CONVERSATION':
    return {};
  case 'SET_CONVERSATION_ERROR':
    return {...state, setConversationError: 'Impossible de charger la conversation'};
  case 'EDIT_SPECIFIC_CONVERSATION_ERROR':
    return {
      ...state,
      editSpecificConversationError: 'Impossible de modifier les informations de la conversation'
    };
  default:
    return state;
  }
};
export default conversationReducer;