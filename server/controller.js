// modules
const axios = require('axios')
const config = require('./config')

// constants
const ytApi = 'https://www.googleapis.com/youtube/v3'
const apiKey = config.youtube.apiKey

const bindContextAll = (list,arg) => {
    return list.reduce( (acc,func,i,list) => [...acc, func.bind(null,arg) ], [] )
}


const funcs = {

    getVideosBySearch: function(req,res,next) {
        let searchTerm = req.query.searchTerm
        let url = `${ytApi}/search?part=snippet&maxResults=20&type=video&q=${searchTerm}&key=${apiKey}`
        axios.get(url)
            .then( videos => {
                console.log(videos)
                res.status(200).send(videos.data) 
            })
            .catch( err => res.status(500).send(err))
    },

    getVideoComments: function(req,res,next) {
        let videoId = req.query.videoId
        let url = `${ytApi}/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`
        axios.get(url)
            .then( comments => res.status(200).send(comments.data) )
    },

    getSuggestedVideos: function(req,res,next) {
        let videoId = req.query.videoId
        let url = `${ytApi}/search?part=snippet&maxResults=25&relatedToVideoId=${videoId}&type=video&key=${apiKey}`
        axios.get(url)
            .then( comments => res.status(200).send(comments.data) )
    },

    getChannelInfo: function(req,res,next) {
        let id = req.params.id
        let url = `${ytApi}/channels?part=snippet,statistics&id=${id}&key=${apiKey}`
        axios.get(url)
            .then( channel => res.status(200).send(channel.data) )
    },

    getVideoStatsById: function(req,res,next) {
        let id = req.params.id 
        console.log(id)
        let url = `${ytApi}/videos?part=snippet,statistics&id=${id}&key=${apiKey}`
        axios.get(url)
            .then( videoInfo => res.status(200).send(videoInfo.data) )
            .catch( err => {res.status(500).send(err)} )
    },

    getChannels: function(req,res,next) {
        console.log("accessToken", req.session.tokens)
        let accessToken = req.session.tokens.access_token
        let url = `${ytApi}/channels?access_token=${accessToken}&part=snippet&mine=true&key=${apiKey}`
        axios.get(url)
            .then( response => {
                // console.log("response", response.data)
                res.status(200).send(response.data)
            })
            .catch( err => console.log("error", err) )
    }
}

funcs.getVideoPageDetails = function(req,res,next) {

        let asyncFuncsList = [this.getVideoComments, this.getSuggestedVideos]

        let appliedFuncs = bindContextAll(asyncFuncsList, req)

        Promise.all(appliedFuncs).then( res => console.log(res) )

}.bind(funcs)

module.exports = funcs