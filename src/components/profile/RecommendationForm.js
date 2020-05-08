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
            sendRecommendation(content)
            setContent('')
        }
        
    }
    return (
        <div>
            {error && (<p>{error}</p>)}
            <form onSubmit={onSubmit}>
                <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Veuillez raconter comment s'est passé votre travail avec cette personne">
                </textarea>
                <button>Publier</button>
            </form>
        </div>
        
    )
}
