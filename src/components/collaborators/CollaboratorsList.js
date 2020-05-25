import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {startSetCollaborators} from '../../actions/user'
const CollaboratorsList = ({collaborators,startSetCollaborators,setCollaboratorsError})=>{
    const [displayedCollaborators,setDisplayedCollaborators] = useState([])
    const [error,setError]=useState([])
    useEffect(()=>{
        startSetCollaborators()
    },[])
    useEffect(()=>{
        setError(setCollaboratorsError)
    },[setCollaboratorsError])
    useEffect(()=>{
        //On vérifie qu'on a le bon format pour la liste des collaborateurs
        if((collaborators.length>0 && Object.keys(collaborators[0]).length===3)||collaborators.length===0){
            setDisplayedCollaborators(collaborators)
        }
    },[collaborators,startSetCollaborators])
    return (
        <div>
        {!displayedCollaborators.length>0? (<p>Aucuns collaborateurs pour l'instant</p>) : 
            displayedCollaborators.map((collaborator)=>{return (
                <div key={collaborator.collaborator}>
                    <Link to={'/profile/'+collaborator.collaborator}>
                        <img className="header__picture" src={process.env.DEV_URL+"/users/"+collaborator.collaborator+"/avatar"}/>
                        <p>{collaborator.firstName} {collaborator.lastName}</p>
                    </Link>
                    
                </div>
            )})
        }
        {error && (<p>{error}</p>)}
        </div>
        
    )
}
const mapStateToProps = (state)=>({
    collaborators : state.user.collaborators,
    setCollaboratorsError:state.user.setCollaboratorsError
})
const mapDispatchToProps = (dispatch)=>({
    startSetCollaborators : ()=>dispatch(startSetCollaborators())
})

export default connect(mapStateToProps,mapDispatchToProps)(CollaboratorsList)