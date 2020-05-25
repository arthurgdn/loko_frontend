
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL
export const editProfile =  (updates) =>({
    type : 'EDIT_PROFILE',
    updates
})
export const sendRecommendation = (recommendation)=>({
    type:'SEND_RECOMMENDATION',
    recommendation
})
export const startSendRecommendation = (profile_id,content)=>{
    return async (dispatch)=>{
        try{
            const res = await axios.post('/profile/'+profile_id+'/recommendation',JSON.stringify({content}))
            dispatch(sendRecommendation(res.data))
        }catch(e){
            console.log(e)
            dispatch({type: 'SEND_RECOMMENDATION_ERROR'})
        }
    }
} 

export const startEditProfile = (updates)=>{
    return async (dispatch)=>{
        try{
        
        const res = await axios.patch('/profile',JSON.stringify(updates))
        const recommendations = await axios.get('/profile/'+res.data.user+'/recommendations')
            
            
            dispatch(setProfile({...res.data,recommendations:recommendations.data}))
        }catch(e){
            console.log(e)
            dispatch({
                type:'EDIT_PROFILE_ERROR'
            })
        }
    }
}

export const setProfile = (profile)=>({
    type : 'SET_PROFILE',
    profile
})

export const startSetProfile = (profile_id) =>{
    return async (dispatch)=>{
        try {
            
            const res = await axios.get('/profile/'+profile_id)
            const recommendations = await axios.get('/profile/'+profile_id+'/recommendations')
            
            dispatch(setProfile({...res.data,recommendations:recommendations.data}))
        }catch(e){
            
            dispatch({
                type : 'SET_PROFILE_ERROR'
        })
        }
    }
}
export const addCompletedOffer = (completedOffer)=>({
    type : 'ADD_COMPLETED_OFFER',
    completedOffer
})
export const startEditCompletedOffers = (completedOffers)=>{
    return async (dispatch)=>{
        try {
            
            const res = await axios.post('/profile/completedOffers',JSON.stringify({completedOffers}))
            console.log('profile',res.data)
            dispatch(editProfile(res.data))
        }catch(e){
            console.log(e)
            dispatch({
                type : 'ADD_COMPLETED_OFFER_ERROR'
        })
        }
    }
}