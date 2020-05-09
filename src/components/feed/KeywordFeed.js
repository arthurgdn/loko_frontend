import React, { useEffect,useState } from "react"
import {connect} from 'react-redux'
import {startSetKeywordFeed} from '../../actions/keywordOffers'
import OfferElement from "../offer/OfferElement"

const KeywordFeed = ({keywordOffers,startSetKeywordFeed,match})=>{
    const [showingOffers,setOffers]= useState([])
    useEffect(()=>{
        
        startSetKeywordFeed(match.params.id)
    },[])
    useEffect(()=>{
        
        setOffers(keywordOffers)
    },[startSetKeywordFeed,keywordOffers])
    return (
        <div className="content-container">
            {showingOffers.length===0?(
                <p>Pas d'offres associées à ce mot clé</p>):(
                    showingOffers.map((offer)=><OfferElement displayCollaborationDemandForm={true} displayComments={true} displayAllComments={false} key={offer._id} {...offer} />)
                )}
        </div>

    )
}
    
const mapStateToProps = (state)=>({
    keywordOffers : state.keywordOffers
})
const mapDispatchToProps = (dispatch)=>({
    startSetKeywordFeed : (id)=>dispatch(startSetKeywordFeed(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(KeywordFeed)


