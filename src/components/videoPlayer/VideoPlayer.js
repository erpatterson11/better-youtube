import React, { Component } from 'react'

import './videoPlayer.css'



const VideoPlayer = ({video, minify}) => {

    const browseStyle = {
        position: "fixed",
        right: 10,
        bottom: 10,
        transform: "scale(0.5)",
        boxShadow: "rgba(0, 0, 0, 0.2) -3px -3px 10px 0px"
    }

    let id

    if (video.id) {
        id = video.id.videoId
    }

    return (
        <div className="video-player-container card" style={minify ? browseStyle : null} >
            <iframe className={`video-player`}  src={`https://www.youtube.com/embed/${id}`} />
        </div>
    )
}

export default VideoPlayer