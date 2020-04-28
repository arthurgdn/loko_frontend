import React from 'react'
import {connect } from 'react-redux'
import {Route,Redirect} from 'react-router-dom'
import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'
import ErrorBoundary from '../components/ErrorBoundary'

export const PrivateRoute = ({isAuthenticated,component:Component,...rest})=>(
    <Route {...rest} component={(props)=>(
        isAuthenticated ? (
            <div>
                <ErrorBoundary>
                
                
                    <Header/>
                    
                        <div className="main-area">
                            <Component {...props} />
                        </div>
                    
                    <Sidebar/>
                    
                
                
                </ErrorBoundary>
            </div>
            
        ):(
            <Redirect to="/"/>
        )
    )}/>
)
const mapStateToProps = (state)=>({
    isAuthenticated : !!state.auth.isAuthenticated

})
export default connect(mapStateToProps)(PrivateRoute)