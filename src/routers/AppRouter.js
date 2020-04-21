import React from 'react'

import LoginPage from '../components/LoginPage'

import createHistory from 'history/createBrowserHistory'
import NotFoundPage from '../components/NotFoundPage'
import {Router,Switch,Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
export const history = createHistory()
const AppRouter = ()=>(
    <Router history={history}>
        <div>
            
            <Switch>
                <PublicRoute path='/' component={LoginPage} exact={true}/>
                
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
        
        
    </Router>
)

export default AppRouter