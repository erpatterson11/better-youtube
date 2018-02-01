
// Initial State
const initialState = {
    browsing: false,
    browsePlaying: false
}

// Constants
const SET_BROWSE = 'SET_BROWSE'
const SET_BROWSE_PLAYING = 'SET_BROWSE_PLAYING'


// Reducer
export default function selectedVideoReducer( state=initialState, action ) {
    switch(action.type) {

        case SET_BROWSE:
            return Object.assign({}, state, {browsing: action.payload})
        case SET_BROWSE_PLAYING:
            return Object.assign({}, state, {browsePlaying: action.payload})

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

export function setBrowsePlaying( bool ) {
    return {
        type: SET_BROWSE_PLAYING,
        payload: bool
    }
}
