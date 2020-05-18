import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import GroupsList from './GroupsList'
import SuggestedGroupsList from './SuggestedGroupsList'

const GroupsPage = ()=>{
    return (
        <div>
        <Link to='/nouveau_groupe'>Créer un groupe</Link>
        <h3>Mes groupes : </h3>
        <GroupsList/>
        <h3>Suggestion de groupes : </h3>
        <SuggestedGroupsList/>
        </div>
    )
}
const mapStateToProps = (state)=>({

})
const mapDispatchToProps = (dispatch)=>({

})
export default connect(mapStateToProps,mapDispatchToProps)(GroupsPage)