import React,{useEffect} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import axios from 'axios'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import {login, startLoadUser} from './actions/auth'
import { startSetAllKeywords } from './actions/keywords'



const store = configureStore()





let hasRendered = false
const renderApp = ()=>{
    if(!hasRendered){
        ReactDOM.render(jsx,document.getElementById('app'))
        hasRendered = true
    }
}


const App = ()=>{
    useEffect(() => {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.baseURL = process.env.DEV_URL
        console.log(localStorage.getItem('token'))
        if (localStorage.getItem('token')) {
            
            const token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            
            store.dispatch(login(token))
            store.dispatch(startLoadUser())
            store.dispatch(startSetAllKeywords())
          } else {
           
            delete axios.defaults.headers.common['Authorization'];
            
          }
        
      }, []);
    
      return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
        
    )

}
ReactDOM.render(<App/>,document.getElementById('app'))




