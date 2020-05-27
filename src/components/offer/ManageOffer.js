import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {MdArrowBack} from 'react-icons/md'
import OfferElement from './OfferElement'
import ManageOfferSidebar from './ManageOfferSidebar'

const ManageOffer = ({offers,match,history})=>{
    
    
    const [offer,setOffer]= useState({})
    
    
    
    useEffect(()=>{
        const foundOffer = offers.find((offer)=>String(offer._id)===match.params.id)
        setOffer(foundOffer?foundOffer:{})
        console.log(offer)
    },[])
    
    return (
        <div>
            <button onClick={()=>{history.goBack()}}><MdArrowBack/></button>
            {Object.keys(offer).length===0?(<p>Aucune offre ne correspond</p>):(<OfferElement displayCollaborationDemandForm={false} displayComments={false} key={offer._id} {...offer}/>)}
            {Object.keys(offer).length!==0 && (<ManageOfferSidebar {...offer} history={history} />)}
    
        </div>
    )
}
const mapStateToProps = (state)=>({
    offers : state.offers.offers
})

export default connect(mapStateToProps)(ManageOffer)
