import React,{useState} from 'react'

export default ({onCollaborationDemandSent})=>{
    const [displayForm,setDisplayForm] = useState(false)
    const [message,setMessage] = useState('')
    const onSubmit = (e)=>{
        e.preventDefault()
        onCollaborationDemandSent(message)
        setMessage('')
    }
    const disabled = message.length===0
    return (
        <div>
            <button onClick={()=>setDisplayForm(!displayForm)}>Répondre à cette annonce</button>
            {displayForm &&(
                <form onSubmit={onSubmit}>
                    <textarea 
                        placeholder="Expliquez rapidement ce qui vous intéresse dans cette annonce..."
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                    ></textarea>
                    <button disabled={disabled}>Envoyer</button>
                </form>
            )}
        </div>
    )
}