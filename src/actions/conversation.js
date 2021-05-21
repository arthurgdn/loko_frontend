
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL;


export const setConversation = (conversation)=>({
    type : 'SET_CONVERSATION',
    conversation
});

export const startSetConversation = (id) =>{

    return async (dispatch)=>{

        try {

            const res = await axios.get('/conversation/'+id);
            console.log(res.data);
            dispatch(setConversation(res.data));

        }catch(e) {

            console.log(e);
            dispatch({
                type : 'SET_CONVERSATION_ERROR'
            });

        }

    };

};
export const startPatchMembers = (id, member, action)=>{

    return async (dispatch)=>{

        try{

            const res =await axios.post('/conversation/'+id+'/member', JSON.stringify({_id:member, action}));
            if(Object.keys(res.data).length>0) {

                dispatch({type: 'EDIT_SPECIFIC_CONVERSATION', updates : {...res.data}});

            }else{

                dispatch({type:'CLEAR_CONVERSATION'});

            }

        }catch(e) {

            dispatch({
                type:'EDIT_SPECIFIC_CONVERSATION_ERROR'
            });

        }

    };

};
export const startAddAdmin = (id, user_id, newStatus)=>{

    return async (dispatch)=>{

        try{
            const res = await axios.post('/conversation/'+id+'/admin', JSON.stringify({_id:user_id, newStatus}));
            dispatch({type: 'EDIT_SPECIFIC_CONVERSATION', updates : {...res.data}});

        }catch(e) {

            dispatch({
                type:'EDIT_SPECIFIC_CONVERSATION_ERROR'
            });

        }

    };

};


