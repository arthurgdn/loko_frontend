
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL
export const editOffer =  (id,updates) =>({
    type : 'EDIT_OFFER',
    id,
    updates
})

export const startEditOffer = (id,updates,image={})=>{
    return async (dispatch)=>{
        try{
        
            const res = await axios.patch('/offer/'+id,JSON.stringify(updates))
            if(Object.keys(image).length>0){
                const imageBody = new FormData()
            
                imageBody.append('image',image)
            
                const buffer = await axios.post('/offer/'+id+'/image',imageBody)
                dispatch(editOffer(id,res.data))
            }else{
                dispatch(editOffer(id,res.data))
            }
        }catch(e){
            
            dispatch({
                type:'ERROR',
                e
            })
        }
    }
}

export const setOffers = (offers)=>({
    type : 'SET_OFFERS',
    offers
})

export const startSetOffers = () =>{
    return async (dispatch)=>{
        
        try {
            
            
            const res = await axios.get('/offers/collaborated/me')
            
            dispatch(setOffers(res.data?res.data:[]))
        }catch(e){
            
            dispatch({
                type : 'ERROR',
                e
        })
        }
    }
}
export const addOffer = (offer)=>({
    type : 'ADD_OFFER',
    offer
})
export const startAddOffer = (offer,image)=>{
    return async (dispatch)=>{
        try {
            
            const res = await axios.post('/offer/create',JSON.stringify(offer))
            if(Object.keys(image).length!==0){
                const imageBody = new FormData()
            
                imageBody.append('image',image)
            
                const buffer = await axios.post('/offer/'+res.data._id+'/image',imageBody)
                dispatch(addOffer(res.data))
            }else{
                dispatch(addOffer(res.data))
            }
            
        }catch(e){
            
            dispatch({
                type : 'ERROR',
                e
        })
        }
    }
}

export const removeOffer = (id) =>({
    type:'REMOVE_OFFER',
    id
})

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

export const startSendCollaborationDemand = (id,message)=>{
    return async(dispatch)=>{
        try{
            console.log('envoi')
            await axios.post('/offer/'+id+'/demand',JSON.stringify({message}))
        }catch(e){
            console.log(e)
            dispatch({
                type:'ERROR',
                e
            })
        }
    }
}