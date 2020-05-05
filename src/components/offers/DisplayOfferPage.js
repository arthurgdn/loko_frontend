import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL
import OfferElement from '../offer/OfferElement'


const DisplayOfferPage = ({match})=>{
    
    
    const [offer,setOffer]= useState({})
    const [error,setError]=useState('')
    
    useEffect(()=>{
        
            axios.get('/offer/'+match.params.id).then((res)=>
                setOffer(res.data)
            ).catch((e)=>{
                setError(e)
            })
        
        
    },[])
    
    return (
        <div>
            {error &&(<p>{error}</p>)}
            {Object.keys(offer).length===0?(<p>Aucune offre ne correspond</p>):(<OfferElement displayCollaborationDemandForm={true} displayComments={true} displayAllComments={true} key={offer._id} {...offer}/>)}
            
    
        </div>
    )
}
const mapStateToProps = (state)=>({
    offers : state.offers
})
const mapDispatchToProps = (dispatch)=>({
    
})
export default connect(mapStateToProps,mapDispatchToProps)(DisplayOfferPage)
