import generateAPI from '../utils/api'

export const editUserInfo =  (updates) =>{
    type : 'EDIT_USER_INFO',
    updates
}

export const startEditUserInfo = (updates)=>{
    return async (dispatch,getState)=>{
        try{
        const api = generateAPI(getState().auth.token)
        await api.patch('/users/me',JSON.stringify(updates))
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
    return (dispatch,getState)=>{
        try{
            const api = generateAPI(getState().auth.token)
            await api.post('/users/acceptcollab',JSON.stringify(collaborator))
            dispatch(newCollaboration(collaborator))
        }catch(e){
            dispatch({
                type:'ERROR',
                e
            })
        }
    }
}

export const startAddPhoneNUmber = (phoneNumber)=>{
    return (dispatch,getState)=>{
        try{
            const api = generateAPI(getState().auth.token)
            await api.post('/users/phone',JSON.stringify({phoneNumber}))
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