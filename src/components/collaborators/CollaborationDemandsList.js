import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {startSetCollaborationDemands,startNewCollaboration} from '../../actions/user'
const CollaborationDemandsList = ({collaborationDemands,startSetCollaborationDemands,startNewCollaboration,setCollaborationDemandsError,newCollabError})=>{
    const [displayedDemands,setDisplayedDemands] = useState([])
    const [error,setError]=useState('')
    useEffect(()=>{
        startSetCollaborationDemands()
    },[])
    useEffect(()=>{
        setError(setCollaborationDemandsError)
    },[setCollaborationDemandsError])

    useEffect(()=>{
        setError(newCollabError)
    },[newCollabError])
    useEffect(()=>{
        //On vérifie qu'on a le bon format pour la liste des demandes
        if((collaborationDemands.length>0 && Object.keys(collaborationDemands[0]).length===3)||collaborationDemands.length===0){
            setDisplayedDemands(collaborationDemands)
        }
    },[collaborationDemands,startSetCollaborationDemands])
    const accept=(e)=>{
        const collaborator = e.currentTarget.id.substr(6,e.currentTarget.id.length)
        
        startNewCollaboration(collaborator,'accept')
    }
    const reject = (e)=>{
        const collaborator = e.currentTarget.id.substr(6,e.currentTarget.id.length)
        
        startNewCollaboration(collaborator,'reject')
    }
    return (
        <div>
        {!displayedDemands.length>0? (<p>Aucuns demandes de collaboration pour l'instant</p>) : 
            displayedDemands.map((demand)=>{return (
                <div key={demand.demand}>
                    <Link to={'/profile/'+demand.demand}>
                        <img className="header__picture" src={process.env.DEV_URL+"/users/"+demand.demand+"/avatar"}/>
                        <p>{demand.firstName} {demand.lastName}</p>
                    </Link>
                    <button id={"accept"+demand.demand} onClick={accept}>Accepter</button>
                    <button id={"reject"+demand.demand} onClick={reject}>Rejeter</button>
                </div>
            )})
        }
        {error && (<p>{error}</p>)}
        </div>
        
    )
}
const mapStateToProps = (state)=>({
    collaborationDemands : state.user.collaborationDemands,
    setCollaborationDemandsError: state.user.setCollaborationDemandsError,
    newCollabError:state.user.newCollabError
})
const mapDispatchToProps = (dispatch)=>({
    startSetCollaborationDemands : ()=>dispatch(startSetCollaborationDemands()),
    startNewCollaboration : (collaborator,status)=>dispatch(startNewCollaboration(collaborator,status))
})

export default connect(mapStateToProps,mapDispatchToProps)(CollaborationDemandsList)