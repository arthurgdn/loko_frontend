import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL

export const setGroup = (group)=>({
    type : 'SET_GROUP',
    group
})

export const startCreateGroup = (group,image)=>{
    return async (dispatch)=>{
        try{
            const res = await axios.post('/group',JSON.stringify(group))
            
            if(image.name){
                const imageBody = new FormData()
            
                imageBody.append('image',image)
                
                const buffer = await axios.post('/group/'+res.data._id+'/image',imageBody)
                dispatch(setGroup({...res.data,hasImage:true}))
                dispatch({
                    type:'USER_GROUP_CREATED',
                    group : {...res.data,hasImage:true}
                })
            }else{
                dispatch(setGroup(res.data))
                dispatch({
                    type:'USER_GROUP_CREATED',
                    group : res.data
                })
            }
        }catch(e){
            
            dispatch({
                type: 'ERROR',
                e
            })
        }
        
    }
}
export const startEditGroup = (id,updates,image)=>{
    return async (dispatch)=>{
        try{
            const res = await axios.patch('/group/'+id,JSON.stringify(updates))
            if(image.name){
                const imageBody = new FormData()
            
                imageBody.append('image',image)
                
                const buffer = await axios.post('/group/'+res.data._id+'/image',imageBody)
                dispatch(setGroup({...res.data,hasImage:true}))
            }else{
                dispatch(setGroup(res.data))
            }
        }catch(e){
            disaptch({
                type : 'ERROR',
                e
            })
        }
    }
}
export const startSetGroup = (id)=>{
    return async (dispatch)=>{
        try{
            const res = await axios.get('/group/'+id)
            dispatch(setGroup(res.data))
        }catch(e){
            dispatch({
                type: 'ERROR',
                e
            })
        }
    }
}