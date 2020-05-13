import React, { useEffect,useState } from "react"
import {connect} from 'react-redux'
import {startSetKeywordFeed} from '../../actions/keywordOffers'
import OfferElement from "../offer/OfferElement"
import FeedGroupElement from './FeedGroupElement'

const KeywordFeed = ({keywordOffers,startSetKeywordFeed,match})=>{
    const [showingItems,setItems]= useState([])
    useEffect(()=>{
        
        startSetKeywordFeed(match.params.id)
    },[])
    useEffect(()=>{
        
        setItems(keywordOffers)
    },[startSetKeywordFeed,keywordOffers])
    return (
        <div className="content-container">
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
    keywordOffers : state.keywordOffers
})
const mapDispatchToProps = (dispatch)=>({
    startSetKeywordFeed : (id)=>dispatch(startSetKeywordFeed(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(KeywordFeed)


