import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {startSetMessages} from '../../actions/messages'
import MessageElement from './MessageElement'
import MessageForm from './MessageForm'
const Messages = ({messages,startSetMessages,conv_id,token,setMessagesError})=>{
    const [displayedMessages,setDisplayedMessages] = useState([])
    const [error,setError] = useState('')
    useEffect(()=>{
        startSetMessages(conv_id,token)
    },[])
    useEffect(()=>{
        setError(setMessagesError)
    },[setMessagesError])
    useEffect(()=>{
        if(messages.length>0 && messages[0].conversation===conv_id){
            
            setDisplayedMessages(messages)
        }
        
    },[messages,startSetMessages])
    return (
        <div>
        {error && (<p>{error}</p>)}
        {!displayedMessages.length>0? (<p>Aucuns messages pour l'instant</p>) : 
            displayedMessages.map((message)=>(<MessageElement key={message._id} {...message}/>))
        }
        <h3>Envoyer un message</h3>
        <MessageForm conv_id={conv_id}/>
        </div>
        
    )
}
const mapStateToProps = (state)=>({
    messages : state.messages.messages,
    token : state.auth.token,
    setMessagesError : state.messages.setMessagesError
})
const mapDispatchToProps = (dispatch)=>({
    startSetMessages : (id,token)=>dispatch(startSetMessages(id,token))
})

export default connect(mapStateToProps,mapDispatchToProps)(Messages)