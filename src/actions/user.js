
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL;
export const editUserInfo =  (updates) =>({
  type: 'EDIT_USER_INFO',
  updates
});

export const startEditUserInfo = (updates, profilePicture)=>{
  return async (dispatch)=>{
    try{

      await axios.patch('/users/me', JSON.stringify(updates));
      console.log(profilePicture);
      if(profilePicture!=='') {
        const imageBody = new FormData();

        imageBody.append('avatar', profilePicture);

        const buffer = await axios.post('/users/me/avatar', imageBody);

        dispatch(editUserInfo({...updates, profilePicture: buffer.data}));
      }  else{
        dispatch(editUserInfo(updates));
      }

    }catch(e) {
      console.log(e);
      dispatch({
        type: 'EDIT_USER_INFO_ERROR',
        e
      });
    }
  };
};
export const setCollaborators = (collaborators) =>({
  type: 'SET_COLLABORATORS',
  collaborators
});
export const startSetCollaborators = ()=>{
  return async (dispatch)=>{
    try{
      const res = await axios.get('/users/collab');
      dispatch(setCollaborators(res.data));
    }catch(e) {
      dispatch({
        type: 'SET_COLLABORATORS_ERROR',
        e
      });
    }
  };
};
export const setCollaborationDemands = (collaborationDemands) =>({
  type: 'SET_COLLABORATION_DEMANDS',
  collaborationDemands
});
export const startSetCollaborationDemands = ()=>{
  return async (dispatch)=>{
    try{
      const res = await axios.get('/users/collabdemands');
      dispatch(setCollaborationDemands(res.data));
    }catch(e) {
      dispatch({
        type: 'SET_COLLABORATION_DEMANDS_ERROR',
        e
      });
    }
  };
};
export const removeCollaborationDemand = (collaborator)=>({
  type: 'REMOVE_COLLAB_DEMAND',
  collaborator
});
export const newCollaboration = (collaborator) =>({
  type: 'NEW_COLLAB',
  collaborator
});
// collaborator = {_id:collaborator_id}
export const startNewCollaboration = (collaborator, status)=>{
  return async (dispatch)=>{
    try{
      console.log(collaborator, status);
      const res = await axios.post(
        '/users/sortcollab',
        JSON.stringify({_id: collaborator, status})
      );
      if(status==='accept') {
        dispatch(newCollaboration(res.data));
        console.log(res.data);
      }
      dispatch(removeCollaborationDemand(collaborator));

    }catch(e) {
      console.log(e);
      dispatch({
        type: 'NEW_COLLAB_ERROR',
        e
      });
    }
  };
};
export const startSendCollaboration = (collaborator)=>{
  return async (dispatch)=>{
    try{
      await axios.post('/users/sendcollabdemand', JSON.stringify(collaborator));
    }catch(e) {
      dispatch({
        type: 'ERROR',
        e
      });
    }
  };
};

export const changePassword = (currentPass, password)=>{
  return async (dispatch)=>{
    try{

      await axios.patch('/users/me/password', {currentPass, password});
    }catch(e) {
      dispatch({
        type: 'ERROR',
        e
      });
    }
  };
};

export const deleteAccount = (password)=>{
  return async (dispatch)=>{
    try{
      console.log(password);
      await axios.post('/users/me/delete', {password});
      localStorage.removeItem('token');
      dispatch({type: 'LOGOUT'});
      dispatch({type: 'CLEAR_USER'});
    }catch(e) {
      dispatch({
        type: 'LOGOUT_ERROR',
        e
      });
    }
  };
};
export const startAddPhoneNUmber = (phoneNumber)=>{
  return async (dispatch)=>{
    try{

      await axios.post('/users/phone', JSON.stringify({phoneNumber}));
      dispatch({
        type: 'ADD_PHONE',
        phoneNumber
      });
    }catch(e) {
      dispatch({
        type: 'ADD_PHONE_ERROR',
        e
      });
    }
  };
};

export const startAddUserKeyword = (id)=>{
  return async (dispatch)=>{
    try{
      const res = await axios.post('/keyword/'+id+'/follow');
      console.log(res.data, 'data received from back');
      dispatch({
        type: 'ADD_USER_KEYWORD',
        keyword: res.data
      });
    }catch(e) {
      console.log(e);
    }
  };
};