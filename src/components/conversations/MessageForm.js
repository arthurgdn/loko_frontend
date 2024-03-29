import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {startSendMessage} from '../../actions/messages';
const MessageForm = ({
  conv_id, socket, startSendMessage, addMessageError
})=>{
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  useEffect(()=>{
    setError(addMessageError);
  }, [addMessageError]);
  const onSubmit = (e)=>{
    e.preventDefault();

    startSendMessage(socket, conv_id, message.replace(/\n\r?/g, '<br />'));
    setMessage('');
  };
  const disabled = message.length===0;
  return (
    <form onSubmit={onSubmit} className="offer-element__comment-form">

      <textarea
        className="offer-element__comment-text"
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        autoFocus
        autoComplete="off"></textarea>
      <input
        className="offer-element__comment-button"
        type="submit"
        value="Envoyer"
        disabled={disabled}
      />
      {error && <p>{error}</p>}
    </form>
  );
};
const mapStateToProps = (state)=>({
  socket: state.socket,
  addMessageError: state.messages.addMessageError
});
const mapDispatchToProps= (dispatch)=>
  ({
    startSendMessage: (socket, conv_id, message)=>
      dispatch(startSendMessage(socket, conv_id, message))
  });
export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);