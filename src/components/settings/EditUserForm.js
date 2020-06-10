import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import ImageUploader from 'react-images-upload'
import axios from 'axios'
import {startEditUserInfo} from '../../actions/user'
const EditUserForm = ({user,startEditUserInfo,editUserInfoError})=>{
    const [firstName,setFirstName] = useState(user.firstName?user.firstName:'')
    const [lastName,setLastName] = useState(user.lastName?user.lastName:'')
    
    const [profilePicture,setProfilePicture] = useState('')
    const [location,setLocation] = useState(user.location?user.location:{type:'Point',coordinates:[]})
    const [useBrowserLocation,setUseBrowserLocation] = useState(false)
    const [locationInput,setLocationInput] = useState('')
    const [locationText,setLocationText] = useState(user.locationText?user.locationText:'')
   
    
    const [error,setError]= useState('')
    useEffect(()=>{
        setError(editUserInfoError)
    },[editUserInfoError])
    const onUseBrowserLocationChange = (e)=>{
        const useBrowser = e.target.checked
        if(useBrowser){
        if(navigator.geolocation){
             navigator.geolocation.getCurrentPosition((position)=>{
                const longitude = position.coords.longitude
                const latitude = position.coords.latitude
                
                axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.MAPBOX_API_KEY}&language=fr&limit=1`).then(
                    (res)=>{
                        const features = res.data.features[0].context
                        setLocationText(features[1].text_fr + ", "+ features[2].text_fr +", "+features[3].text_fr)
                        setLocationInput('')
                        setLocation({type : "Point",coordinates:[longitude,latitude]})
                        
                    }
                ).catch((e)=>setError("Impossible de déterminer la position"))
                
               
                setUseBrowserLocation(useBrowser)
            })
        }else{
            setError('Vous devez autoriser la géolocalisation')
            
        }}
        else{
            setUseBrowserLocation(useBrowser)
            setLocationText('')
            
        }
    }
    const onLocationInputChange = (e)=>{
        const locationInput = e.target.value
        setLocationInput(locationInput)
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationInput)}.json?access_token=${process.env.MAPBOX_API_KEY}&language=fr&limit=1`).then(
            (res)=>{
                const longitude = res.data.features[0].center[0]
                const latitude = res.data.features[0].center[1]
                setLocationText(res.data.features[0].place_name)
                setLocation({type:"Point",coordinates:[longitude,latitude]})
                
            }
        ).catch((e)=>{
            
            setError('Impossible de déterminer la position')})
        }
    const onSubmit = (e)=>{
        e.preventDefault()
        
        startEditUserInfo({
            firstName,
            lastName,
            location,
            locationText
        },profilePicture)

    }
    return (
        <div>
            <h4 className="settings__section-title">Informations personnelles : </h4>
            <form onSubmit={onSubmit} className="settings__form">
            {error && (<p>{error}</p>)}
                <div className="settings__horizontal-wrapper">
                    <p>Prénom : </p><input
                        type="text"
                        value={firstName}
                        className="settings__input"
                        placeholder="Prénom"
                        onChange={(e)=>setFirstName(e.target.value)}
                    /><p>Nom : </p>
                    <input
                        type="text"
                        className="settings__input"
                        value={lastName}
                        placeholder="Nom"
                        onChange={(e)=>setLastName(e.target.value)}
                    />
                </div>
                
                <div className="settings__horizontal-lignup">
                    <p>Utiliser votre position actuelle : </p>
                    <div className="toggle-switch-location">
                        <input type="checkbox" checked={useBrowserLocation} 
                        onChange={onUseBrowserLocationChange}
                        className="toggle-switch-checkbox-location" name="useBrowserLocation"  id="useBrowserLocation" />
                        <label className="toggle-switch-label-location" htmlFor="useBrowserLocation">
                        <span className="toggle-switch-inner-location"></span>
                        <span className="toggle-switch-switch-location"></span>
                        </label>
                    </div>
                </div>
                    
                    {!useBrowserLocation&& (
                        <input type="text"
                        disabled={useBrowserLocation}
                        value = {locationInput}
                        placeholder="Entrez ici votre localisation"
                        className="settings__input settings__location-input"
                        onChange={onLocationInputChange}/>

                    )} 
                    
                    {locationText&& <p>Votre position s'affiche : <span className="settings__location-text">{locationText}</span></p>}
                    
                    <img  src={process.env.DEV_URL+"/users/"+user._id+"/avatar"} className="settings__img"/>
                    <ImageUploader
                    fileContainerStyle={
                        {background: '#fafafa',
                        boxShadow:'none'
                    }
                    }
                    label={'Taille maximale : 5mb'}
                    withIcon={false}
                    buttonText="Choisir une image"
                    onChange={(file)=>setProfilePicture(file[0])}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                    withPreview={true}
                    singleImage={true}
                    
                    />
                <button className="settings__button">Enregistrer</button>
            </form>
            
        </div>
    )
}
const mapStateToProps = (state)=>({
    
    user : state.user,
    editUserInfoError : state.user.editUserInfoError
})
const mapDispatchToProps = (dispatch)=>({
    startEditUserInfo : (updates,profilePicture)=>dispatch(startEditUserInfo(updates,profilePicture))
})
export default connect(mapStateToProps,mapDispatchToProps)(EditUserForm)
