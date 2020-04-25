
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL
export const editProfile =  (updates) =>{
    type : 'EDIT_PROFILE',
    updates
}

export const startEditProfile = (updates)=>{
    return async (dispatch,getState)=>{
        try{
        
        await axios.patch('/profile',JSON.stringify(updates))
        dispatch(editProfile(updates))
        }catch(e){
            dispatch({
                type:'ERROR',
                e
            })
        }
    }
}

export const setProfile = (profile)=>{
    type : 'SET_PROFILE',
    profile
}

export const startSetProfile = (profile_id) =>{
    return async (dispatch)=>{
        try {
            const res = await axios.get('/profile',JSON.stringify({_id:profile_id}))
            dispatch(setProfile(res.data))
        }catch(e){
            dispatch({
                type : 'ERROR',
                e
        })
        }
    }
}
export const addCompletedOffer = (completedOffer)=>{
    type : 'ADD_COMPLETED_OFFER',
    completedOffer
}
export const startAddCompletedOffer = (offer_id)=>{
    return async (dispatch)=>{
        try {
            const res = await axios.post('/profile/completedOffer',JSON.stringify({_id:offer_id}))
            dispatch(addCompletedOffer(res.data))
        }catch(e){
            dispatch({
                type : 'ERROR',
                e
        })
        }
    }
}