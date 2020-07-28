import React, {useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {startSetMessages} from '../../actions/messages'
import MessageElement from './MessageElement'
import MessageForm from './MessageForm'
const Messages = ({messages,socket,startSetMessages,conv_id,token,setMessagesError,user_id})=>{
    const [displayedMessages,setDisplayedMessages] = useState([])
    const [error,setError] = useState('')
    const [stateSocket,setStateSocket]=useState({})
    const messageContainer = React.createRef()
    useEffect(()=>{
        console.log('setting socket',socket)
        setStateSocket(socket)
        return ()=>{
            if(Object.keys(socket).length>0){
                socket.disconnect()
            }
        }
    },[socket])
  
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
    useEffect(()=>{
        autoscroll()
    },[displayedMessages])
    //Method for autscrolling messages when new message appears
    const autoscroll = ()=>{
        const $messages =  messageContainer.current
        if($messages){
            const $newMessage = $messages.lastElementChild
            const newMessageStyles = getComputedStyle($newMessage)
            const newMessageMargin = parseInt(newMessageStyles.marginBottom)
            const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
            
            const visibleHeight = $messages.offsetHeight
            const containerHeight = $messages.scrollHeight
            //Check how far we have scrolled
            const scrollOffset = $messages.scrollTop + visibleHeight
            messageContainer.current.scrollTop = $messages.scrollHeight
            
            }
        }
        
    
    return (
        <div className="conversation__messages-container" >
        
        {!displayedMessages.length>0? !error && (<p>Envoyez le premier message !</p>) : (
            <div ref={messageContainer} className="conversation__messages-list">
                {displayedMessages.map((message)=>(<MessageElement key={message._id} {...message} user_id={user_id}/>))}
            </div>)
            
        }
        {error && (<p>{error}</p>)}
        <MessageForm conv_id={conv_id}/>
        </div>
        
    )
}
const mapStateToProps = (state)=>({
    messages : state.messages.messages,
    socket : state.socket,
    token : state.auth.token,
    setMessagesError : state.messages.setMessagesError
})
const mapDispatchToProps = (dispatch)=>({
    startSetMessages : (id,token)=>dispatch(startSetMessages(id,token))
})

export default connect(mapStateToProps,mapDispatchToProps)(Messages)