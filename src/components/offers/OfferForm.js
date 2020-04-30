import React from 'react'

import axios from 'axios'
import Slider from 'rc-slider'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import ImageUploader from 'react-images-upload'
import 'rc-slider/assets/index.css';
import { connect } from 'react-redux'
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const TippedSlider = createSliderWithTooltip(Slider)
//import {SingleDatePicker} from 'react-dates'

//import 'react-dates/initialize'



 class OfferForm extends React.Component{
    constructor(props){
        super(props)
        const userGroups = props.userGroups
        const allKeywords = props.allKeywords
        
        for(const group of userGroups){
            
            group.value = group._id
            group.label = group.name
        }
        for(const keyword of allKeywords){
            keyword.value = keyword.name
            keyword.label= keyword.name
        }
        
        this.state = {
        title : props.title ? props.title : '',
        //Location input will be a string, but geocode api will transform it to the required format
        location : props.location?props.location : {type:['Point'],coordinates:[]},
        locationInput : props.locationInput ? props.locationInput : '',
        locationResult : props.locationResult?props.locationResult : '',
        useBrowserLocation: false,
        locationRadius : props.locationRadius?props.locationRadius : 0,
        scope : props.scope?props.scope : 'general',
        keywords : props.keywords?props.keywords : [],
        image : props.image?props.image : {},
        description : props.description ? props.description :'',
        groups : props.groups ? props.groups : [],
        userGroups,
        allKeywords,
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
    onUseBrowserLocationChange = (e)=>{
        const useBrowserLocation = e.target.checked
        if(useBrowserLocation){
        if(navigator.geolocation){
             navigator.geolocation.getCurrentPosition((position)=>{
                const longitude = position.coords.longitude
                const latitude = position.coords.latitude
                
                axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.MAPBOX_API_KEY}&language=fr&limit=1`).then(
                    (res)=>{
                        const features = res.data.features[0].context
                        
                        this.setState({locationResult :features[1].text_fr + ", "+ features[2].text_fr +", "+features[3].text_fr }) 
                        this.setState({locationInput : ''})
                        this.setState({location : {type : "Point",coordinates:[longitude,latitude]}})
                    }
                ).catch((e)=>this.setState({error:'Impossible de déterminer la position'}))
                
               
                this.setState(()=>({useBrowserLocation}))
            })
        }else{
            this.setState(()=>({error:'Vous devez autoriser la géolocalisation'}))
        }}
        else{
            this.setState(()=>({useBrowserLocation}))
            this.setState(()=>({locationResult : ''}))
        }
        
    }
    onLocationInputChange = (e)=>{
        const locationInput = e.target.value
        this.setState(()=>({locationInput}))
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationInput)}.json?access_token=${process.env.MAPBOX_API_KEY}&language=fr&limit=1`).then(
            (res)=>{
                const latitude = res.data.features[0].center[0]
                const longitude = res.data.features[0].center[1]
                this.setState({locationResult : res.data.features[0].place_name})
                this.setState({location : {type : "Point",coordinates:[longitude,latitude]}})
            }
        ).catch((e)=>{
            
            this.setState({error:'Impossible de déterminer la position'})})
        }
    
    onLocationRadiusChange = (value)=>{
        
        this.setState(()=>({locationRadius: Math.round(10**(value/1000))/10}))
    }
    onDescriptionChange = (e)=>{
        const description = e.target.value
        this.setState(()=>({description}))
    }
    onScopeChange = (e)=>{
        const scope = e.target.checked?'group':'general'
        this.setState(()=>({groups:[]}))
        this.setState(()=>({scope}))
    }
    onGroupsChange = (groups)=>{
        if(groups===null){
            this.setState(()=>({groups:[]}))
        }else{
        const groupsFormatted = []
        for (const group of groups){
            groupsFormatted.push({group: group._id})
        }
        this.setState(()=>({groups:groupsFormatted}))
    }
    }
    //Might be a bit different when we add a new keyword to the list
    onKeywordsChange = (keywords)=>{
        if(keywords===null){
            this.setState(()=>({keywords:[]}))
        }else{
        const keywordsFormatted = []
        for (const keyword of keywords){
            keywordsFormatted.push({keyword: keyword.value.toLowerCase()})
        }
        this.setState(()=>({keywords:keywordsFormatted}))
    }
    }
    onImageChange = (imageFile,imageUrl)=>{
        
        this.setState(()=>({image:imageFile[0]}))
    }
    onSubmit = (e)=> {
        e.preventDefault()
        if(!this.state.description || !this.state.title || this.state.location.coordinates.length===0 || !this.state.scope){
            this.setState(()=>({error:'Veuillez renseigner les informations obligatoires'}))
        }else{
            this.setState(()=>({error:''}))
            this.props.onSubmit({
                title: this.state.title,
                description:this.state.description,
                location : this.state.location,
                locationRadius : this.state.locationRadius,
                scope : this.state.scope,
                keywords: this.state.keywords,
                groups : this.state.groups
                
            },this.state.image)
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
                        required
                        onChange={this.onTitleChange}
                    />
                    <textarea placeholder="Description de l'annonce (...)"
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                        className="textarea"
                        required
                    ></textarea>

                    
                    <p>Utiliser ma position</p>
                    <div className="toggle-switch-location">
                        <input type="checkbox" checked={this.state.useBrowserLocation} 
                        onChange={this.onUseBrowserLocationChange}
                        className="toggle-switch-checkbox-location" name="useBrowserLocation"  id="useBrowserLocation" />
                        <label className="toggle-switch-label-location" htmlFor="useBrowserLocation">
                        <span className="toggle-switch-inner-location"></span>
                        <span className="toggle-switch-switch-location"></span>
                        </label>
                    </div>
                    {!this.state.useBrowserLocation&& (
                        <input type="text"
                        disabled={this.state.useBrowserLocation}
                        value = {this.state.locationInput}
                        placeholder="Lieu de l'annonce"
                        className="text-input"
                        onChange={this.onLocationInputChange}/>

                    )} 

                    {this.state.locationResult&& <p>{this.state.locationResult}</p>}
                    <p>L'offre concerne un rayon de (km) :</p>
                    
                    <TippedSlider
                    min={0}
                    max={4000}
                    onChange={this.onLocationRadiusChange}
                    tipFormatter={(value)=>Math.round(10**(value/1000))/10}
                    marks = {{1000:"1",2000:"10",3000:"100",4000:"1000"}}
                    />
                    <p>Statut de la publication :</p>
                    <div className="toggle-switch">
                        <input type="checkbox" checked={this.state.scope==='group'} 
                        onChange={this.onScopeChange}
                        className="toggle-switch-checkbox" name="toggleSwitchPublic"  id="toggleSwitchPublic" />
                        <label className="toggle-switch-label" htmlFor="toggleSwitchPublic">
                        <span className="toggle-switch-inner"></span>
                        <span className="toggle-switch-switch"></span>
                        </label>
                        </div>
                    {this.state.scope==='group'&&( <div>
                        <p>Publier dans le groupe suivant : </p>
                        <Select 
                        options={this.state.userGroups}
                        isMulti
                        onChange = {this.onGroupsChange}
                        /> </div>) }
                    
                    <p>Mots clés associés</p>
                    <CreatableSelect
                    options = {this.state.allKeywords}
                    isMulti
                    onChange = {this.onKeywordsChange}
                    />
                    <p>Ajouter une image</p>
                    <ImageUploader
                    label={'Taille maximale : 5mb'}
                    withIcon={false}
                    buttonText="Choisir une image"
                    onChange={this.onImageChange}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                    withPreview={true}
                    singleImage={true}
                    />
                    
                    
                    
                    
                    <div>
                        <button className="button">Publier l'annonce</button>
                    </div>
                    
                </form>
            
        )
    }
}
const mapStateToProps =(state)=> ({
    userGroups : state.user.userGroups,
    allKeywords : state.keywords
})
export default connect(mapStateToProps)(OfferForm)