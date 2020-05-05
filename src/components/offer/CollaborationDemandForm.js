import React,{useState} from 'react'

export default ({onCollaborationDemandSent})=>{
    const [displayForm,setDisplayForm] = useState(false)
    const [message,setMessage] = useState('')
    const onSubmit = (e)=>{
        e.preventDefault()
        onCollaborationDemandSent(message)
    }
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
                    <button>Envoyer</button>
                </form>
            )}
        </div>
    )
}