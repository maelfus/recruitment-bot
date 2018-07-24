import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware} from 'connected-react-router'

import rootReducer from './reducers';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory()
const loggerMiddleware = createLogger()

let store = createStore(
  connectRouter(history)(rootReducer),
  applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware,
    loggerMiddleware
  ));

console.log(store.getState());

ReactDOM.render(
  <Provider store={store} >
    <App history={history} />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
