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
        <div>
            <div className="banner__title">
                <h3>Vos annonces</h3>
            </div>
            
            <div className="content-container">
                <div className="manager__miniature-list">
                    {showingOffers.length===0?(
                        <p className="manager__no-offer">Vous n'avez travaillé sur aucune annonces pour le moment</p>):(
                            showingOffers.map((offer)=><MiniatureOfferElement key={offer._id} {...offer} />)
                        )}
                </div>
            </div>
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


