import { applyMiddleware, compose, combineReducers, createStore } from 'redux'
import {callAPIMiddleware} from './callApiMiddleware'
import { createBrowserHistory } from 'history'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import applicationRouting, {locationChange} from './applicationRouting'

const enhancers = []
const initialState = {}
const middleware = [callAPIMiddleware, thunkMiddleware]


if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const reducer = combineReducers({
  user,
  applicationRouting
})

const store = createStore(reducer, initialState, composedEnhancers)


export const history = createBrowserHistory()

history.listen((location, action) => store.dispatch(locationChange(location, action)))


export default store
