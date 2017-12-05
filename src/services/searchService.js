import axios from 'axios'

export function videoSearch(searchTerm) {
    return axios.get( `/api/youtube/video?searchTerm=${searchTerm}` )
        .then( res => {
            return res.data
        })
}

export function getVideoComments(videoId, nextPageToken) {
    return axios.get( `/api/youtube/comments?videoId=${videoId}&nextPageToken=${nextPageToken}` )
        .then( res => {
            return res.data
        })
}

export function getVideoReplyComments(commentId) {
    return axios.get(`/api/youtube/commentReplies?commentId=${commentId}`)
        .then( res => {
            return res.data
        })
}


export function getVideoSuggestions(videoId) {
    return axios.get( `/api/youtube/suggested?videoId=${videoId}` )
        .then( res => {
            return res.data
        })
}

export function getVideoPageInfo(videoId) {
    return axios.get( `/api/youtube/suggested?videoId=${videoId}` )
        .then( res => res.data)
}

export function getVideoStats(videoId) {
    return axios.get( `/api/youtube/video/${videoId}` )
}

export function getChannelStats(channelId) {
    return axios.get( `/api/youtube/channel/${channelId}` )
}