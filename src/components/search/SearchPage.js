import React, {useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
axios.defaults.baseURL = process.env.DEV_URL;
import SearchedGroups from './SearchedGroups';
import SearchedUsers from './SearchedUsers';
import SearchedOffers from './SearchedOffers';

const SearchPage = ()=>{
  const [searchText, setSearchText]=useState('');
  const [category, setCategory]=useState('offers');
  const [searchResults, setSearchResults]=useState({
    groups: [], offers: [], users: []
  });
  const [submittedResearch, setSubmittedResearch]=useState(false);
  const [error, setError]=useState('');
  const onSubmit= (e)=>{
    e.preventDefault();
    if(searchText.length>0) {
      axios.get('/search/'+searchText)
        .then((res)=>{
          setSearchResults(res.data);
          setSubmittedResearch(true);
        })
        .catch(()=>{setError('Erreur lors de la recherche');});
    }else{
      setError('Veuillez entrer une recherche');
    }


  };
  const enabled = searchText.length>0;
  return (
    <div>
      <div className="banner__title">
        <h3>Rechercher</h3>
      </div>
      <div className="search__wrapper">
        <form onSubmit={onSubmit} className="search__form">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchText}
            autoFocus
            onChange={(e)=>setSearchText(e.target.value)}
            className="search__input"
          />
          <button disabled={!enabled} className="search__button">Rechercher</button>
        </form>
        <div className="search__nav">
          <button
            className="search__nav-left"
            disabled={category==='offers'}
            onClick={()=>{setCategory('offers');}}>Annonces</button>
          <button
            disabled={category==='groups'}
            onClick={()=>{setCategory('groups');}}>Groupes</button>
          <button
            className="search__nav-right"
            disabled={category==='users'}
            onClick={()=>{setCategory('users');}}>Membres</button>
        </div>

        {error && <p className="search__infotext">{error}</p>}
        {submittedResearch
          ?<div className="search__results-container">
            {category==='offers' && <SearchedOffers offers={searchResults.offers}/>}
            {category==='groups' && <SearchedGroups groups={searchResults.groups}/>}
            {category==='users' && <SearchedUsers users={searchResults.users}/>}
          </div>:<p className="search__infotext">
          Recherchez des annonces, des groupes et d&apos;autres membres</p>}
      </div>


    </div>
  );
};
export default connect()(SearchPage);