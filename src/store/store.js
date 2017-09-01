import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from "redux-promise-middleware"

import selectedVideoReducer from './reducers/selectedVideoReducer'
import browseReducer from './reducers/browseReducer'
import dockReducer from './reducers/dockReducer'


const allReducers = combineReducers({
    selectedVideoReducer,
    browseReducer,
    dockReducer
})

export default (createStore( allReducers , applyMiddleware(promiseMiddleware())))