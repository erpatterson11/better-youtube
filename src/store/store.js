import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from "redux-promise-middleware"
import { composeWithDevTools } from 'redux-devtools-extension';

import selectedVideoReducer from './reducers/selectedVideoReducer'
import windowSizeReducer from './reducers/windowSizeReducer'
import browseReducer from './reducers/browseReducer'
import dockReducer from './reducers/dockReducer'


const allReducers = combineReducers({
    selectedVideoReducer,
    windowSizeReducer,
    browseReducer,
    dockReducer
})


export default (createStore( allReducers , composeWithDevTools(applyMiddleware( promiseMiddleware() ))))