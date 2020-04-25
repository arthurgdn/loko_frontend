
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL

export const setGroupOffers = (offers)=>{
    type : 'SET_GROUP_OFFERS',
    offers
}

export const startSetGroupOffers = (id)=>{
    return async (dispatch)=>{
        try{
            const res = await axios.get('/offers/group/'+id)
            dispatch(setGroupOffers(res.data))
        }catch(e){
            dispatch({
                type: 'ERROR',
                e
            })
        }
    }
}