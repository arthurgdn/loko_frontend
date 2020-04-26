
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL


export const setConversations = (conversations)=>{
    type : 'SET_CONVERSATIONS',
    conversations
}

export const startSetConversations = () =>{
    return async (dispatch)=>{
        try {
            const res = await axios.get('/conversations/me')
            dispatch(setConversations(res.data))
        }catch(e){
            dispatch({
                type : 'ERROR',
                e
        })
        }
    }
}

export const newConversation = (conversation)=>{
    type : 'NEW_CONVERSATION',
    conversation
}

export const startNewConversation = (conv_data)=>{
    return async (dispatch)=>{
        try {
            const res = await axios.post('/conversation',JSON.stringify(conv_data))
            dispatch(newConversation(res.data))
        }catch(e){
            dispatch({
                type : 'ERROR',
                e
            })
        }
    }
}

export const removeConversation = (id)=>{
    type : 'REMOVE_CONVERSATION',
    id
}

export const startRemoveConversation = (id)=>{
    return async (dispatch)=>{
        try {
            const res = await axios.delete('/conversation/'+id)
            dispatch(removeConversation(id))
        }catch(e){
            dispatch({
                type : 'ERROR',
                e
            })
        }
    }
}

