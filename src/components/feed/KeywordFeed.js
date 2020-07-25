import React, { useEffect,useState } from "react"
import {connect} from 'react-redux'
import {RiHeartAddLine,RiHeartLine} from 'react-icons/ri'
import {startSetKeywordFeed} from '../../actions/keywordOffers'
import {startAddUserKeyword} from '../../actions/user'
import OfferElement from "../offer/OfferElement"
import FeedGroupElement from './FeedGroupElement'

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL

const KeywordFeed = ({user,keywordName,keywordOffers,startAddUserKeyword,startSetKeywordFeed,match,setKeyWordOffersError})=>{
    const [showingItems,setItems]= useState([])
    const [isFollowed,setIsFollowed] = useState(false)
    const [error,setError] = useState('')
    useEffect(()=>{
        setIsFollowed(!!user.userKeywords.find((keyword)=>keyword.keyword===match.params.id))
        startSetKeywordFeed(match.params.id)
    },[])
    useEffect(()=>{
        setError(setKeyWordOffersError)
    },[setKeyWordOffersError])
    useEffect(()=>{
        
        setItems(keywordOffers)
    },[startSetKeywordFeed,keywordOffers])

    const followKeyword = ()=>{
        startAddUserKeyword(match.params.id)
        setIsFollowed(true)
    }
    return (
        <div>
        <div>
            <div className="banner__title keyword__banner">
                <h3>{keywordName}</h3>
                {!isFollowed?(<button className="keyword__feed-button" onClick={followKeyword}><RiHeartAddLine /> Suivre</button>) : (<RiHeartLine className="keyword__icon"/>)}
            </div>
        </div>
        <div className="content-container">
        
            {error && (<p>{error}</p>)}
            {showingItems.length===0? !error &&(
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
        </div>

    )
}
    
const mapStateToProps = (state)=>({
    keywordName : state.keywordOffers.keywordName,
    keywordOffers : state.keywordOffers.keywordOffers,
    setKeyWordOffersError : state.keywordOffers.setKeyWordOffersError,
    user : state.user
})
const mapDispatchToProps = (dispatch)=>({
    startSetKeywordFeed : (id)=>dispatch(startSetKeywordFeed(id)),
    startAddUserKeyword: (id)=>dispatch(startAddUserKeyword(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(KeywordFeed)


