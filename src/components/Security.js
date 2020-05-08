import { Component } from 'react'
import { connect } from 'react-redux'
import {renewSession, login} from '../redux/user'
import PropTypes from 'prop-types'
import {history} from '../redux/store'

export class Security extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool,
    localStorageIsLoggedIn: PropTypes.bool,
    renewSession: PropTypes.func,
    login: PropTypes.func
  }

  static defaultProps = {
    loggedIn: false,
    localStorageIsLoggedIn: false
  }

  state = {
    setCookies: false
  }


  componentDidMount() {
    const {
      loggedIn,
      localStorageIsLoggedIn,
      renewSession,
      login
    } = this.props

    const {
      pathname,
      search
    } = history.location

    if(!loggedIn) {
      const targetLocation = search ? `${pathname}${search}` : pathname

      //if localstorage indicates we logged in previously, try to renew, else new login
      if(localStorageIsLoggedIn) {
        renewSession(targetLocation)
      }
      else {
        login(targetLocation)
      }
    }
  }


  componentDidUpdate( prevProps, prevState, snapshot )
  {
    if(this.props.loggedIn && this.props.user && !this.state.setCookies) {
      //set CF signed cookies
      const {
        user: {
          resourcesCookieHeaders
        }
      } = this.props

      //delete old cookies
      resourcesCookieHeaders.forEach( header => {
        document.cookie = `${header.split('=')[0]}=; domain=${window.location.hostname}; Max-Age=-99999999;`;
      })


      resourcesCookieHeaders.forEach( header => {
        document.cookie = `${header}; domain=${window.location.hostname}; path=/`
      })
      this.setState({ setCookies: true})
    }
  }


  render() {
    const {
      loggedIn,
      children,
    } = this.props
    if(!loggedIn ) return  null
    else return children
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
  loggedIn: user.loggedIn,
  localStorageIsLoggedIn: user.localStorageIsLoggedIn
})

const mapDispatchToProps = {
  renewSession,
  login
}

export default connect( mapStateToProps, mapDispatchToProps )( Security )
