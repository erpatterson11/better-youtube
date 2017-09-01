import React from 'react'

import Paper from 'material-ui/Paper'

import './videoLinkCard.css'


export default function VideoLinkCard({video, setVideo}) {

    let image = video.snippet.thumbnails.medium

    return (
        <div className="video-link-card" onClick={ () => setVideo(video) } > 
            <Paper zDepth={1} className="video-link-pic" style={{backgroundImage: `url(${image.url})`, width: "164px", height: "94px"}}>
            </Paper>
            <div className="video-link-text">
                <p className="video-link-title">{video.snippet.title}</p>
                <p className="video-link-channel">{video.snippet.channelTitle}</p>
            </div>
        </div> 
    )
}
