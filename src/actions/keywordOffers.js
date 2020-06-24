
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL


export const setKeywordFeed = (feed,name)=>({
    type : 'SET_KEYWORD_FEED',
    feed,
    name
})

export const startSetKeywordFeed = (keyword_id) =>{
    return async (dispatch)=>{
        try {
            const res = await axios.get('/keyword/'+keyword_id)
            dispatch(setKeywordFeed(res.data.feed,res.data.name))
        }catch(e){
            console.log(e)
            dispatch({
                type : 'SET_KEYWORD_FEED_ERROR'
        })
        }
    }
}