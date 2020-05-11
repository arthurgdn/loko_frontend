import React, { useEffect,useState } from "react"
import {connect} from 'react-redux'
import {startSetGroupOffers} from '../../actions/groupOffers'
import OfferElement from "../offer/OfferElement"

const GroupOffers = ({groupOffers,startSetGroupOffers,group_id})=>{
    const [showingOffers,setOffers]= useState([])
    useEffect(()=>{
        
        startSetGroupOffers(group_id)
    },[])
    useEffect(()=>{
        
        setOffers(groupOffers)
    },[startSetGroupOffers,groupOffers])
    return (
        <div className="content-container">
            {showingOffers.length===0?(
                <p>Aucune offre n'a déjà été publiée dans le groupe</p>):(
                    showingOffers.map((offer)=><OfferElement displayCollaborationDemandForm={true} displayComments={true} displayAllComments={false} key={offer._id} {...offer} />)
                )}
        </div>

    )
}
    
const mapStateToProps = (state)=>({
    groupOffers : state.groupOffers
})
const mapDispatchToProps = (dispatch)=>({
    startSetGroupOffers : (id)=>dispatch(startSetGroupOffers(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(GroupOffers)


