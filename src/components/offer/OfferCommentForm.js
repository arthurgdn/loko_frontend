import React,{useState} from 'react'
export default ({onNewComment})=>{
    const [content,setContent]=useState('')
    const onSubmit = (e)=>{
        e.preventDefault()
        onNewComment({content})
        setContent('')
    }
    return (
        <form onSubmit={onSubmit}>
            <p>Mon commentaire : </p>
            <textarea value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
            <button>Envoyer</button>
        </form>
    )
}