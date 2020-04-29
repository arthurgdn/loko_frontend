import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/user'
import profileReducer from '../reducers/profile'
import authReducer from '../reducers/auth'
import feedFiltersReducer from '../reducers/feedFilters'
import feedReducer from '../reducers/feed'
import  groupOffersReducer from '../reducers/groupOffers'
import conversationsReducer from '../reducers/conversations'
import offersReducer from '../reducers/offers'
import keywordOffersReducer from '../reducers/keywordOffers'
import messagesReducer from '../reducers/messages'
import errorReducer from '../reducers/error'
import keywordsReducer from '../reducers/keywords'

//We configure the store with the different reducers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default ()=>{
    const store = createStore(combineReducers({
        user : userReducer,
        profile : profileReducer,
        feedFilters : feedFiltersReducer,
        feed : feedReducer,
        groupOffers : groupOffersReducer,
        conversations : conversationsReducer,
        offers : offersReducer,
        keywordOffers : keywordOffersReducer,
        keywords : keywordsReducer,
        auth: authReducer,
        messages : messagesReducer,
        error : errorReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
     )
    return store
}
