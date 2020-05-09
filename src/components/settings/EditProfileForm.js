import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import {startEditProfile,startSetProfile,startEditCompletedOffers} from '../../actions/profile'
import {startSetOffers} from '../../actions/offers'
const EditProfileForm = ({profile={},stateOffers,startEditCompletedOffers,startSetOffers,user,startSetProfile,startEditProfile,allKeywords})=>{
    
    
     
    const [description,setDescription] = useState(profile.description?profile.description:'')
    const [summary,setSummary] = useState(profile.summary?profile.summary:'')
    const [skills,setSkills] = useState(profile.skills?profile.skills:[])
    const [keywords,setKeywords] = useState(profile.keywords?profile.keywords:[])
    const [completedOffers,setCompletedOffers] = useState(profile.completedOffers?profile.completedOffers:[])
    const [offers,setOffers] = useState(stateOffers?stateOffers:[])
    useEffect(()=>{
        startSetProfile(user._id)
        startSetOffers()
    },[])
    useEffect(()=>{
        const formattedKeywords = []
        if(profile.keywords){
            
            for(const keyword of profile.keywords){
                
                formattedKeywords.push({value : keyword.name,label:keyword.name,_id:keyword._id})
            }
        }
        const formattedSkills = []
        if(profile.skills){
            for(const skill of profile.skills){
                
                formattedSkills.push({value : skill,label:skill})
            }
        }
        if(profile.completedOffers){
            for(const offer of profile.completedOffers){
                offer.value = offer.completedOffer?offer.completedOffer:offer._id
                offer.label = offer.title
                
            }
            
        }
        for(const keyword of allKeywords){
            keyword.value = keyword.name
            keyword.label= keyword.name
        }
           
        setDescription(profile.description?profile.description:'')
        setSummary(profile.summary?profile.summary:'')
        setKeywords(profile.keywords?formattedKeywords:[])
        setSkills(profile.skills?formattedSkills:[])
        setCompletedOffers(profile.completedOffers?profile.completedOffers:[])
        
        
    },[startSetProfile,profile])
    useEffect(()=>{
        if(stateOffers.length>0){
            for(const offer of stateOffers){
                offer.value = offer.completedOffer?offer.completedOffer:offer._id
                offer.label = offer.title
            }
            stateOffers = stateOffers.filter((offer)=>offer.completedStatus==='completed')
        }
        setOffers(stateOffers?stateOffers:[]) 
    },[startSetOffers,stateOffers,completedOffers])
    const onSubmit = (e)=>{
        e.preventDefault()
        const finalKeywords = []
        const finalSkills = []
        const finalCompletedOffers = []
        for(const keyword of keywords){
            finalKeywords.push(keyword.value)
        }
        for(const skill of skills){
            finalSkills.push(skill.value)
        }
        for(const completedOffer of completedOffers){
            console.log('sent value',completedOffer.value)
            finalCompletedOffers.push({_id:completedOffer.value})
        }

        startEditProfile({
            description,
            summary,
            skills:finalSkills,
            keywords :finalKeywords
        })
        
        startEditCompletedOffers(finalCompletedOffers)

    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Decrivez vous rapidement ici"/>
                <textarea value={summary} onChange={(e)=>setSummary(e.target.value)} placeholder="Expliquez ici ce que vous recherchez sur la plateforme..."></textarea>
                <p>Mes centres d'intérêts</p>
                <CreatableSelect
                    value = {keywords}
                    options = {allKeywords}
                    isMulti
                    onChange = {(new_keywords)=>setKeywords(new_keywords?new_keywords:[])}
                    />
                <p>Mes compétences</p>
                <CreatableSelect
                    value = {skills}
                    isMulti
                    onChange = {(new_skills)=>setSkills(new_skills?new_skills:[])}
                    />
                <p>Offres auxquelles j'ai répondu </p>
                <Select
                    value= {completedOffers}
                    options = {offers}
                    isMulti
                    onChange = {(new_offers)=>setCompletedOffers(new_offers?new_offers:[])}
                    />
                <button>Enregistrer</button>
            </form>
            
        </div>
    )
}
const mapStateToProps = (state)=>({
    profile : state.profile,
    allKeywords : state.keywords,
    user : state.user,
    stateOffers : state.offers
})
const mapDispatchToProps = (dispatch)=>({
    startEditProfile : (updates)=>dispatch(startEditProfile(updates)),
    startSetProfile : (profile_id)=>dispatch(startSetProfile(profile_id)),
    startSetOffers : ()=>dispatch(startSetOffers()),
    startEditCompletedOffers : (completedOffers)=>dispatch(startEditCompletedOffers(completedOffers))
})
export default connect(mapStateToProps,mapDispatchToProps)(EditProfileForm)
