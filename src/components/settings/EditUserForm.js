import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import ImageUploader from 'react-images-upload'
import axios from 'axios'
import {startEditUserInfo} from '../../actions/user'
import getLocationFormatted from '../../actions/getLocationFormatted'
const EditUserForm = ({user,startEditUserInfo})=>{
    const [firstName,setFirstName] = useState(user.firstName?user.firstName:'')
    const [lastName,setLastName] = useState(user.lastName?user.lastName:'')
    
    const [profilePicture,setProfilePicture] = useState('')
    const [location,setLocation] = useState(user.location?user.location:{type:'Point',coordinates:[]})
    const [useBrowserLocation,setUseBrowserLocation] = useState(false)
    const [locationInput,setLocationInput] = useState('')
    const [locationText,setLocationText] = useState(user.locationText?user.locationText:'')
   
    
    const [error,setError]= useState('')
    
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
                ).catch((e)=>setError(e))
                
               
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
            <form onSubmit={onSubmit}>
            {error && (<p>{error}</p>)}
                <input
                    type="text"
                    value={firstName}
                    placeholder="Prénom"
                    onChange={(e)=>setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    value={lastName}
                    placeholder="Nom"
                    onChange={(e)=>setLastName(e.target.value)}
                />
                <p>Ma position</p>
                <p>Utiliser ma position</p>
                    <div className="toggle-switch-location">
                        <input type="checkbox" checked={useBrowserLocation} 
                        onChange={onUseBrowserLocationChange}
                        className="toggle-switch-checkbox-location" name="useBrowserLocation"  id="useBrowserLocation" />
                        <label className="toggle-switch-label-location" htmlFor="useBrowserLocation">
                        <span className="toggle-switch-inner-location"></span>
                        <span className="toggle-switch-switch-location"></span>
                        </label>
                    </div>
                    {!useBrowserLocation&& (
                        <input type="text"
                        disabled={useBrowserLocation}
                        value = {locationInput}
                        placeholder="Ma localisation"
                        className="text-input"
                        onChange={onLocationInputChange}/>

                    )} 

                    {locationText&& <p>{locationText}</p>}
                    <p>Photo de profil</p>
                    <img  src={process.env.DEV_URL+"/users/"+user._id+"/avatar"}/>
                    <ImageUploader
                    label={'Taille maximale : 5mb'}
                    withIcon={false}
                    buttonText="Choisir une image"
                    onChange={(file)=>setProfilePicture(file[0])}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                    withPreview={true}
                    singleImage={true}
                    
                    />
                <button>Enregistrer</button>
            </form>
            
        </div>
    )
}
const mapStateToProps = (state)=>({
    
    user : state.user
})
const mapDispatchToProps = (dispatch)=>({
    startEditUserInfo : (updates,profilePicture)=>dispatch(startEditUserInfo(updates,profilePicture))
})
export default connect(mapStateToProps,mapDispatchToProps)(EditUserForm)
