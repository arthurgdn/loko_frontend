
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL


export const setConversations = (conversations)=>({
    type : 'SET_CONVERSATIONS',
    conversations
})

export const startSetConversations = () =>{
    return async (dispatch)=>{
        try {
            const res = await axios.get('/conversations/me')
            dispatch(setConversations(res.data))
        }catch(e){
            console.log(e)
            dispatch({
                type : 'SET_CONVERSATIONS_ERROR'
        })
        }
    }
}

export const newConversation = (conversation)=>({
    type : 'NEW_CONVERSATION',
    conversation
})

export const startNewConversation = (conv_data)=>{
    return async (dispatch)=>{
        try {
            const res = await axios.post('/conversation',JSON.stringify(conv_data))
            dispatch(newConversation(res.data))
        }catch(e){
            dispatch({
                type : 'NEW_CONVERSATION_ERROR',
                e
            })
        }
    }
}

export const removeConversation = (id)=>({
    type : 'REMOVE_CONVERSATION',
    id
})

export const startRemoveConversation = (id)=>{
    return async (dispatch)=>{
        try {
            const res = await axios.delete('/conversation/'+id)
            dispatch(removeConversation(id))
        }catch(e){
            dispatch({
                type : 'REMOVE_CONVERSATION_ERROR'
            })
        }
    }
}

export const editConversation =  (id,updates) =>({
    type : 'EDIT_CONVERSATION',
    id,
    updates
})

export const startEditConversation = (id,updates,image={})=>{
    return async (dispatch)=>{
        try{
            
            const res = await axios.patch('/conversation/'+id,JSON.stringify(updates))
            console.log('edit return',res.data)
            if(image.name){
                const imageBody = new FormData()
            
                imageBody.append('image',image)
                
                const buffer = await axios.post('/conversation/'+id+'/image',imageBody)
                
                dispatch(editConversation(id,res.data))
                dispatch({type: 'EDIT_SPECIFIC_CONVERSATION',updates : res.data})
            }else{
                dispatch(editConversation(id,{...res.data,image:{}}))
                dispatch({type: 'EDIT_SPECIFIC_CONVERSATION',updates : res.data})
            }
        }catch(e){
            console.log(e)
            dispatch({
                type:'EDIT_SPECIFIC_CONVERSATION_ERROR'
            })
        }
    }
}

