import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import EditProfileForm from './EditProfileForm'
import {startSetProfile} from '../../actions/profile'
const EditProfilePage = (props)=>{
    
    return (
        <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Modifier le profil</h1>
            </div>
        </div>
        <div className="content-container">
        <EditProfileForm/>
    
        </div>
            
        </div>
    )
}
const mapStateToProps = (state)=>{
    return {
        
        user : state.user
    }
}
export default connect(mapStateToProps)(EditProfilePage)