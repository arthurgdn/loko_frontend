import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import ImageUploader from 'react-images-upload';
import { startEditGroup } from '../../actions/groups';

const EditGroupPage = ({
  startEditGroup, group, allKeywords, setGroupError
})=>{
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description);
  const [securityStatus, setSecurityStatus] = useState(group.securityStatus);
  const [keywords, setKeywords] = useState([]);
  const [location, setLocation] = useState(group.location);
  const [locationInput, setLocationInput] = useState('');
  const [useBrowserLocation, setUseBrowserLocation] = useState(false);
  const [locationText, setLocationText] = useState(group.locationText);
  const [image, setImage] = useState({});
  const [error, setError] = useState('');

  const securityStatusIndex = [{value: 'open', label: 'Ouvert'},
    {value: 'onRequest', label: 'Sur demande'},
    {value: 'private', label: 'Privé'}];
  useEffect(()=>{
    setError(setGroupError);
  }, [setGroupError]);
  useEffect(()=>{
    for(const keyword of allKeywords) {
      keyword.value = keyword.name;
      keyword.label= keyword.name;
    }
    const formattedKeywords = [];
    for(const keyword of group.keywords) {
      formattedKeywords.push({value: keyword.name, label: keyword.name});
    }
    setKeywords(formattedKeywords);

  }, []);


  const onUseBrowserLocationChange = (e)=>{
    const useBrowser = e.target.checked;
    if(useBrowser) {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;

          axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/
              ${longitude},${latitude}.json?access_token=
              ${process.env.MAPBOX_API_KEY}&language=fr&limit=1`).then(
            (res)=>{
              const features = res.data.features[0].context;
              setLocationText(
                features[1].text_fr + ', '+ features[2].text_fr +', '+features[3].text_fr
              );
              setLocationInput('');
              setLocation({type: 'Point', coordinates: [longitude, latitude]});

            }
          ).catch(()=>setError('Impossible de déterminer la position'));


          setUseBrowserLocation(useBrowser);
        });
      }else{
        setError('Vous devez autoriser la géolocalisation');

      }}
    else{
      setUseBrowserLocation(useBrowser);
      setLocationText('');

    }
  };
  const onLocationInputChange = (e)=>{
    const locationInput = e.target.value;
    setLocationInput(locationInput);
    axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/
        ${encodeURIComponent(locationInput)}.json?access_token=
        ${process.env.MAPBOX_API_KEY}&language=fr&limit=1`).then(
      (res)=>{
        const latitude = res.data.features[0].center[0];
        const longitude = res.data.features[0].center[1];
        setLocationText(res.data.features[0].place_name);
        setLocation({type: 'Point', coordinates: [longitude, latitude]});

      }
    ).catch(()=>{

      setError('Impossible de déterminer la position');});
  };

  const onSubmit =  (e)=>{
    e.preventDefault();
    if(name.length===0 || description.length===0 || locationText.length===0) {
      setError('Veuillez renseigner les champs requis');
    }else{
      const formattedKeywords = [];
      for(const keyword of keywords) {
        formattedKeywords.push(keyword.value);
      }
      startEditGroup(group._id, {
        name,
        description,
        securityStatus,
        keywords: formattedKeywords,
        location,
        locationText
      }, image);
    }

  };


  return (
    <div>
      <div className="banner__title">
        <h3>Modifier les informations d&apos;un groupe</h3>
      </div>
      <div className="content-container">
        <form onSubmit={onSubmit} className="group__page-container">
          <input
            type="text"
            value={name}
            className="offer-form__input"
            required
            onChange={(e)=>setName(e.target.value)}
            placeholder="Nom du groupe"
          />
          <textarea
            value={description}
            required
            onChange={(e)=>setDescription(e.target.value)}
            className="offer-form__textarea"
            placeholder="Description de ce groupe"
          ></textarea>

          <div className="settings__horizontal-lignup">
            <p>Utiliser votre position actuelle : </p>
            <div className="toggle-switch-location">
              <input type="checkbox" checked={useBrowserLocation}
                onChange={onUseBrowserLocationChange}
                className="toggle-switch-checkbox-location"
                name="useBrowserLocation"
                id="useBrowserLocation" />
              <label className="toggle-switch-label-location" htmlFor="useBrowserLocation">
                <span className="toggle-switch-inner-location"></span>
                <span className="toggle-switch-switch-location"></span>
              </label>
            </div>
          </div>

          {!useBrowserLocation&&
                        <input type="text"
                          disabled={useBrowserLocation}
                          value = {locationInput}
                          placeholder="Entrez ici la localisation du groupe"
                          className="settings__input settings__location-input"
                          onChange={onLocationInputChange}
                        />

          }

          {locationText&& <p>La position s&apos;affiche :
            <span className="settings__location-text">{locationText}</span></p>}

          <p>Statut du groupe : </p>
          <Select
            defaultValue={securityStatusIndex.find((index)=>index.value===group.securityStatus)}
            options = {securityStatusIndex}
            onChange={(options)=>setSecurityStatus(options.value)}
            placeholder="Statut du groupe"
          />


          <p>Mots clés associés</p>
          <CreatableSelect
            options = {allKeywords}
            value={keywords}
            isMulti
            noOptionsMessage={()=>'Aucune suggestion'}
            placeholder="Mots clés"
            onChange = {(options)=>{
              if(options===null) {
                setKeywords([]);
              }else{
                const keywordsFormatted = [];
                for (const keyword of options) {
                  keywordsFormatted.push(
                    {value: keyword.value.toLowerCase(), label: keyword.value.toLowerCase()}
                  );
                }
                setKeywords(keywordsFormatted);
              }}}
          />
          <p>Ajouter une image</p>
          <ImageUploader
            label={'Taille maximale : 5mb'}
            withIcon={false}
            buttonText="Choisir une image"
            onChange={(imageFile)=>setImage(imageFile[0])}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withPreview={true}
            singleImage={true}
            fileContainerStyle={
              {
                background: '#fafafa',
                boxShadow: 'none'
              }}
          />
          <button className="offer-form__button">Modifier</button>
          {error &&<p>{error}</p>}
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state)=>({
  group: state.group,
  allKeywords: state.keywords,
  setGroupError: state.group.setGroupError
});
const mapDispatchToProps = (dispatch)=>
  ({startEditGroup: (id, updates, image)=>dispatch(startEditGroup(id, updates, image))});
export default connect(mapStateToProps, mapDispatchToProps)(EditGroupPage);