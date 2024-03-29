
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL;
export const editOffer =  (id, updates) =>({
  type: 'EDIT_OFFER',
  id,
  updates
});

export const startEditOffer = (id, updates, image={})=>{
  return async (dispatch)=>{
    try{

      const res = await axios.patch('/offer/'+id, JSON.stringify(updates));
      if(image.name) {
        const imageBody = new FormData();

        imageBody.append('image', image);

        await axios.post('/offer/'+id+'/image', imageBody);
        dispatch(editOffer(id, {...res.data, hasImage: true}));
      }else{
        dispatch(editOffer(id, res.data));
      }
    }catch(e) {

      dispatch({type: 'SET_EDIT_OFFER_ERROR'});
    }
  };
};

export const setOffers = (offers)=>({
  type: 'SET_OFFERS',
  offers
});

export const startSetOffers = () =>{
  return async (dispatch)=>{

    try {


      const res = await axios.get('/offers/collaborated/me');

      dispatch(setOffers(res.data?res.data:[]));
    }catch(e) {

      dispatch({type: 'SET_OFFERS_ERROR'});
    }
  };
};
export const addOffer = (offer)=>({
  type: 'ADD_OFFER',
  offer
});
export const startAddOffer = (offer, image)=>{
  return async (dispatch)=>{
    try {

      const res = await axios.post('/offer/create', JSON.stringify(offer));

      if(image.name) {
        const imageBody = new FormData();

        imageBody.append('image', image);

        await axios.post('/offer/'+res.data._id+'/image', imageBody);
        dispatch(addOffer({...res.data, hasImage: true}));
      }else{
        dispatch(addOffer(res.data));
      }
      if(res.data.scope==='group') {
        console.log('group data offer', res.data);
        dispatch({
          type: 'ADD_GROUP_OFFER',
          offer: res.data
        });
      }

    }catch(e) {
      console.log(e);
      dispatch({type: 'ADD_OFFER_ERROR'});
    }
  };
};

export const removeOffer = (id) =>({
  type: 'REMOVE_OFFER',
  id
});

export const startRemoveOffer = (id)=>{
  return async (dispatch)=>{
    try {
      await axios.delete('/offer/'+id);
      dispatch(removeOffer(id));
    }catch(e) {

      dispatch({
        type: 'REMOVE_OFFER_ERROR',
        e
      });
    }

  };
};

export const startSendCollaborationDemand = (id, message)=>{
  return async (dispatch)=>{
    try{
      console.log('envoi');
      await axios.post('/offer/'+id+'/demand', JSON.stringify({message}));
    }catch(e) {
      console.log(e);
      dispatch({
        type: 'ERROR',
        e
      });
    }
  };
};