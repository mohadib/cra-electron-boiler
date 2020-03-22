import React, {Component} from 'react'
import {MuiThemeProvider} from '@material-ui/core/styles'
import { theme } from './MuiTheme'

class App extends Component {
  state = {
    files : []
  }

  componentDidMount() {
    const f = window.require('fs')
    this.setState({ files: f.readdirSync('/')})
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>Hello World</div>
        <ul>
          { this.state.files.map( f => (
            <li>{f}</li>
          ))}
        </ul>
      </MuiThemeProvider>
    )
  }
}

export default App