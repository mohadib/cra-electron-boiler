import { Component } from 'react'
import { connect } from 'react-redux'
import { handleAuthentication } from '../redux/user'

class Callback extends Component {

  componentDidMount() {
    this.props.handleAuthentication()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if( this.props.loggedIn && !prevProps.loggedIn) {
      window.location.replace(this.props.targetLocation ?? '/')
    }
  }

  render() {
    const {
      loggedIn,
      loginError
    } = this.props
    if(!loggedIn && !loginError) return "loading"
    else if (loginError) return "unauthorized"
    return null
  }
}

const mapStateToProps = ({ user }) => ({
  loggedIn: user.loggedIn,
  targetLocation: user.targetLocation,
  loginError: user.loginError
})

const mapDispatchToProps = {
  handleAuthentication
}

export default connect(mapStateToProps, mapDispatchToProps)(Callback)
