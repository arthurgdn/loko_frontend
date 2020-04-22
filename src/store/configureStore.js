import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/user'
import profileReducer from '../reducers/profile'
import authReducer from '../reducers/auth'
import feedFiltersReducer from '../reducers/feedFilters'
import feedReducer from '../reducers/feed'
import  groupsReducer from '../reducers/groups'
import conversationsReducer from '../reducers/conversations'
import offersReducer from '../reducers/offers'
import keywordsReducer from '../reducers/keywords'

//We configure the store with the different reducers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default ()=>{
    const store = createStore(combineReducers({
        user : userReducer,
        profile : profileReducer,
        feedFilters : feedFiltersReducer,
        feed : feedReducer,
        groups : groupsReducer,
        conversations : conversationsReducer,
        offers : offersReducer,
        keywords : keywordsReducer,
        auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
     )
    return store
}
