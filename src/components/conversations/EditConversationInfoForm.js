import React, {useState} from 'react'
import {connect} from 'react-redux'
import ImageUploader from 'react-images-upload'
import {startEditConversation} from '../../actions/conversations'
const EditConversationInfoForm = ({_id,name,description,startEditConversation,setDisplayEditConvInfoForm})=>{
    const [nameInput,setNameInput]=useState(name?name:'')
    const [descriptionInput,setDescriptionInput] = useState(description?description:'')
    const [image,setImage]=useState({})
    const onSubmit = (e)=>{
        e.preventDefault()
        startEditConversation(_id,{name:nameInput,description:descriptionInput},image)
        setDisplayEditConvInfoForm(false)
    }
    return (
        <form onSubmit={onSubmit}>
            <input 
                type="text"
                onChange={(e)=>setNameInput(e.target.value)}
                value={nameInput}
                placeholder = "Nom de la conversation"
            />
            <textarea 
                type="text"
                onChange={(e)=>setDescriptionInput(e.target.value)}
                value={descriptionInput}
                placeholder="Description"
            ></textarea>
            <p>Image de la conversation</p>
                    <ImageUploader
                    label={'Taille maximale : 5mb'}
                    withIcon={false}
                    buttonText="Choisir une image"
                    onChange={(file)=>setImage(file[0])}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                    withPreview={true}
                    singleImage={true}
                    />
            <button>Enregistrer</button>
        </form>
    )
}
const mapDispatchToProps = (dispatch)=>({
    startEditConversation : (id,updates,image)=>dispatch(startEditConversation(id,updates,image))
})
export default connect(undefined,mapDispatchToProps)(EditConversationInfoForm)