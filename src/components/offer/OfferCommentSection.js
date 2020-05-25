import React, { useEffect,useState } from "react"
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {startSetComments,startNewComment} from '../../actions/comments'
import OfferComment from './OfferComment'
import OfferCommentForm from './OfferCommentForm'

const OfferCommentSection = ({offer_id,startSetComments,startNewComment,comments,displayAllComments,setCommentsError,newCommentError})=>{
    const [showingComments,setComments]= useState([])
    const [frontSetCommentsError,setFrontSetCommentsError] = useState('')
    const [frontNewCommentError,setFrontNewCommentError] = useState('')
    useEffect(()=>{
        setFrontSetCommentsError(setCommentsError)
    },[setCommentsError])
    useEffect(()=>{
        setFrontNewCommentError(newCommentError)
    },[newCommentError])
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
            <h2>Commentaires </h2>
            {frontSetCommentsError && (<p>{frontSetCommentsError}</p>)}
            {showingComments.length===0?(
                <p>Il n'y a pas encore de commentaires</p>):(
                    <div>
                        {displayAllComments || showingComments.length<5?
                            (
                                showingComments.map((comment)=><OfferComment key={comment._id} {...comment} />)
                            ):( <div>
                                    {showingComments.slice(0,4).map((comment)=><OfferComment key={comment._id} {...comment} />)}
                                    <Link to={'/offer/'+offer_id}>...</Link>
                                </div>
                                )
                        }
                    </div>)
                    
                    
                }
            <OfferCommentForm onNewComment={onNewComment}/>
            {frontNewCommentError && (<p>{frontNewCommentError}</p>)}
        </div>

    )
}
    
const mapStateToProps = (state)=>({
    comments : state.comments.comments,
    setCommentsError : state.comments.setCommentsError,
    newCommentError : state.comments.newCommentError
})
const mapDispatchToProps = (dispatch)=>({
    startSetComments : (id)=>dispatch(startSetComments(id)),
    startNewComment : (id,comment)=>dispatch(startNewComment(id,comment))
})
export default connect(mapStateToProps,mapDispatchToProps)(OfferCommentSection)


