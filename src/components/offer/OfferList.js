import React, { useEffect,useState } from "react"
import {connect} from 'react-redux'
import {startSetOffers} from '../../actions/offers'
import OfferElement from "./OfferElement"

const OfferList = ({offers,startSetOffers})=>{
    const [showingOffers,setOffers]= useState([])
    useEffect(()=>{
        
        startSetOffers()
    },[])
    useEffect(()=>{
        
        setOffers(offers)
    },[startSetOffers,offers])
    return (
        <div className="content-container">
            {showingOffers.length===0?(
                <p>Vous n'avez pas encore publié d'offres</p>):(
                    showingOffers.map((offer)=><OfferElement key={offer._id} {...offer} />)
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
export default connect(mapStateToProps,mapDispatchToProps)(OfferList)


