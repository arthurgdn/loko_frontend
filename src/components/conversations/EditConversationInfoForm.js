import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import ImageUploader from 'react-images-upload'
import {startEditConversation} from '../../actions/conversations'
const EditConversationInfoForm = ({_id,name,description,startEditConversation,setDisplayEditConvInfoForm,editSpecificConversationError})=>{
    const [nameInput,setNameInput]=useState(name?name:'')
    const [descriptionInput,setDescriptionInput] = useState(description?description:'')
    const [image,setImage]=useState({})
    const [frontEditConvError,setFrontEditConvError] = useState('')
    useEffect(()=>{
        setFrontEditConvError(editSpecificConversationError)
    },[editSpecificConversationError])
    const onSubmit = (e)=>{
        e.preventDefault()
        startEditConversation(_id,{name:nameInput,description:descriptionInput},image)
        
        setDisplayEditConvInfoForm(false)
    }
    return (
        <form onSubmit={onSubmit} className="conversation__edit-form">
            <input 
                type="text"
                onChange={(e)=>setNameInput(e.target.value)}
                value={nameInput}
                placeholder = "Nom de la conversation"
                className="conversation__edit-input"
            />
            <textarea 
                type="text"
                onChange={(e)=>setDescriptionInput(e.target.value)}
                value={descriptionInput}
                placeholder="Description de la conversation"
                className="conversation__edit-textarea"
            ></textarea>
                    <ImageUploader
                    label={'Taille maximale : 5mb'}
                    withIcon={false}
                    buttonText="Choisir une image"
                    onChange={(file)=>setImage(file[0])}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                    withPreview={true}
                    singleImage={true}
                    fileContainerStyle={
                        {background: '#fafafa',
                        boxShadow:'none'
                    }}
                    />
            <button className="conversation__edit-button">Enregistrer</button>
            {frontEditConvError && (<p>{frontEditConvError}</p>)}
        </form>
    )
}
const mapStateToProps = (state)=>({
    editSpecificConversationError : state.conversation.editSpecificConversationError
})
const mapDispatchToProps = (dispatch)=>({
    startEditConversation : (id,updates,image)=>dispatch(startEditConversation(id,updates,image))
})
export default connect(mapStateToProps,mapDispatchToProps)(EditConversationInfoForm)