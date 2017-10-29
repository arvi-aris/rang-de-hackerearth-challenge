import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GameArena from './components/gameArena.js'
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();
class App extends React.Component {
  render() {
    return (
        <MuiThemeProvider>
          <GameArena/>
        </MuiThemeProvider>
    );
  }
}

export default App;
