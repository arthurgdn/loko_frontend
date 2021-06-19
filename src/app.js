import React, {useLayoutEffect} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import axios from 'axios';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {login, startLoadUser} from './actions/auth';
import { startSetAllKeywords } from './actions/keywords';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const renderApp = ()=>{
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.baseURL = process.env.DEV_URL;

  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    store.dispatch(login(token));
    store.dispatch(startLoadUser());
    store.dispatch(startSetAllKeywords());
  }else{
    delete axios.defaults.headers.common['Authorization'];
  }
  ReactDOM.render(
    <Provider store={store}>
      <AppRouter/>
    </Provider>
    , document.getElementById('app'));
};

const App = ()=>{
  useLayoutEffect(renderApp, []);
  return <LoadingPage/>;
};

ReactDOM.render(<App/>, document.getElementById('app'));


