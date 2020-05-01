
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL
export const editUserInfo =  (updates) =>({
    type : 'EDIT_USER_INFO',
    updates
})

export const startEditUserInfo = (updates,profilePicture)=>{
    return async (dispatch)=>{
        try{
        
        await axios.patch('/users/me',JSON.stringify(updates))
        console.log(profilePicture)
        if(profilePicture!=='') {
            const imageBody = new FormData()
            
            imageBody.append('avatar',profilePicture)
            
            const buffer = await axios.post('/users/me/avatar',imageBody)
            
             dispatch(editUserInfo({...updates,profilePicture:buffer.data}))
        }  else{
            dispatch(editUserInfo(updates))
        } 
        
        }catch(e){
            console.log(e)
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

export const changePassword = (currentPass,password)=>{
    return async (dispatch)=>{
        try{
            
            await axios.patch('/users/me/password',{currentPass,password})
        }catch(e){
            dispatch({type : 'ERROR',
            e
        })
        }
    }
}

export const deleteAccount = (password)=>{
    return async (dispatch)=>{
        try{
            console.log(password)
            await axios.post('/users/me/delete',{password})
            localStorage.removeItem('token')
            dispatch({type:'LOGOUT'})
            dispatch({type : 'CLEAR_USER'})
        }catch(e){
            dispatch({type : 'ERROR',
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