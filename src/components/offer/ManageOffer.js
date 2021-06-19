import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import OfferElement from './OfferElement';
import ManageOfferSidebar from './ManageOfferSidebar';

const ManageOffer = ({
  offers, match, history
})=>{
  const [offer, setOffer]= useState({});
  useEffect(()=>{
    const foundOffer = offers.find((offer)=>String(offer._id)===match.params.id);
    setOffer(foundOffer?foundOffer:{});
    console.log(offer);
  }, []);

  return (
    <div className="manager__container">
      <div className="manager__offer-display">
        {Object.keys(offer).length===0
          ?<p>Aucune offre ne correspond</p>
          :<OfferElement
            displayCollaborationDemandForm={false}
            displayGroups={true}
            displayComments={false}
            key={offer._id} {...offer}/>}
      </div>
      <div className="manager__sidebar">
        {Object.keys(offer).length!==0 && <ManageOfferSidebar {...offer} history={history} />}
      </div>
    </div>
  );
};
const mapStateToProps = (state)=>({offers: state.offers.offers});

export default connect(mapStateToProps)(ManageOffer);
