import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from "redux-promise-middleware"
import { composeWithDevTools } from 'redux-devtools-extension';

import commentsHeightReducer from './reducers/commentsHeightReducer'
import selectedVideoReducer from './reducers/selectedVideoReducer'
import windowSizeReducer from './reducers/windowSizeReducer'
import browseReducer from './reducers/browseReducer'
import dockReducer from './reducers/dockReducer'


const allReducers = combineReducers({
    commentsHeightReducer,
    selectedVideoReducer,
    windowSizeReducer,
    browseReducer,
    dockReducer
})


const store = createStore( allReducers , composeWithDevTools( applyMiddleware( promiseMiddleware() ) ) )

// if (process.env.NODE_ENV !== "production") {
//     if (module.hot) {
//       module.hot.accept(allReducers, () => {
//         store.replaceReducer(rootReducer);
//       });
//     }
//   }

export default store
