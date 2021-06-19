
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL;
import io from 'socket.io-client';


export const setMessages = (messages)=>({
  type: 'SET_MESSAGES',
  messages
});

export const startSetMessages = (id, token) =>{
  return async (dispatch)=>{
    try {

      const socket = io.connect(
        process.env.DEV_URL,
        {transportOptions: {polling: {extraHeaders: {Authorization: 'Bearer ' + token}}}});
      const res = await axios.get('/messages/conversation/'+id);
      dispatch(setMessages(res.data));
      //On rejoint la salle associée à la conversation
      socket.emit('join', id, (error)=>{
        if(error) {
          dispatch({type: 'ERROR', error});
        }
      });
      //On ajoute l'évenement pour les messages reçus
      socket.on('messageReceived', (message)=>{
        console.log('we receive a message from back');
        dispatch(addMessage(message));
      });

      socket.on('disconnect', ()=>{
        dispatch({type: 'REMOVE_SOCKET'});
      });
      //On ajoute le socket créé dans le store
      dispatch({type: 'SET_SOCKET', socket});


    }catch(e) {
      dispatch({type: 'SET_MESSAGES_ERROR'});
    }
  };
};

export const addMessage = (message)=>({
  type: 'ADD_MESSAGE',
  message
});

export const startSendMessage = (socket, conv_id, message)=>{
  return async (dispatch)=>{
    console.log('emitting', message);
    socket.emit('messageSent', {conv_id, message}, (error)=>{
      if(error) {
        dispatch({type: 'ADD_MESSAGE_ERROR'});

      }


    });
  };
};

//Same here once the support is added for it
export const removeMessage = (id) =>({
  type: 'REMOVE_MESSAGE',
  id
});

