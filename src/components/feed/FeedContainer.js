import React, { useEffect,useState } from "react"
import {connect} from 'react-redux'
import {startSetFeed} from '../../actions/feed'
import OfferElement from "../offer/OfferElement"
import getFilteredFeed from '../../selectors/getFilteredFeed'

const FeedContainer = ({feed,startSetFeed})=>{
    const [showingOffers,setOffers]= useState([])
    useEffect(()=>{
        
        startSetFeed()
    },[])
    useEffect(()=>{
        
        setOffers(feed)
    },[startSetFeed,feed])
    return (
        <div className="content-container">
            {showingOffers.length===0?(
                <p>Aucune annonce à afficher, ajoutez des centres d'intérêts à votre profil, ou suivez d'autres particuliers</p>):(
                    showingOffers.map((offer)=><OfferElement displayCollaborationDemandForm={true} displayComments={true} displayAllComments={false} key={offer._id} {...offer} />)
                )}
        </div>

    )
}
    
const mapStateToProps = (state)=>({
    feed : getFilteredFeed(state.feed,state.feedFilters)
})
const mapDispatchToProps = (dispatch)=>({
    startSetFeed : ()=>dispatch(startSetFeed())
})
export default connect(mapStateToProps,mapDispatchToProps)(FeedContainer)


