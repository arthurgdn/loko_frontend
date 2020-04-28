import React from 'react'
import moment from 'moment'
//import {SingleDatePicker} from 'react-dates'

//import 'react-dates/initialize'



export default class OfferForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        title : props.title ? props.title : '',
        //Location input will be a string, but geocode api will transform it to the required format
        locationInput : props.locationInput ? props.locationInput : '',
        locationRadius : props.locationRadius?props.locationRadius : 0,
        scope : props.scope?props.scope : '',
        keywords : props.keywords?props.keywords : [],
        image : props.image?props.image : '',
        description : props.expense ? props.expense.description :'',
        error: ''
        }
    }
    
    onDescriptionChange = (e)=>{
        const description = e.target.value
        this.setState(()=>({description}))
    }
    onTitleChange = (e)=>{
        const title = e.target.value
        this.setState(()=>({title}))
    }

    // onLocationInputChange = (e)=>{
    //     const locationInput = e.target.value
    //     this.setState(()=>({locationInput}))
    // }
    onLocationRadiusChange = (e)=>{
        const locationRadius = e.target.value
        this.setState(()=>({locationRadius}))
    }
    onDescriptionChange = (e)=>{
        const description = e.target.value
        this.setState(()=>({description}))
    }
    onScopeChange = (e)=>{
        const scope = e.target.value
        this.setState(()=>({scope}))
    }
    //Might be a bit different when we add a new keyword to the list
    onKeywordsChange = (e)=>{
        const keywords = e.target.value
        this.setState(()=>({keywords}))
    }
    onImageChange = (e)=>{
        const image = e.target.value
        this.setState(()=>({image}))
    }
    onSubmit = (e)=> {
        e.preventDefault()
        if(!this.state.description || !this.state.title || !this.state.locationInput || !this.state.scope){
            this.setState(()=>({error:'Veuillez renseigner les informations obligatoires'}))
        }else{
            this.setState(()=>({error:''}))
            this.props.onSubmit({
                title: this.state.title,
                description:this.state.description,
                location : this.state.locationInput,
                locationRadius : this.state.locationRadius,
                scope : this.state.scope,
                keywords: this.state.keywords,
                image : this.state.image,
                

            })
        }
    }
    render(){
        return (
            
                
                <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input type="text" placeholder="Titre"  
                        value={this.state.title}
                        className="text-input"
                        autoFocus
                        onChange={this.onTitleChange}
                    />
                    <textarea placeholder="Description de l'annonce (...)"
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                        className="textarea"
                    ></textarea>
                    
                    
                    
                    <div>
                        <button className="button">Publier l'annonce</button>
                    </div>
                    
                </form>
            
        )
    }
}

