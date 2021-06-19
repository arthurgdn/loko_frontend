import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {startSetMessages} from '../../actions/messages';
import MessageElement from './MessageElement';
import MessageForm from './MessageForm';
const Messages = ({
  messages, socket, startSetMessages, conv_id, token, setMessagesError, user_id
})=>{
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [error, setError] = useState('');
  const messageContainer = React.createRef();
  useEffect(()=>{
    return ()=>{
      if(Object.keys(socket).length>0) {
        socket.disconnect();
      }
    };
  }, [socket]);

  useEffect(()=>{
    startSetMessages(conv_id, token);

  }, []);
  useEffect(()=>{
    setError(setMessagesError);
  }, [setMessagesError]);
  useEffect(()=>{
    if(messages.length>0 && messages[0].conversation===conv_id) {

      setDisplayedMessages(messages);

    }

  }, [messages, startSetMessages]);
  useEffect(()=>{
    autoscroll();
  }, [displayedMessages]);
  //Method for autscrolling messages when new message appears
  const autoscroll = ()=>{
    const $messages =  messageContainer.current;
    if($messages) {
      const containerHeight = $messages.scrollHeight;
      messageContainer.current.scrollTop = containerHeight;

    }
  };


  return (
    <div className="conversation__messages-container" >

      {!displayedMessages.length>0? !error && <p>Envoyez le premier message !</p>
        : <div ref={messageContainer} className="conversation__messages-list">
          {displayedMessages.map((message)=>
            <MessageElement key={message._id} {...message} user_id={user_id}/>)}
        </div>

      }
      {error && <p>{error}</p>}
      <MessageForm conv_id={conv_id}/>
    </div>

  );
};
const mapStateToProps = (state)=>({
  messages: state.messages.messages,
  socket: state.socket,
  token: state.auth.token,
  setMessagesError: state.messages.setMessagesError
});
const mapDispatchToProps = (dispatch)=>
  ({startSetMessages: (id, token)=>dispatch(startSetMessages(id, token))});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);