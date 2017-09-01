import axios from 'axios'

export function videoSearch(searchTerm) {
    // let localResults = localStorage.getItem(`${searchTerm}`)
    // if (localResults) {
    //     return JSON.parse(localResults)
    // } 
    // else {
        return axios.get( `http://localhost:3001/api/youtube/video?searchTerm=${searchTerm}` )
            .then( res => {
                // localStorage.setItem(`${searchTerm}`, JSON.stringify(res.data.items))
                return res.data
            })
    // }
}

export function getVideoComments(videoId) {
    return axios.get( `http://localhost:3001/api/youtube/comments?videoId=${videoId}` )
        .then( res => {
            console.log('comments', res.data)
            return res.data
        })
}

export function getMoreComments(videoId) {
    return axios.get( `http://localhost:3001/api/youtube/comments?videoId=${videoId}` )
        .then( res => {
            return res.data
        })
}

export function getVideoSuggestions(videoId) {
    return axios.get( `http://localhost:3001/api/youtube/suggested?videoId=${videoId}` )
        .then( res => {
            return res.data
        })
}

export function getVideoPageInfo(videoId) {
    return axios.get( `http://localhost:3001/api/youtube/suggested?videoId=${videoId}` )
        .then( res => res.data)
}