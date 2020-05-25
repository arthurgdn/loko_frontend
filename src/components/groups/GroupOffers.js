import React, { useEffect,useState } from "react"
import {connect} from 'react-redux'
import {startSetGroupOffers} from '../../actions/groupOffers'
import OfferElement from "../offer/OfferElement"

const GroupOffers = ({groupOffers,startSetGroupOffers,group_id,setGroupOffersError})=>{
    const [showingOffers,setOffers]= useState([])
    const [error,setError] = useState('')
    useEffect(()=>{
        setError(setGroupOffersError)
    },[setGroupOffersError])
    useEffect(()=>{
        
        startSetGroupOffers(group_id)
    },[])
    useEffect(()=>{
        
        setOffers(groupOffers)
    },[startSetGroupOffers,groupOffers])
    return (
        <div className="content-container">
            {error && (<p>{error}</p>)}
            {showingOffers.length===0?(
                <p>Aucune offre n'a déjà été publiée dans le groupe</p>):(
                    showingOffers.map((offer)=><OfferElement displayCollaborationDemandForm={true} displayComments={true} displayAllComments={false} key={offer._id} {...offer} />)
                )}
        </div>

    )
}
    
const mapStateToProps = (state)=>({
    groupOffers : state.groupOffers.groupOffers,
    setGroupOffersError : state.groupOffers.setGroupOffersError
})
const mapDispatchToProps = (dispatch)=>({
    startSetGroupOffers : (id)=>dispatch(startSetGroupOffers(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(GroupOffers)


