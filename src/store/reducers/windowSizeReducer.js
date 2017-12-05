
// Initial State
const initialState = {
    windowDim: {},
    scrollTop: 0
}

// Constants
const HANDLE_RESIZE = 'HANDLE_RESIZE'
const HANDLE_SCROLL = 'HANDLE_SCROLL'



// Reducer
export default function windowSizeReducer( state=initialState, action ) {
    switch(action.type) {

        case HANDLE_RESIZE:
            return Object.assign({}, state, {windowDim: action.payload})
        case HANDLE_SCROLL:
            return Object.assign({}, state, {scrollTop: action.payload})

    default: return state
    }
}


// Actions
export function handleResize( {width, height} ) {
    return {
        type: HANDLE_RESIZE,
        payload: {width, height}
    }
}

export function handleScroll( scrollTop )  {
    return {
        type: HANDLE_SCROLL,
        payload: scrollTop
    }
}

