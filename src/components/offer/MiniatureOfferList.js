import React, { useEffect,useState } from "react"
import {connect} from 'react-redux'
import {startSetOffers} from '../../actions/offers'
import MiniatureOfferElement from "./MiniatureOfferElement"

const MiniatureOfferList = ({offers,startSetOffers})=>{
    const [showingOffers,setOffers]= useState([])
    useEffect(()=>{
        
        startSetOffers()
    },[])
    useEffect(()=>{
        
        setOffers(offers)
    },[startSetOffers,offers])
    return (
        <div className="content-container">
        <h3>Mes offres</h3>
            {showingOffers.length===0?(
                <p>Vous n'avez travaillé sur aucune offres pour le moment</p>):(
                    showingOffers.map((offer)=><MiniatureOfferElement key={offer._id} {...offer} />)
                )}
        </div>

    )
}
    
const mapStateToProps = (state)=>({
    offers: state.offers
})
const mapDispatchToProps = (dispatch)=>({
    startSetOffers : ()=>dispatch(startSetOffers())
})
export default connect(mapStateToProps,mapDispatchToProps)(MiniatureOfferList)


