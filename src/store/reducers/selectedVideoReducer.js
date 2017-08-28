import * as searchService from '../../services/searchService'


// Initial State
const initialState = {
    selectedVideo: {},
    searchResults: {},
    loading: false
}

// Constants
const SET_SELECTED_VIDEO = 'SET_SELECTED_VIDEO'
const GET_VIDEOS_SEARCH = 'GET_VIDEOS_SEARCH'
const GET_VIDEOS_SEARCH_PENDING = 'GET_VIDEOS_SEARCH_PENDING'
const GET_VIDEOS_SEARCH_FULFILLED = 'GET_VIDEOS_SEARCH_FULFILLED'

// Reducer
export default function selectedVideoReducer( state=initialState, action ) {
    switch(action.type) {
        case GET_VIDEOS_SEARCH_PENDING:
            return Object.assign({}, state, {loading: true})
        case GET_VIDEOS_SEARCH_FULFILLED:
            return Object.assign({}, state, {loading: false, searchResults: action.payload})
        case SET_SELECTED_VIDEO: 
            return Object.assign({}, {...state, selectedVideo: action.payload} )
    default: return state
    }
}


// Actions
export function setSelectedVideo( video ) {
    return {
        type: SET_SELECTED_VIDEO,
        payload: video
    }
}

export function getVideosSearch(searchTerm) {
    return {
    type: GET_VIDEOS_SEARCH,
    payload: searchService.videoSearch(searchTerm)
    }
}