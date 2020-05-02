import React from 'react'
import {connect} from 'react-redux'
import {startLogin} from '../actions/auth'
import LoginForm from './auth/LoginForm'
import RegisterForm from './auth/RegisterForm'
const LoginPage= ({startLogin})=>{
    return (
        <div>
            <p>Here is the login/register  page</p>
            
            <LoginForm/>
            <RegisterForm/>
        </div>
    )
}
const mapDispatchToProps = (dispatch)=>({
    startLogin: ()=>dispatch(startLogin())
})
export default connect(undefined,mapDispatchToProps)(LoginPage)