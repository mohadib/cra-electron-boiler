import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store, { history } from './redux/store'
import { axiosConfig } from './axiosConfig'
import Callback from './components/Callback'
import { locationChange } from './redux/applicationRouting'

axiosConfig(store)

store.dispatch(locationChange(history.location, history.action))

const grouping = store.getState().applicationRouting.grouping

ReactDOM.render(
  <Provider store={store}>
    { grouping === 'callback' && <Callback/>}
    { grouping !== 'callback' && <App/>}
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
