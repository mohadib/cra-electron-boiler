import auth from 'auth0-js'
import axios from 'axios'

const LOGIN = 'user/LOGIN'

const HANDLE_AUTHENTICATION = 'user/HANDLE_AUTHENTICATION'
const HANDLE_AUTHENTICATION_SUCCESS = 'user/HANDLE_AUTHENTICATION_SUCCESS'
const HANDLE_AUTHENTICATION_FAIL = 'user/HANDLE_AUTHENTICATION_FAIL'
const HANDLE_AUTHENTICATION_ERROR = 'user/HANDLE_AUTHENTICATION_ERROR'

const RENEW = 'user/RENEW'
const RENEW_FAIL = 'user/RENEW_FAIL'

const FETCH_USER = 'user/FETCH_USER'
const FETCH_USER_SUCCESS = 'user/FETCH_USER_SUCCESS'
const FETCH_USER_FAIL = 'user/FETCH_USER_FAIL'

export const ACTIONS = {
  LOGIN,
  HANDLE_AUTHENTICATION,
  HANDLE_AUTHENTICATION_SUCCESS,
  HANDLE_AUTHENTICATION_FAIL,
  HANDLE_AUTHENTICATION_ERROR,
  RENEW,
  RENEW_FAIL,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL
}

export const ADMIN = 'Admin'
export const SITE_MANAGER = 'Site Manager'
export const ENGINEER = 'Engineer'
export const SITE_VIEWER = 'Site Viewer'
export const THIRD_PARTY_ANALYST = '3rd Party Analyst'
/*Edit inspections, flag images for review, and create and edit anomalies*/
export const ANNOTATION_EDIT_ROLES = [ENGINEER, THIRD_PARTY_ANALYST]
/*Generate reports*/
export const REPORT_ROLES = [SITE_MANAGER, ENGINEER, SITE_VIEWER]


export const auth0 = new auth.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '') + '/callback',
  responseType: 'token id_token',
  scope: 'openid',
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  leeway: 300 //give up to 5 minutes of clock skew - this can happen when the user is not using NTP
})

export const initialState = {
  user: null,
  fetchingUser: false,
  fetchUserError: null,
  accessToken: null,
  idToken: null,
  expiresAt: null,
  targetLocation: null,
  loggingIn: false,
  loggedIn: false,
  handlingAuthentication: false,
  handleAuthenticationError: null,
  localStorageIsLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
}

export default ( state = initialState, { type, payload } ) => {
 switch(type ) {
   case LOGIN:
     return {
       ...state,
       loggingIn: true,
       loginError: null
     }
   case HANDLE_AUTHENTICATION_SUCCESS:
     return {
       ...state,
       loggingIn: false,
       loggedIn: true,
       accessToken: payload.accessToken,
       idToken: payload.idToken,
       localStorageIsLoggedIn: true,
       targetLocation: payload.state
     }
   case HANDLE_AUTHENTICATION_FAIL:
   case HANDLE_AUTHENTICATION_ERROR:
     return {
       ...state,
       loggingIn: false,
       loginError: payload
     }
   case RENEW_FAIL:
     return {
       ...state,
       localStorageIsLoggedIn: false
     }
   case FETCH_USER:
     return {
       ...state,
       fetchingUser: true,
       fetchUserError: null
     }
   case FETCH_USER_SUCCESS:
     return {
       ...state,
       user: payload,
       fetchingUser: false
     }
   case FETCH_USER_FAIL:
     return {
       ...state,
       fetchingUser: false,
       fetchUserError: payload
     }
   default:
     return state
 }
}

export const login = targetLocation => {
  auth0.authorize({
    state: targetLocation
  })
  return {
    type: LOGIN
  }
}

export const renewSession = targetLocation => dispatch => {
  dispatch({ type: RENEW })
  auth0.checkSession({}, (err, authResult) => {
    if(err) {
      localStorage.removeItem('isLoggedIn')
      dispatch({type: RENEW_FAIL})
      dispatch(login(targetLocation))
    }
    else if( authResult.accessToken && authResult.idToken ) {
      localStorage.setItem('isLoggedIn', 'true')
      dispatch({ type: HANDLE_AUTHENTICATION_SUCCESS, payload: authResult})
      //dispatch(fetchUser())
    }
  })
}

export const handleAuthentication = () => dispatch => {
  dispatch({ type: HANDLE_AUTHENTICATION })
  auth0.parseHash((err, authResult) => {
    if( err ) {
      dispatch({ type: HANDLE_AUTHENTICATION_ERROR, payload: err })
    }
    else if( authResult.accessToken && authResult.idToken ) {
      localStorage.setItem('isLoggedIn', 'true')
      dispatch({ type: HANDLE_AUTHENTICATION_SUCCESS, payload: authResult})
      //dispatch(fetchUser())
    }
    else dispatch({ type: HANDLE_AUTHENTICATION_FAIL })
  })
}


// this being a post with an empty body and a content type
// is a hack to make rest "easy" work (the backend having url path collisions)
export const fetchUser = () => ({
  type: 'CALL_API',
  types: [
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL
  ],
  callAPI: () => axios.post('/user/credentials', null, { headers: {'Content-Type':'application/json'}})
})

export const logout = () => dispatch => {
  localStorage.removeItem('isLoggedIn')
  auth0.logout({
    returnTo: window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''),
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID
  })
}