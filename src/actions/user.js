
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL
export const editUserInfo =  (updates) =>{
    type : 'EDIT_USER_INFO',
    updates
}

export const startEditUserInfo = (updates)=>{
    return async (dispatch,getState)=>{
        try{
        
        await axios.patch('/users/me',JSON.stringify(updates))
        dispatch(editUserInfo(updates))
        }catch(e){
            dispatch({
                type:'ERROR',
                e
            })
        }
    }
}

export const newCollaboration = (collaborator) =>{
    type :'NEW_COLLAB',
    collaborator
}
// collaborator = {_id:collaborator_id}
export const startNewCollaboration = (collaborator)=>{
    return async (dispatch)=>{
        try{
            
            await axios.post('/users/acceptcollab',JSON.stringify(collaborator))
            dispatch(newCollaboration(collaborator))
        }catch(e){
            dispatch({
                type:'ERROR',
                e
            })
        }
    }
}
export const startSendCollaboration = (collaborator)=>{
    return async (dispatch)=>{
    try{
        await axios.post('/users/sendcollabdemand',JSON.stringify(collaborator))
    }catch(e){
        dispatch({
            type: 'ERROR',
            e
        })
    }
}
}
export const startAddPhoneNUmber = (phoneNumber)=>{
    return async (dispatch,getState)=>{
        try{
            
            await axios.post('/users/phone',JSON.stringify({phoneNumber}))
            dispatch({
                type:'ADD_PHONE',
                phoneNumber
            })
        }catch(e){
            dispatch({
                type:'ERROR',
                e
            })
        }
    }
}