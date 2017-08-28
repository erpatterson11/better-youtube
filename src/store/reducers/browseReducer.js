
// Initial State
const initialState = {
    browsing: false
}

// Constants
const SET_BROWSE = 'SET_BROWSE'


// Reducer
export default function selectedVideoReducer( state=initialState, action ) {
    switch(action.type) {

        case SET_BROWSE:
            return Object.assign({}, state, {browsing: action.payload})

    default: return state
    }
}


// Actions
export function setBrowse( bool ) {
    return {
        type: SET_BROWSE,
        payload: bool
    }
}
