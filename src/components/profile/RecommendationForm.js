import React,{useState} from 'react'

export default ({sendRecommendation})=>{
    const [content,setContent] = useState('')
    const [error,setError] = useState('')
    const onSubmit = (e)=>{
        e.preventDefault()
        if(content.length===0){
            setError('Veuillez renseigner du contenu')
        }
        else {
            sendRecommendation(content.replace(/\n\r?/g, '<br />'))
            setContent('')
        }
        
    }
    const disabled = content.length===0
    return (
        
            
            <form onSubmit={onSubmit} className="offer-element__comment-form">
                <textarea className="profile__recommendation-text" value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Veuillez raconter comment s'est passé votre travail avec cette personne">
                </textarea>
                <button className="offer-element__comment-button" disabled={disabled}>Publier</button>
                {error && (<p>{error}</p>)}
            </form>
        
        
    )
}
