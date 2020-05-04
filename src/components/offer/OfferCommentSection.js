import React, { useEffect,useState } from "react"
import {connect} from 'react-redux'
import {startSetComments,startNewComment} from '../../actions/comments'
import OfferComment from './OfferComment'
import OfferCommentForm from './OfferCommentForm'

const OfferCommentSection = ({offer_id,startSetComments,startNewComment,comments})=>{
    const [showingComments,setComments]= useState([])
    
    useEffect(()=>{
        
        startSetComments(offer_id)
    },[])
    useEffect(()=>{
        
            const matchingComments = comments.find((comment)=>comment.offer_id===offer_id)
            if(matchingComments){
                
                setComments(matchingComments.comments)
            }
            
        
        
    },[startSetComments,comments])

    const onNewComment = (comment)=>{
        startNewComment(offer_id,comment)
    }
    return (
        <div className="content-container">
            {showingComments.length===0?(
                <p>Il n'y a pas encore de commentaires</p>):(
                    showingComments.map((comment)=><OfferComment key={comment._id} {...comment} />)
                )}
            <OfferCommentForm onNewComment={onNewComment}/>
        </div>

    )
}
    
const mapStateToProps = (state)=>({
    comments : state.comments
})
const mapDispatchToProps = (dispatch)=>({
    startSetComments : (id)=>dispatch(startSetComments(id)),
    startNewComment : (id,comment)=>dispatch(startNewComment(id,comment))
})
export default connect(mapStateToProps,mapDispatchToProps)(OfferCommentSection)


