import * as searchService from '../../services/searchService'


// Initial State
const initialState = {
    selectedVideo: {},
    selectedVideoComments: [],
    nextCommentsToken: "", 
    suggestedVideos: [],
    nextSuggestedToken: "",
    searchResults: {},
    nextSearchToken: "",
    loading: false
}

// Constants
const SET_SELECTED_VIDEO = 'SET_SELECTED_VIDEO'

const GET_VIDEOS_SEARCH = 'GET_VIDEOS_SEARCH'
const GET_VIDEOS_SEARCH_PENDING = 'GET_VIDEOS_SEARCH_PENDING'
const GET_VIDEOS_SEARCH_FULFILLED = 'GET_VIDEOS_SEARCH_FULFILLED'

const GET_VIDEO_COMMENTS = "GET_VIDEO_COMMENTS"
const GET_VIDEO_COMMENTS_PENDING = "GET_VIDEO_COMMENTS_PENDING"
const GET_VIDEO_COMMENTS_FULFILLED = "GET_VIDEO_COMMENTS_FULFILLED"

const GET_MORE_COMMENTS = "GET_MORE_COMMENTS"
const GET_MORE_COMMENTS_PENDING = "GET_MORE_COMMENTS_PENDING"
const GET_MORE_COMMENTS_FULFILLED = "GET_MORE_COMMENTS_FULFILLED"

const GET_SUGGESTED_VIDEOS = "GET_SUGGESTED_VIDEOS"
const GET_SUGGESTED_VIDEOS_PENDING = "GET_SUGGESTED_VIDEOS_PENDING"
const GET_SUGGESTED_VIDEOS_FULFILLED = "GET_SUGGESTED_VIDEOS_FULFILLED"


// Reducer
export default function selectedVideoReducer( state=initialState, action ) {

    switch(action.type) {

        case SET_SELECTED_VIDEO: 
            console.log('video info', action.payload)
            return Object.assign({}, {...initialState, selectedVideo: action.payload} )

        case GET_VIDEOS_SEARCH_PENDING:
            return Object.assign({}, state, {loading: true})
        case GET_VIDEOS_SEARCH_FULFILLED:
            return Object.assign({}, state, {loading: false, searchResults: action.payload.items, nextSearchToken: action.payload.nextPageToken})

        case GET_VIDEO_COMMENTS_PENDING:
            return Object.assign({}, state)
        case GET_VIDEO_COMMENTS_FULFILLED:
            return Object.assign({}, state, {selectedVideoComments: [...action.payload.items]})

        case GET_MORE_COMMENTS_PENDING:
            return Object.assign({}, state)
        case GET_MORE_COMMENTS_FULFILLED:
            return Object.assign({}, state, {selectedVideoComments: [...state.selectedVideoComments, ...action.payload.items]})

        case GET_SUGGESTED_VIDEOS_PENDING:
            return Object.assign({}, state)
        case GET_SUGGESTED_VIDEOS_FULFILLED:
            return Object.assign({}, state, {suggestedVideos: [...state.suggestedVideos, ...action.payload.items]})


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

export function getVideoComments(videoId) {
    return {
        type: GET_VIDEO_COMMENTS,
        payload: searchService.getVideoComments(videoId)
    }
}

export function getMoreComments() {
    return {
        type: GET_MORE_COMMENTS,
        payload: searchService.getMoreComments()
    }
}

export function getVideoSuggestions(videoId) {
    return {
        type: GET_SUGGESTED_VIDEOS,
        payload: searchService.getVideoSuggestions(videoId)
    }
}