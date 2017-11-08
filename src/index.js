import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from "./store/store"


import './index.css'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    
    <Provider store={store}>
        <MuiThemeProvider>
            <Router>
                <App />
            </Router>
        </MuiThemeProvider>
    </Provider>   

    , document.getElementById('root'))
registerServiceWorker()
