
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
            dispatch({type: 'ERROR',e})
        }
    }
} 

export const startEditProfile = (updates)=>{
    return async (dispatch)=>{
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

export const setProfile = (profile)=>({
    type : 'SET_PROFILE',
    profile
})

export const startSetProfile = (profile_id) =>{
    return async (dispatch)=>{
        try {
            
            const res = await axios.get('/profile/'+profile_id)
            const recommendations = await axios.get('/profile/'+profile_id+'/recommendations')
            console.log(recommendations.data)
            const formattedKeywords = []
            for(const keyword of res.data.keywords){
                formattedKeywords.push(keyword.name)
            }
            dispatch(setProfile({...res.data,keywords:formattedKeywords,recommendations:recommendations.data}))
        }catch(e){
            
            dispatch({
                type : 'ERROR',
                e
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
                type : 'ERROR',
                e
        })
        }
    }
}