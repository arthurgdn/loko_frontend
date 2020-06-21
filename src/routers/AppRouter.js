import React from 'react'

import LoginPage from '../components/LoginPage'
import HomePage from '../components/HomePage'
import ProfilePage from '../components/profile/ProfilePage'
import PersonnalProfilePage from '../components/profile/PersonnalProfilePage'
import GroupPage from '../components/groups/GroupPage'
import Conversation from '../components/conversations/Conversation'

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
import DisplayOfferPage from '../components/offers/DisplayOfferPage'
import CollaboratorsPage from '../components/collaborators/CollaboratorsPage'
import ConversationsPage from '../components/conversations/ConversationsPage'
import LoadConversation from '../components/conversations/LoadConversation'
import KeywordFeed from '../components/feed/KeywordFeed'
import GroupsPage from '../components/groups/GroupsPage'
import CreateGroupPage from '../components/groups/CreateGroupPage'
import EditGroupPage from '../components/groups/EditGroupPage.js'
import SearchPage from '../components/search/SearchPage'
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
                <PrivateRoute exact={true} path='/me/collaborations' component={CollaboratorsPage}/>
                <PrivateRoute exact={true} path='/settings' component={SettingsPage}/>
                <PrivateRoute exact={true} path='/rechercher' component={SearchPage}/>
                <PrivateRoute exact={true} path='/profile/:id' component={ProfilePage}/>
                <PrivateRoute exact={true} path='/offers/gestion' component={MiniatureOfferList}/>
                <PrivateRoute exact={true} path='/offer/gestion/:id' component={ManageOffer}/>
                <PrivateRoute exact={true} path='/offer/edit/:id' component={EditOfferPage}/>
                <PrivateRoute exact={true} path='/offer/:id' component={DisplayOfferPage}/>
                <PrivateRoute exact={true} path='/group/:id' component={GroupPage}/>
                <PrivateRoute exact={true} path='/group/edit/:id' component={EditGroupPage}/>
                <PrivateRoute exact={true} path='/groups' component={GroupsPage}/>
                <PrivateRoute exact={true} path='/nouveau_groupe' component={CreateGroupPage}/>
                <PrivateRoute exact={true} path='/keyword/:id' component={KeywordFeed}/>
                <PrivateRoute exact={true} path='/offers/me' component={OfferList}/>
                <PrivateRoute exact={true} path='/conversations' component = {ConversationsPage}/>
                <PrivateRoute exact={true} path='/nouvelle_annonce' component={CreateOfferPage}/>
                <PrivateRoute exact={true} path='/conversation/:id' component={Conversation}/>
                <PrivateRoute exact={true} path='/load/conversation/:id' component={LoadConversation}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
        
        
    </Router>
)

export default AppRouter