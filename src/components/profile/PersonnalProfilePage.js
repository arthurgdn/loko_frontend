import React ,{useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {connect } from 'react-redux'
import {startSetProfile} from '../../actions/profile'
const PersonnalProfilePage = ({user,profile,startSetProfile})=>{
    useEffect(()=>{
        
            startSetProfile(user._id)
            console.log('profile set')
        
        
    },[startSetProfile,user._id])
    return (
        <Redirect to={'/profile/'+user._id}/>
    )
}
const mapStateToProps = (state)=>({
    user: state.user,
    profile : state.profile
})
const mapDispatchToProps = (dispatch)=>({
    startSetProfile : (id)=>dispatch(startSetProfile(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(PersonnalProfilePage)