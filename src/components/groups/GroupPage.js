import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL

import { startSetGroup, startCreateGroup } from '../../actions/groups'
import ManageGroup from './ManageGroup'
import GroupOffers from './GroupOffers'
const GroupPage = ({match,stateGroup,startSetGroup,user})=>{
    const [group,setGroup] = useState({})
   
    const [isRequested,setIsRequested] = useState(false)
    const [isMember,setIsMember] = useState(false)
    const [error,setError] = useState('')
    useEffect(()=>{
        if(!stateGroup._id || stateGroup._id!==match.params.id){
            startSetGroup(match.params.id)
        }else{
            setGroup(stateGroup)
        }
    },[])
    useEffect(()=>{
        setGroup(stateGroup)
        setIsMember(stateGroup.membership === 'member' || stateGroup.membership ==='admin')
        setIsRequested(stateGroup.membership==='requested')
        
    },[stateGroup,startSetGroup])

    const sendMembershipRequest = (e)=>{
        axios.post('/group/'+group._id+'/member')
        .then((res)=>{
            if(group.securityStatus==='open'){
                setIsMember(true)
                
            }else{
                setIsRequested(true)
            }
        })
        .catch((e)=>setError(e))
    }

    return (
        <div>
            {group._id===match.params.id ? (
                <div>
                    {group.hasImage && (<img className="header__picture" src={process.env.DEV_URL+"/group/"+group._id+"/image"}/>)}
                    <h3>{group.name}</h3>
                    <p>{group.description}</p>
                    <p>{group.locationText}</p>
                    <ul>{group.keywords.map((keyword)=>(<li key={keyword.name}><Link to={'/keyword/'+keyword._id}>{keyword.name}</Link></li>))}</ul>
                    
                    {isMember?(
                        <div>
                            <GroupOffers group_id={group._id}/>
                            <ManageGroup/>
                        </div>
                    ):(<div>
                        {(group.securityStatus==='onRequest' || group.securityStatus==='open')?
                        (isRequested?(<p>Demande pour rejoindre le groupe envoyée</p>):(
                            <button onClick={sendMembershipRequest}>Rejoindre le groupe</button>
                        )):(<p>Groupe privé, vous devez être invité au groupe</p>)}  
                        
                    </div>)}
                </div>
            ):(<p>Erreur, pas de groupe correspondant</p>)}
        </div>
        )
}

const mapStateToProps = (state)=>({
    stateGroup : state.group,
    user : state.user
})

const mapDispatchToProps = (dispatch)=>({
    startSetGroup : (id)=>dispatch(startSetGroup(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(GroupPage)