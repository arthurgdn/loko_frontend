import React , {useState,useEffect} from 'react'
import {connect} from 'react-redux'

import axios from 'axios'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import ImageUploader from 'react-images-upload'
import { startCreateGroup } from '../../actions/groups'


const CreateGroupPage = ({allKeywords,startCreateGroup,history,userGroupCreatedError})=>{
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [securityStatus,setSecurityStatus] = useState('open')
    const [keywords,setKeywords] = useState([])
    const [location,setLocation] = useState({type:'Point',coordinates:[]})
    const [locationInput,setLocationInput] = useState('')
    const [useBrowserLocation,setUseBrowserLocation] = useState(false)
    const [locationText,setLocationText] = useState('')
    const [image,setImage] = useState({})
    const [error,setError] = useState('')

    useEffect(()=>{
        for(const keyword of allKeywords){
            keyword.value = keyword.name
            keyword.label= keyword.name
        }
    },[])
    useEffect(()=>{
        setError(userGroupCreatedError)
    },[userGroupCreatedError])

    const securityStatusIndex = [{value:"open",label:"Ouvert"},
    {value:"onRequest",label:"Sur demande"},
    {value:"private",label:"Privé"}]


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
                ).catch((e)=>setError('Impossible de déterminer la position'))
                
               
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
                const latitude = res.data.features[0].center[0]
                const longitude = res.data.features[0].center[1]
                setLocationText(res.data.features[0].place_name)
                setLocation({type:"Point",coordinates:[longitude,latitude]})
                
            }
        ).catch((e)=>{
            
            setError('Impossible de déterminer la position')})
        }

    const onSubmit =  (e)=>{
        e.preventDefault()
        if(name.length===0 || description.length===0 || locationText.length===0){
            setError('Veuillez renseigner toutes les informations')
        }else{
            const formattedKeywords = []
            for(const keyword of keywords){
                formattedKeywords.push(keyword.value)
            }
            startCreateGroup({
                name,
                description,
                securityStatus,
                keywords : formattedKeywords,
                location,
                locationText
            },image)
            history.push('/groups')
        }
        
    }
    return (
        <div>
            <div className="banner__title">
                <h3>Créer un groupe</h3>
            </div>
            <form onSubmit={onSubmit}>
        
                <input
                    type="text"
                    value={name}
                    required
                    onChange={(e)=>setName(e.target.value)}
                    placeholder="Nom du groupe"
                />
                <textarea
                    value={description}
                    required
                    onChange={(e)=>setDescription(e.target.value)}
                    placeholder="Description de ce groupe"
                ></textarea>
                <p>Localisation du groupe : </p>
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
                        placeholder="Localisation du groupe"
                        className="text-input"
                        onChange={onLocationInputChange}/>

                    )} 

                    {locationText&& <p>{locationText}</p>}
                    <p>Statut du groupe : </p>
                    <Select
                                defaultValue={securityStatusIndex.find((index)=>index.value==='open')}
                                options = {securityStatusIndex}
                                onChange={(options)=>setSecurityStatus(options.value)}
                            />
                    
                    <p>Mots clés associés</p>
                    <CreatableSelect
                        options = {allKeywords}
                        value={keywords}
                        isMulti
                        onChange = {(options)=>{
                            if(options===null){
                                setKeywords([])
                            }else{
                                const keywordsFormatted = []
                                for (const keyword of options){
                                    keywordsFormatted.push({value: keyword.value.toLowerCase(),label : keyword.value.toLowerCase()})
                                }
                                setKeywords(keywordsFormatted)
                            }}}
                    />
                    <p>Ajouter une image</p>
                    <ImageUploader
                        label={'Taille maximale : 5mb'}
                        withIcon={false}
                        buttonText="Choisir une image"
                        onChange={(imageFile)=>setImage(imageFile[0])}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                        withPreview={true}
                        singleImage={true}
                    />
                {error &&(<p>{error}</p>)}
                <button>Créer</button>
            </form>

        </div>
        
        
    )
}
const mapStateToProps =(state)=> ({
    allKeywords : state.keywords,
    userGroupCreatedError : state.user.userGroupCreatedError
})
const mapDispatchToProps = (dispatch)=>({
    startCreateGroup : (group,image)=>dispatch(startCreateGroup(group,image))
})
export default connect(mapStateToProps,mapDispatchToProps)(CreateGroupPage)
