// modules
const axios = require('axios')
const config = require('./config')

// constants
const ytApi = 'https://www.googleapis.com/youtube/v3'
const apiKey = config.youtube.apiKey



const requests = {
    comments: function(videoId) {
        return axios.get(`${ytApi}/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`)
    }

}



const funcs = {

    getVideosBySearch: function(req,res,next) {
        let searchTerm = req.query.searchTerm
        let url = `${ytApi}/search?part=snippet&type=video&q=${searchTerm}&key=${apiKey}`
        axios.get(url)
        .then( videos => {
            res.status(200).send(videos.data) 
        })
        .catch( err => {
            console.error('ERROR IN REQ', err);
            res.status(403).send(err)
        })
    },

    getAllVideoInfo: function(req,res,next) {
        let videoId = req.query.videoId
    
    },

    getVideoComments: function(req,res,next) {
        let videoId = req.body.videoId || 'ZwY2E0hjGuU'
        request(`${ytApi}/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`,
            function(err,response,body) {
                return res.status(200).send(body)            
            }
        )
    }

}


module.exports = funcs