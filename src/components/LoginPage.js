import React from 'react'
import {connect} from 'react-redux'
import {startLogin} from '../actions/auth'
import LoginForm from './auth/LoginForm'
import RegisterForm from './auth/RegisterForm'
import Header from './showcase/Header'
import Promotion from './showcase/Promotion'
const LoginPage= ({startLogin})=>{
    return (
        <div>
            <Header/>
            <div className="showcase__main-area">
                <Promotion/>
                <RegisterForm/>
            </div>
            
        </div>
    )
}
const mapDispatchToProps = (dispatch)=>({
    startLogin: ()=>dispatch(startLogin())
})
export default connect(undefined,mapDispatchToProps)(LoginPage)