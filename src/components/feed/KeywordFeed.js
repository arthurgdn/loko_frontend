import React, { useEffect,useState } from "react"
import {connect} from 'react-redux'
import {startSetKeywordFeed} from '../../actions/keywordOffers'
import OfferElement from "../offer/OfferElement"
import FeedGroupElement from './FeedGroupElement'

const KeywordFeed = ({keywordOffers,startSetKeywordFeed,match,setKeyWordOffersError})=>{
    const [showingItems,setItems]= useState([])
    const [error,setError] = useState('')
    useEffect(()=>{
        
        startSetKeywordFeed(match.params.id)
    },[])
    useEffect(()=>{
        setError(setKeyWordOffersError)
    },[setKeyWordOffersError])
    useEffect(()=>{
        
        setItems(keywordOffers)
    },[startSetKeywordFeed,keywordOffers])
    return (
        <div className="content-container">
            {error && (<p>{error}</p>)}
            {showingItems.length===0?(
                <p>Pas d'offres ou de groupes associées à ce mot clé</p>):(
                    showingItems.map((item)=>{
                        
                        return item.type==='offer'?(
                            <OfferElement displayCollaborationDemandForm={true} displayComments={true} displayAllComments={false} key={item._id} {...item} />
                        ):(
                            <FeedGroupElement key={item._id} {...item}/>
                        )
                    })
                )}
        </div>

    )
}
    
const mapStateToProps = (state)=>({
    keywordOffers : state.keywordOffers.keywordOffers,
    setKeyWordOffersError : state.keywordOffers.setKeyWordOffersError
})
const mapDispatchToProps = (dispatch)=>({
    startSetKeywordFeed : (id)=>dispatch(startSetKeywordFeed(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(KeywordFeed)


