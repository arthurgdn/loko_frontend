import React,{useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Select from 'react-select'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.DEV_URL
import EditGroupForm from './EditGroupForm'
import {startSetCollaborators} from '../../actions/user'
const ManageGroup = ({collaborators,startSetCollaborators,group}) =>{
    const [displayEditGroup,setDisplayEditGroup] = useState(false)
    const [membershipRequests,setMembershipRequests] = useState([])
    const [displayedCollaborators,setDisplayedCollaborators] = useState([])
    const [invite,setInvite] = useState([])
    const [members,setMembers] = useState([])
    const [admins,setAdmins] = useState([])
    const [error,setError] = useState('')
    useEffect(()=>{
        if(group.membership==='admin' && group.securityStatus ==='onRequest'){
            axios.get('/group/'+group._id+'/members?status=requested').
            then((res)=>{setMembershipRequests(res.data)})
            .catch((e)=>{setError(e)})
        }
        axios.get('/group/'+group._id+'/members?status=member')
        .then((res)=>{
            console.log('members',res.data)
            setMembers(res.data)})
        .catch((e)=>{
            console.log(e)
            setError(e)})

        axios.get('/group/'+group._id+'/members?status=admin')
        .then((res)=>{setAdmins(res.data)})
        .catch((e)=>{
            console.log(e)
            setError(e)})

        startSetCollaborators()
    },[])

    useEffect(()=>{
        //On vérifie qu'on a le bon format pour la liste des collaborateurs
        if((collaborators.length>0 && Object.keys(collaborators[0]).length===3)||collaborators.length===0){
            const formattedCollaborators = []
            for (const collaborator of collaborators){
                formattedCollaborators.push({collaborator : collaborator.collaborator,value:collaborator.collaborator,label:collaborator.firstName + ' '+collaborator.lastName})
            }
            setDisplayedCollaborators(formattedCollaborators)
        }
    },[collaborators,startSetCollaborators])

    const onInviteMemberChange= (member)=>{
        setInvite(member)
    }
    const inviteMember = (e)=>{
        const userId = invite.collaborator
        axios.post('/group/'+group._id+'/member',JSON.stringify({_id:userId}))
        .then((res)=>{setMembers([...members,res.data])})
        .catch((e)=>{
            console.log(e)
            setError(e)})
    }
    const acceptRequest = (e)=>{
        const userId = e.currentTarget.id.substr(6,e.currentTarget.id.length)
        axios.patch('/group/'+group._id+'/member',JSON.stringify({updates : {status:'member'},_id:userId}))
        .then((res)=>{
            setMembershipRequests(membershipRequests.filter((request)=>request.user!==userId))
            setMembers([...members,res.data])
        })
        .catch((e)=>{
            console.log(e)
            setError(e)})
    }
    const rejectRequest = (e)=>{
        const userId = e.currentTarget.id.substr(6,e.currentTarget.id.length)
        axios.post('/group/'+group._id+'/member/delete',JSON.stringify({_id:userId}))
        .then((res)=>{setMembershipRequests(membershipRequests.filter((request)=>request.user!==userId))})
        .catch((e)=>{setError(e)})
    }
    const removeMember = (e)=>{
        const userId = e.currentTarget.id.substr(6,e.currentTarget.id.length)
        axios.post('/group/'+group._id+'/member/delete',JSON.stringify({_id:userId}))
        .then((res)=>{setMembers(members.filter((member)=>member.user!==userId))})
        .catch((e)=>{
            console.log(e)
            setError(e)})
    }
    const promoteAdmin = (e)=>{
        const userId = e.currentTarget.id.substr(7,e.currentTarget.id.length)
        axios.patch('/group/'+group._id+'/member',JSON.stringify({updates : {status:'admin'},_id:userId}))
        .then((res)=>{
            setMembers(members.filter((member)=>member.user!==userId))
            setAdmins([...admins,res.data])
        })
        .catch((e)=>{setError(e)})
    }
    return (
        <div>
        <h3>Administrateurs : </h3>
        <ul>
        {admins.map((admin)=>(
            <div key={admin.user}>
                <Link to={'/profile/'+admin.user}><li>
                <p>{admin.firstName} {admin.lastName}</p>
            </li></Link></div>))}
        </ul>
        <h3>Membres : </h3>
            <ul>
            {members.map((member)=>(
                <div key={member.user}>
                <Link to={'/profile/'+member.user}><li>
                        <p>{member.firstName} {member.lastName}</p>
                    </li></Link></div>))}
            </ul>
        
        {group.membership==='admin' &&(
            <div>
                {group.securityStatus ==='onRequest'&& membershipRequests.map((memberRequest)=>(
                    <div key={memberRequest.user}>
                        <Link to={'/profile/'+memberRequest.user}>
                            <p>{memberRequest.firstName} {memberRequest.lastName}</p>
                        </Link>
                        <button id={"accept"+memberRequest.user} onClick={acceptRequest}>Accepter</button>
                        <button id={"accept"+memberRequest.user} onClick={rejectRequest}>Rejeter</button>
                    </div>))}
                <button onClick={()=>setDisplayEditGroup(!displayEditGroup)}>Modifier</button>
                {displayEditGroup && (<EditGroupForm/>)}
                
                {group.securityStatus ==='private' && (
                    <div>
                        <h3>Inviter un membre</h3>
                        <Select
                            options={displayedCollaborators}
                            isMulti={false}
                            onChange={onInviteMemberChange}
                        />
                        <button onClick={inviteMember}>Inviter</button>
                    </div>
                )}
                
                <h3>Gérer les membres : </h3>
                <ul>
                    {members.map((member)=>(
                        <div key={member.user}>
                            <li>
                                <Link to={'/profile/'+member.user}>
                                    <p>{member.firstName} {member.lastName}</p>
                                </Link>
                                <button id={"remove"+member.user} onClick={removeMember}>X</button>
                                <button id={"promote"+member.user} onClick={promoteAdmin}>Promouvoir  administrateur</button>
                                
                            </li>
                        </div>))}
                    </ul>
            </div>
            
            )  }
            
        
        </div>
        )
}
const mapStateToProps = (state)=>({
    group : state.group,
    collaborators : state.user.collaborators
})
const mapDispatchToProps = (dispatch)=>({
    startSetCollaborators : ()=>dispatch(startSetCollaborators())
})
export default connect(mapStateToProps,mapDispatchToProps)(ManageGroup)