import React from 'react'

import LoginPage from '../components/LoginPage'
import HomePage from '../components/HomePage'
import ProfilePage from '../components/PersonnalProfilePage'
import PersonnalProfilePage from '../components/PersonnalProfilePage'
import GroupPage from '../components/GroupPage'
import TopicPage from '../components/TopicPage'
import ConversationPage from '../components/ConversationPage'
import ConversationsPage from '../components/ConversationsPage'

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
                <PublicRoute exact path='/' component={LoginPage}/>
                <PrivateRoute exact path='/home' component={HomePage}/>
                <PrivateRoute exact path='/profile' component={PersonnalProfilePage}/>
                <PrivateRoute exact path='/profile/:id' component={ProfilePage}/>
                <PrivateRoute exact path='/group/:id' component={GroupPage}/>
                <PrivateRoute exact path='/topic/:id' component = {TopicPage}/>
                <PrivateRoute exact path='/conversations' componenet = {ConversationsPage}/>
                <PrivateRoute exact path='/conversation/:id' component={ConversationPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
        
        
    </Router>
)

export default AppRouter