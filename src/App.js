import React, {Component} from 'react'
import {MuiThemeProvider} from '@material-ui/core/styles'
import { theme } from './MuiTheme'
import Security from './components/Security'
import { connect } from 'react-redux'

class App extends Component {
  state = {
    files : []
  }

  componentDidMount() {
    const f = window.require('fs')
    this.setState({ files: f.readdirSync('/')})
  }

  render() {
    const {
      accessToken,
      idToken
    } = this.props

    return (
      <Security>
        <MuiThemeProvider theme={theme}>
          <div>Hello World</div>
          <div>accessToken: {accessToken}</div>
          <div>idToken: {idToken}</div>
          <ul>
            { this.state.files.map( f => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </MuiThemeProvider>
      </Security>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  accessToken: user.accessToken,
  idToken: user.idToken
})

export default connect( mapStateToProps )( App )