import React,{useState} from 'react'
import {connect} from 'react-redux'
import {startSendMessage} from '../../actions/messages'
const MessageForm = ({conv_id,socket,startSendMessage})=>{
    const [message,setMessage] = useState('')
    const onSubmit = (e)=>{
        e.preventDefault()
        
        startSendMessage(socket,conv_id,message)
        setMessage('')
    }
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Message" value={message} onChange={(e)=>setMessage(e.target.value)} autoFocus required autoComplete="off"/>
            <input type="submit" value="Envoyer" dispabled={message.length===0?'true':'false'}/>
        </form>
    )
}
const mapStateToProps = (state)=>({
    socket : state.socket
})
const mapDispatchToProps= (dispatch)=>({
    startSendMessage : (socket,conv_id,message)=>dispatch(startSendMessage(socket,conv_id,message))
})
export default connect(mapStateToProps,mapDispatchToProps)(MessageForm)