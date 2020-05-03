import React from 'react'

import LoginPage from '../components/LoginPage'
import HomePage from '../components/HomePage'
import ProfilePage from '../components/profile/ProfilePage'
import PersonnalProfilePage from '../components/profile/PersonnalProfilePage'
import GroupPage from '../components/GroupPage'
import TopicPage from '../components/TopicPage'
import ConversationPage from '../components/ConversationPage'
import ConversationsPage from '../components/ConversationsPage'
import CreateOfferPage from '../components/offers/CreateOfferPage'
import OfferList from '../components/offer/OfferList'
import {createBrowserHistory} from 'history'
import NotFoundPage from '../components/NotFoundPage'
import {Router,Switch,Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import SettingsPage from '../components/settings/SettingsPage'
import ResetPasswordPage from '../components/auth/ResetPasswordPage'
import ForgottenPasswordPage from '../components/auth/ForgottenPasswordPage'
import MiniatureOfferList from '../components/offer/MiniatureOfferList'
import ManageOffer from '../components/offer/ManageOffer'
import EditOfferPage from '../components/offers/EditOfferPage'

export const history = createBrowserHistory()
const AppRouter = ()=>(
    <Router history={history}>
        <div>
            
            <Switch>
                <PublicRoute exact={true} path='/' component={LoginPage}/>
                <PublicRoute exact={true} path='/reset' component={ForgottenPasswordPage}/>
                <PublicRoute exact={true} path='/resetPass/:token' component={ResetPasswordPage}/>
                <PrivateRoute exact={true} path='/home' component={HomePage}/>
                <PrivateRoute exact={true} path='/me' component={PersonnalProfilePage}/>
                <PrivateRoute exact={true} path='/settings' component={SettingsPage}/>
                <PrivateRoute exact={true} path='/profile/:id' component={ProfilePage}/>
                <PrivateRoute exact={true} path='/offers/gestion' component={MiniatureOfferList}/>
                <PrivateRoute exact={true} path='/offer/gestion/:id' component={ManageOffer}/>
                <PrivateRoute exact={true} path='/offer/edit/:id' component={EditOfferPage}/>
                <PrivateRoute exact={true} path='/group/:id' component={GroupPage}/>
                <PrivateRoute exact={true} path='/topic/:id' component = {TopicPage}/>
                <PrivateRoute exact={true} path='/offers/me' component={OfferList}/>
                <PrivateRoute exact={true} path='/conversations' component = {ConversationsPage}/>
                <PrivateRoute exact={true} path='/nouvelle_annonce' component={CreateOfferPage}/>
                <PrivateRoute exact={true} path='/conversation/:id' component={ConversationPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
        
        
    </Router>
)

export default AppRouter