
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL
export const editOffer =  (id,updates) =>{
    type : 'EDIT_OFFER',
    id,
    updates
}

export const startEditOffer = (id,updates)=>{
    return async (dispatch)=>{
        try{
        
            await axios.patch('/offer/'+id,JSON.stringify(updates))
            dispatch(editOffer(id,updates))
        }catch(e){
            dispatch({
                type:'ERROR',
                e
            })
        }
    }
}

export const setOffers = (offers)=>{
    type : 'SET_OFFERS',
    offers
}

export const startSetOffers = () =>{
    return async (dispatch)=>{
        try {
            const res1 = await axios.get('/offer/me')
            const res2 = await axios.get('/offer/collaborated/me')
            dispatch(setOffers([...res1.data._doc,...res2.data._doc]))
        }catch(e){
            dispatch({
                type : 'ERROR',
                e
        })
        }
    }
}
export const addOffer = (offer)=>{
    type : 'ADD_OFFER',
    offer
}
export const startAddOffer = (offer_id)=>{
    return async (dispatch)=>{
        try {
            const res = await axios.post('/offer/create',JSON.stringify({_id:offer_id}))
            dispatch(addOffer(res.data._doc))
        }catch(e){
            dispatch({
                type : 'ERROR',
                e
        })
        }
    }
}

export const removeOffer = (id) =>{
    type:'REMOVE_OFFER',
    id
}

export const startRemoveOffer = (id)=>{
    return async (dispatch)=>{
        try {
            await axios.delete('/offer/'+id)
            dispatch(removeOffer(id))
        }catch(e){
            dispatch({
                type : 'ERROR',
                e
            })
        }

    }
}