import React, {useState, useEffect} from 'react';
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL;
import OfferElement from '../offer/OfferElement';


export default ({match})=>{


  const [offer, setOffer]= useState({});
  const [error, setError]=useState('');

  useEffect(()=>{

    axios.get('/offer/'+match.params.id).then((res)=>
      setOffer(res.data)
    ).catch(()=>{
      setError('Erreur lors du chargement de l\'annonce');
    });


  }, []);

  return (
    <div>
      {error &&<p>{error}</p>}

      <div className="content-container">
        {Object.keys(offer).length===0
          ?!error && <p>Aucune annonce ne correspond</p>
          :<OfferElement
            displayCollaborationDemandForm={true}
            displayComments={true}
            displayAllComments={true}
            key={offer._id} {...offer}/>}
      </div>
    </div>
  );
};
