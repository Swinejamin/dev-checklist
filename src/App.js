import React, {Component} from 'react';
import './App.css';



import {BrowserRouter, Route} from 'react-router-dom';


import theme from './config/theme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';


import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import Project from './Views/Project/Project';
import Home from './Views/Home/Home';

class App extends Component {
    render() {
        return (
            <BrowserRouter basename="/checklist">
                <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                    <Paper className="App-wrapper">
                        <AppBar/>
                        <Route exact path="/" component={Home}/>
                        <Route path="/:project" component={Project}/>
                    </Paper>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

export default App;
