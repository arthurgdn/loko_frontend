import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import GroupsList from './GroupsList'

const GroupsPage = ()=>{
    return (
        <div>
        <Link to='/nouveau_groupe'>Créer un groupe</Link>
        <h3>Mes groupes : </h3>
        <GroupsList/>
        </div>
    )
}
const mapStateToProps = (state)=>({

})
const mapDispatchToProps = (dispatch)=>({

})
export default connect(mapStateToProps,mapDispatchToProps)(GroupsPage)