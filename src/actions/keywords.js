
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL


export const setAllKeywords = (keywords)=>({
    type : 'SET_ALL_KEYWORDS',
    keywords
})

export const startSetAllKeywords = () =>{
    return async (dispatch)=>{
        try {
            const res = await axios.get('/keywords')
            
            dispatch(setAllKeywords(res.data))
        }catch(e){
            
            dispatch({
                type : 'SET_ALL_KEYWORDS_ERROR',
                e
        })
        }
    }
}