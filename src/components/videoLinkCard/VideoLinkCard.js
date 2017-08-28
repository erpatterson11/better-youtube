import React from 'react'

import './videoLinkCard.css'


export default function VideoLinkCard({video, setVideo}) {

    let image = video.snippet.thumbnails.default


    return (
        <div className="video-link-card" onClick={ () => setVideo(video) } > 
            <img src={image.url} width={image.width} height={image.height} />
            <p className="video-link-title">{video.snippet.title}</p>
            <p className="video-link-channel">{video.snippet.channelTitle}</p>
        </div> 
    )

}
