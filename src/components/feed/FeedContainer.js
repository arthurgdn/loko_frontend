import React, { useEffect,useState } from "react"
import {connect} from 'react-redux'
import {startSetFeed} from '../../actions/feed'
import OfferElement from "../offer/OfferElement"
import getFilteredFeed from '../../selectors/getFilteredFeed'

const FeedContainer = ({feed,startSetFeed,setFeedError})=>{
    const [showingOffers,setOffers]= useState([])
    const [error,setError] = useState('')
    useEffect(()=>{
        setError(setFeedError)
    },[setFeedError])
    useEffect(()=>{
        
        startSetFeed()
    },[])
    useEffect(()=>{
        
        setOffers(feed)
    },[startSetFeed,feed])
    return (
        <div className="content-container feed__container">
            {showingOffers.length===0?(
                <p>Aucune annonces à afficher, ajoutez des centres d'intérêts à votre profil, ou suivez d'autres utilisateurs</p>):(
                    showingOffers.map((offer)=><OfferElement displayCollaborationDemandForm={true} displayComments={true} displayAllComments={false} key={offer._id} {...offer} />)
                )}
        </div>

    )
}
    
const mapStateToProps = (state)=>({
    feed : getFilteredFeed(state.feed.feed,state.feedFilters),
    setFeedError : state.feed.setFeedError
})
const mapDispatchToProps = (dispatch)=>({
    startSetFeed : ()=>dispatch(startSetFeed())
})
export default connect(mapStateToProps,mapDispatchToProps)(FeedContainer)


