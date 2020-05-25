
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL
//On pourra enventuellement rajouter ensuite d'autres actions en fonctions de celles affichées dans les groupes
export const setGroupOffers = (offers)=>({
    type : 'SET_GROUP_OFFERS',
    offers
})

export const startSetGroupOffers = (id)=>{
    return async (dispatch)=>{
        try{
            const res = await axios.get('/offers/group/'+id)
            dispatch(setGroupOffers(res.data))
        }catch(e){
            console.log(e)
            dispatch({
                type: 'SET_GROUP_OFFERS_ERROR'
            })
        }
    }
}