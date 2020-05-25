import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
axios.defaults.baseURL = process.env.DEV_URL
import SearchedGroups from './SearchedGroups'
import SearchedUsers from './SearchedUsers'
import SearchedOffers from './SearchedOffers'
import Axios from 'axios'

const SearchPage = ()=>{
    const [searchText,setSearchText]=useState('')
    const [category,setCategory]=useState('offers')
    const [searchResults,setSearchResults]=useState({groups:[],offers:[],users:[]})
    const [submittedResearch,setSubmittedResearch]=useState(false)
    const [error,setError]=useState('')
    const onSubmit= (e)=>{
        e.preventDefault()
        if(searchText.length>0){
            axios.get('/search/'+searchText)
            .then((res)=>{
                console.log(res.data)
                setSearchResults(res.data)
                setSubmittedResearch(true)
            })
            .catch((e)=>{setError("Erreur lors de la recherche")})
        }else{
            setError('Veuillez entrer une recherche')
        }
        
        
    }
    const enabled = searchText.length>0
    return (
        <div>
            <h3>Rechercher</h3>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Rechercher"
                    value={searchText}
                    onChange={(e)=>setSearchText(e.target.value)}
                />
                <button disabled={!enabled}>Rechercher</button>
            </form>
            {error && (<p>{error}</p>)}
            <button onClick={()=>{setCategory('offers')}}>Annonces</button>
            <button onClick={()=>{setCategory('groups')}}>Groupes</button>
            <button onClick={()=>{setCategory('users')}}>Membres</button>
            {submittedResearch?(
                <div>
                    {category==='offers' && (<SearchedOffers offers={searchResults.offers}/>)}
                    {category==='groups' && (<SearchedGroups groups={searchResults.groups}/>)}
                    {category==='users' && (<SearchedUsers users={searchResults.users}/>)}
                </div>):(<p>Recherchez des annonces, des groupes et d'autres utilisateurs</p>)}
            
        </div>
    )
}
export default connect()(SearchPage)