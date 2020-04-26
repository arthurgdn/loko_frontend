import React from 'react'
import {connect} from 'react-redux'
import {startLogin} from '../actions/auth'
const LoginPage= ({startLogin})=>{
    return (
        <div>
            <p>Here is the login/register  page</p>
        </div>
    )
}
const mapDispatchToProps = (dispatch)=>({
    startLogin: ()=>dispatch(startLogin())
})
export default connect(undefined,mapDispatchToProps)(LoginPage)