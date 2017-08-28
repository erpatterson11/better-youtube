import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from "redux-promise-middleware"

import selectedVideoReducer from './reducers/selectedVideoReducer'
import browseReducer from './reducers/browseReducer'


const allReducers = combineReducers({
    selectedVideoReducer,
    browseReducer
})

export default (createStore( allReducers , applyMiddleware(promiseMiddleware())))