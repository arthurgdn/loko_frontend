
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL


export const setMessages = (messages)=>{
    type : 'SET_MESSAGES',
    messages
}

export const startSetMessages = (id) =>{
    return async (dispatch)=>{
        try {
            const res = await axios.get('/messages/conversation/'+id)
            dispatch(setMessages(res.data))
        }catch(e){
            dispatch({
                type : 'ERROR',
                e
        })
        }
    }
}
//We will deal with socket.io connexion when creating the corresponding components
export const addMessage = (message)=>{
    type : 'ADD_MESSAGE',
    message
}

//Same here once the support is added for it
export const removeMessage = (id) =>{
    type:'REMOVE_MESSAGE',
    id
}

