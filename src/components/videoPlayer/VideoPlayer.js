import React, { Component } from 'react'

import './videoPlayer.css'



const VideoPlayer = ({video, minify}) => {

    const browseStyle = {
        position: "fixed",
        right: 15,
        bottom: 15,
        transform: "scale(0.5)",
        boxShadow: "rgba(0, 0, 0, 0.2) -3px -3px 10px 0px",
        gridArea: "none",
        zIndex: 100000
    }

    const id = video.id || ""

    return (
        <div className="video-player-container card" style={minify ? browseStyle : null} >
            <iframe className={`video-player`}  src={`https://www.youtube.com/embed/${id}`} frameBorder="0" allowFullScreen />
        </div>
    )
}

export default VideoPlayer