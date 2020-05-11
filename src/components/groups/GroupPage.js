import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { startSetGroup, startCreateGroup } from '../../actions/groups'
import ManageGroup from './ManageGroup'
import GroupOffers from './GroupOffers'
const GroupPage = ({match,stateGroup,startSetGroup,user})=>{
    const [group,setGroup] = useState({})
    const [access,setAccess] = useState(false)
    useEffect(()=>{
        if(!stateGroup._id || stateGroup._id!==match.params.id){
            startSetGroup(match.params.id)
        }else{
            setGroup(stateGroup)
        }
    },[])
    useEffect(()=>{
        setGroup(stateGroup)
        setAccess(group.securityStatus ==='public' || !!user.userGroups.find((group)=>group._id===match.params.id))
    },[stateGroup,startSetGroup])

    
    return (
        <div>
            {group._id===match.params.id ? (
                <div>
                    {group.hasImage && (<img className="header__picture" src={process.env.DEV_URL+"/group/"+group._id+"/image"}/>)}
                    <h3>{group.name}</h3>
                    <p>{group.description}</p>  
                    {access?(
                        <div>
                            <GroupOffers group_id={group._id}/>
                            <ManageGroup/>
                        </div>
                    ):(<div>
                        {group.securityStatus==='onRequest'?(
                            <button>Demander à rejoindre le groupe</button>
                        ):(<p>Groupe privé, vous devez être invité au groupe</p>)}  
                        
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