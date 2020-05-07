import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {startSetMessages} from '../../actions/messages'
import MessageElement from './MessageElement'
import MessageForm from './MessageForm'
const Messages = ({messages,startSetMessages,conv_id,token})=>{
    const [displayedMessages,setDisplayedMessages] = useState([])
    useEffect(()=>{
        startSetMessages(conv_id,token)
    },[])
    useEffect(()=>{
        setDisplayedMessages(messages)
    },[messages,startSetMessages])
    return (
        <div>
        {!displayedMessages.length>0? (<p>Aucuns messages pour l'instant</p>) : 
            displayedMessages.map((message)=>(<MessageElement key={message._id} {...message}/>))
        }
        <h3>Envoyer un message</h3>
        <MessageForm conv_id={conv_id}/>
        </div>
        
    )
}
const mapStateToProps = (state)=>({
    messages : state.messages,
    token : state.auth.token
})
const mapDispatchToProps = (dispatch)=>({
    startSetMessages : (id,token)=>dispatch(startSetMessages(id,token))
})

export default connect(mapStateToProps,mapDispatchToProps)(Messages)