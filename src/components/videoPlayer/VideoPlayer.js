import React, { Component } from 'react'

import './videoPlayer.css'



const VideoPlayer = ({video, minify}) => {

    const browseStyle = {
        position: "fixed",
        right: 0,
        bottom: 0,
        width: "416px",
        height: "200px"
    }

    let id

    if (video.id) {
        id = video.id.videoId
    }

    const url = `https://www.youtube.com/embed/${id}`

    return (
        <div className="video-player-container card" style={minify ? browseStyle : null} >
            <iframe className={`video-player`}  src={url} />
        </div>
    )
}

export default VideoPlayer