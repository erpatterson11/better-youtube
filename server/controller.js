// MODULES
const axios = require('axios')
const config = require('./config')

// CONSTANTS
const ytApi = 'https://www.googleapis.com/youtube/v3'
const apiKey = config.youtube.apiKey

const bindContextAll = (list,arg) => {
    return list.reduce( (acc,func,i,list) => [...acc, func.bind(null,arg) ], [] )
}



// EXPORT OBJECT
const funcs = {

    getVideosBySearch: function(req,res,next) {
        const searchTerm = req.query.searchTerm
        const url = `${ytApi}/search?part=snippet&maxResults=20&type=video&q=${searchTerm}&key=${apiKey}`
            console.log(url)
        axios.get(url)
            .then( videos => res.status(200).send(videos.data) )
            .catch( err => res.status(500).send(err))
    },

    getVideoComments: function(req,res,next) {
        const { videoId, nextPageToken } = req.query
        console.log("page token: ", req.query)
        const nextPage = nextPageToken !== "undefined" ? `&pageToken=${nextPageToken}` : ""
        console.log("next page: ", nextPage)
        const url = `${ytApi}/commentThreads?part=snippet&videoId=${videoId}${nextPage}&key=${apiKey}`
        axios.get(url)
            .then( comments => res.status(200).send(comments.data) )
    },


    getSuggestedVideos: function(req,res,next) {
        const videoId = req.query.videoId
        const url = `${ytApi}/search?part=snippet&maxResults=25&relatedToVideoId=${videoId}&type=video&key=${apiKey}`
        axios.get(url)
            .then( comments => res.status(200).send(comments.data) )
            .catch( err => res.status(500).send(err) )
    },

    getChannelInfo: function(req,res,next) {
        const id = req.params.id
        const url = `${ytApi}/channels?part=snippet,statistics&id=${id}&key=${apiKey}`
        axios.get(url)
            .then( channel => res.status(200).send(channel.data) )
    },

    getVideoStatsById: function(req,res,next) {
        const id = req.params.id 
        console.log(id)
        let url = `${ytApi}/videos?part=snippet,statistics&id=${id}&key=${apiKey}`
        axios.get(url)
            .then( videoInfo => res.status(200).send(videoInfo.data) )
            .catch( err => res.status(500).send(err) )
    },

    getChannels: function(req,res,next) {
        console.log("accessToken", req.session.tokens)
        const accessToken = req.session.tokens.access_token
        const url = `${ytApi}/channels?access_token=${accessToken}&part=snippet&mine=true&key=${apiKey}`
        axios.get(url)
            .then( response => res.status(200).send(response.data) )
            .catch( err => res.status(500).send(err) )
    }
}

funcs.getVideoPageDetails = function(req,res,next) {
        const asyncFuncsList = [this.getVideoComments, this.getSuggestedVideos]
        const appliedFuncs = bindContextAll(asyncFuncsList, req)
        Promise.all(appliedFuncs).then( res => console.log(res) )
}.bind(funcs)

module.exports = funcs