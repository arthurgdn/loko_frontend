import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import {startEditProfile,startSetProfile} from '../../actions/profile'
const EditProfileForm = ({profile={},user,startSetProfile,startEditProfile,allKeywords})=>{
    
    
     
    const [description,setDescription] = useState(profile.description?profile.description:'')
    const [summary,setSummary] = useState(profile.summary?profile.summary:'')
    const [skills,setSkills] = useState(profile.skills?profile.skills:[])
    const [keywords,setKeywords] = useState(profile.keywords?profile.keywords:[])
    const [completedOffers,setCompletedOffers] = useState(profile.completedOffers?profile.completedOffers:[])
    
    useEffect(()=>{
        startSetProfile(user._id)
    },[])
    useEffect(()=>{
        const formattedKeywords = []
        if(profile.keywords){
            
            for(const keyword of profile.keywords){
                
                formattedKeywords.push({value : keyword,label:keyword})
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
                offer.value = offer._id
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
    const onSubmit = (e)=>{
        e.preventDefault()
        const finalKeywords = []
        const finalSkills = []
        for(const keyword of keywords){
            finalKeywords.push(keyword.value)
        }
        for(const skill of skills){
            finalSkills.push(skill.value)
        }
        startEditProfile({
            description,
            summary,
            skills:finalSkills,
            keywords :finalKeywords
        })

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
                    
                    isMulti
                    onChange = {(new_offers)=>setCompletedOffers(new_offers?new_offer:[])}
                    />
                <button>Enregistrer</button>
            </form>
            
        </div>
    )
}
const mapStateToProps = (state)=>({
    profile : state.profile,
    allKeywords : state.keywords,
    user : state.user
})
const mapDispatchToProps = (dispatch)=>({
    startEditProfile : (updates)=>dispatch(startEditProfile(updates)),
    startSetProfile : (profile_id)=>dispatch(startSetProfile(profile_id))
})
export default connect(mapStateToProps,mapDispatchToProps)(EditProfileForm)
