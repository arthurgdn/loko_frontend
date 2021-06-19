import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {startSetOffers} from '../../actions/offers';
import OfferElement from './OfferElement';

const OfferList = ({
  offers, startSetOffers, setOffersError
})=>{
  const [showingOffers, setOffers]= useState([]);
  const [error, setError] = useState('');
  useEffect(()=>{
    setError(setOffersError);
  }, [setOffersError]);
  useEffect(()=>{

    startSetOffers();
  }, []);
  useEffect(()=>{

    setOffers(offers);
  }, [startSetOffers, offers]);
  return (
    <div className="content-container">
      {error && <p>{error}</p>}
      {showingOffers.length===0? !error &&
                <p>Vous n&apos;avez pas encore publié d&apos;offres</p>
        :showingOffers.map(
          (offer)=><OfferElement
            displayCollaborationDemandForm={true}
            displayComments={true}
            displayAllComments={false}
            key={offer._id}
            {...offer} />)
      }
    </div>

  );
};

const mapStateToProps = (state)=>({
  offers: state.offers.offers,
  setOffersError: state.offers.setOffersError
});
const mapDispatchToProps = (dispatch)=>({startSetOffers: ()=>dispatch(startSetOffers())});
export default connect(mapStateToProps, mapDispatchToProps)(OfferList);


