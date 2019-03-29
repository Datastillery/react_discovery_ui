import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import './index.css'
import 'normalize.css'
import reducers from './store/reducers'
import App from './App'
import 'regenerator-runtime/runtime'
import allSagas from './store/sagas'
import TagManager from 'react-gtm-module'
window.React = React

const tagManagerArgs = {
  gtmId: window.GTM_ID
}

TagManager.initialize(tagManagerArgs)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(allSagas)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
