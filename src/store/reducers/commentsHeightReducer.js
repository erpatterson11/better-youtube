// INITIAL STATE

const initialState = {
    commentsHeight: 0
}

// ACTION CONSTANTS
const UPDATE_COMMENTS_HEIGHT = 'UPDATE_COMMENTS_HEIGHT'



// REDUCER

export default function commentsHeightReducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_COMMENTS_HEIGHT: 
            return Object.assign({}, state, {commentsHeight: action.payload})
        default:
            return state
    }
}


// ACTION CREATORS 

export function updateCommentsHeight(commentsHeight) {
    return {
        type: UPDATE_COMMENTS_HEIGHT,
        payload: commentsHeight
    }
}