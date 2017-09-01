// Initial State
const initialState = {
    isOpen: false
}

// Constants
const TOGGLE_DOCK = 'TOGGLE_DOCK'
const CLOSE_DOCK = "CLOSE_DOCK"


// Reducer
export default function dockReducer( state=initialState, action ) {
    switch(action.type) {

        case TOGGLE_DOCK:
            return Object.assign({}, state, {isOpen: !state.isOpen})

        case CLOSE_DOCK:
            return Object.assign({}, state, {isOpen: false})

    default: return state
    }
}


// Actions
export function toggleDock( bool ) {
    return {
        type: TOGGLE_DOCK,
        payload: bool ? bool : null
    }
}

export function closeDock() {
    return {
        type: CLOSE_DOCK,
        payload: null
    }
}