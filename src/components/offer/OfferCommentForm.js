import React,{useState} from 'react'
export default ({onNewComment})=>{
    const [content,setContent]=useState('')
    const onSubmit = (e)=>{
        e.preventDefault()
        onNewComment({content})
        setContent('')
    }
    const disabled = content.length===0
    return (
        <form onSubmit={onSubmit} className="offer-element__comment-form">
            <textarea className="offer-element__comment-text" placeholder="Rédigez un commentaire à cette annonce" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
            <button disabled={disabled} className="offer-element__comment-button">Envoyer</button>
        </form>
    )
}