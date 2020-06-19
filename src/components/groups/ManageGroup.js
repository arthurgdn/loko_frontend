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
        
        async function getMembers(){
            try{
                if(group.membership==='admin' && group.securityStatus ==='onRequest'){
                    const requestsResponse = awaitaxios.get('/group/'+group._id+'/members?status=requested')
                    setMembershipRequests(requestsResponse.data)
                }
                const memberResponse = await axios.get('/group/'+group._id+'/members?status=member')
                setMembers(memberResponse.data)
                const adminResponse = await axios.get('/group/'+group._id+'/members?status=admin')
                setAdmins(adminResponse.data)
            }catch(e){setError("Erreur serveur")}

        }
        getMembers()
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
            setError("Erreur serveur")})
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
            setError("Erreur serveur")})
    }
    const rejectRequest = (e)=>{
        const userId = e.currentTarget.id.substr(6,e.currentTarget.id.length)
        console.log('reject',userId)
        axios.post('/group/'+group._id+'/member/delete',JSON.stringify({_id:userId}))
        .then((res)=>{setMembershipRequests(membershipRequests.filter((request)=>request.user!==userId))})
        .catch((e)=>{setError("Erreur serveur")})
    }
    const removeMember = (e)=>{
        const userId = e.currentTarget.id.substr(6,e.currentTarget.id.length)
        axios.post('/group/'+group._id+'/member/delete',JSON.stringify({_id:userId}))
        .then((res)=>{setMembers(members.filter((member)=>member.user!==userId))})
        .catch((e)=>{
            console.log(e)
            setError("Erreur serveur")})
    }
    const promoteAdmin = (e)=>{
        const userId = e.currentTarget.id.substr(7,e.currentTarget.id.length)
        axios.patch('/group/'+group._id+'/member',JSON.stringify({updates : {status:'admin'},_id:userId}))
        .then((res)=>{
            setMembers(members.filter((member)=>member.user!==userId))
            setAdmins([...admins,res.data])
        })
        .catch((e)=>{setError("Erreur serveur")})
    }
    return (
        <div className="manager__sidebar-container">
            
            <div className="manager__sidebar-body">
                <h3>Administrateur{admins.length>1 &&'s'} : </h3>
                <div className="manager__sidebar-members">
                    {admins.map((admin)=>(
                        <Link to={'/profile/'+admin.user} key={admin.user} className="offer-element__comment-subheader">
                            <img className="header__picture offer-element__comment-picture" src={process.env.DEV_URL+"/users/"+admin.user+"/avatar"}/>
                            <p>{admin.firstName} {admin.lastName}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {members.length>0 && (
                <div className="manager__sidebar-body">
                    <h3>Membre{members.length>1 &&'s'} : </h3>
                    <div className="manager__sidebar-members">
                        {console.log('membeeers',members)}
                        {members.map((member)=>(
                            <Link to={'/profile/'+member.user} key={member.user} className="offer-element__comment-subheader">
                                <img className="header__picture offer-element__comment-picture" src={process.env.DEV_URL+"/users/"+member.user+"/avatar"}/>
                                <p>{member.firstName} {member.lastName}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        
        
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
                    {error && (<p>{error}</p>)}
            </div>
            
            )  }
            
        
        </div>
        )
}
const mapStateToProps = (state)=>({
    group : state.group,
    collaborators : state.user.collaborators,
    
})
const mapDispatchToProps = (dispatch)=>({
    startSetCollaborators : ()=>dispatch(startSetCollaborators())
})
export default connect(mapStateToProps,mapDispatchToProps)(ManageGroup)