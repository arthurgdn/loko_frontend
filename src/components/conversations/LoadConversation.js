import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import { startNewConversation, startSetConversations } from '../../actions/conversations';

const LoadConversation = ({
  startNewConversation,
  startSetConversations,
  conversations,
  history,
  match,
  setConversationsError,
  newConversationError
})=>{

  const [displayedConversations, setDisplayedConversations] = useState({});
  const [error, setError] = useState('');

  useEffect(()=>{
    startSetConversations();
  }, []);
  useEffect(()=>{
    setError(newConversationError);
  }, [newConversationError]);
  useEffect(()=>{
    setError(setConversationsError);
  }, [setConversationsError]);
  useEffect(()=>{
    setDisplayedConversations(conversations);
    if(Array.isArray(displayedConversations)) {
      const existingConversation = conversations.find(
        (conversation)=>
          !!conversation.members.find(
            (member)=>member.member===match.params.id

          )&&conversation.members.length===2);

      if(existingConversation) {
        history.push('/conversation/'+existingConversation._id);
      }else{

        startNewConversation({members: [{member: match.params.id}]});
        history.push('/conversations');
      }
    }

  }, [conversations, startSetConversations]);


  return (
    <div>
      <button onClick = {()=>{
        history.goBack();
      }} value="<-" ></button>
      <div>{error && <p>{error}</p>}</div>
    </div>

  );
};
const mapStateToProps = (state)=>({

  conversations: state.conversations.conversations,
  newConversationError: state.conversations.newConversationError,
  setConversationsError: state.conversations.setConversationsError
});
const mapDispatchToProps = (dispatch)=>({
  startNewConversation: (conversation)=>dispatch(startNewConversation(conversation)),
  startSetConversations: ()=>dispatch(startSetConversations())
});
export default connect(mapStateToProps, mapDispatchToProps)(LoadConversation);