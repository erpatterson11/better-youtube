import axios from 'axios'

const urlPrefix = true ? "http://localhost:3010" : ""

export function videoSearch(searchTerm) {
    return axios.get( `${urlPrefix}/api/youtube/video?searchTerm=${searchTerm}` )
        .then( res => {
            return res.data
        })
}

export function getVideoComments(videoId, nextPageToken) {
    return axios.get( `${urlPrefix}/api/youtube/comments?videoId=${videoId}&nextPageToken=${nextPageToken}` )
        .then( res => {
            console.log('comments', res.data)
            return res.data
        })
}


export function getVideoSuggestions(videoId) {
    return axios.get( `${urlPrefix}/api/youtube/suggested?videoId=${videoId}` )
        .then( res => {
            return res.data
        })
}

export function getVideoPageInfo(videoId) {
    return axios.get( `${urlPrefix}/api/youtube/suggested?videoId=${videoId}` )
        .then( res => res.data)
}

export function getVideoStats(videoId) {
    return axios.get( `${urlPrefix}/api/youtube/video/${videoId}` )
}

export function getChannelStats(channelId) {
    return axios.get( `${urlPrefix}/api/youtube/channel/${channelId}` )
}