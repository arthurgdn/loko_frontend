import React, { useEffect,useState } from "react"
import {connect} from 'react-redux'
import {startSetFeed} from '../../actions/feed'
import OfferElement from "../offer/OfferElement"

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
                <p>...</p>):(
                    showingOffers.map((offer)=><OfferElement displayCollaborationDemandForm={true} displayComments={true} displayAllComments={false} key={offer._id} {...offer} />)
                )}
        </div>

    )
}
    
const mapStateToProps = (state)=>({
    feed : state.feed
})
const mapDispatchToProps = (dispatch)=>({
    startSetFeed : ()=>dispatch(startSetFeed())
})
export default connect(mapStateToProps,mapDispatchToProps)(FeedContainer)


