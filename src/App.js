import React, {Component} from 'react'
import {MuiThemeProvider} from '@material-ui/core/styles'
import { theme } from './MuiTheme'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>Hello World</div>
      </MuiThemeProvider>
    )
  }
}

export default App