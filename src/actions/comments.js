
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL


export const setComments = (comments,id)=>({
    type : 'SET_COMMENTS',
    comments,
    id
})

export const startSetComments = (id) =>{
    return async (dispatch)=>{
        
        try {
            
            
            const res = await axios.get('/offer/'+id+'/comments')
            
            dispatch(setComments(res.data,id))
        }catch(e){
            
            dispatch({
                type : 'ERROR',
                e
        })
        }
    }
}
export const newComment = (comment,id)=>({
    type : 'NEW_COMMENT',
    comment,
    id
})
export const startNewComment = (id,comment)=>{
    return async (dispatch)=>{
        try {
            
            const res = await axios.post('/offer/'+id+'/comment',JSON.stringify(comment))
            dispatch(newComment(res.data,id))
            
        }catch(e){
            
            dispatch({
                type : 'ERROR',
                e
        })
        }
    }
}

export const removeComment = (offer_id,id) =>({
    type:'REMOVE_COMMENT',
    id,
    offer_id
})

export const startRemoveComment = (offer_id,comment_id)=>{
    return async (dispatch)=>{
        try {
            await axios.delete('/offer/'+offer_id+'/comments/'+comment_id)
            dispatch(removeComment(offer_id,comment_id))
        }catch(e){
            
            dispatch({
                type : 'ERROR',
                e
            })
        }

    }
}